from __future__ import annotations

import argparse
import json
import math
import pickle
import sys
from pathlib import Path
from typing import Any

import numpy as np
import onnx
import onnxruntime as ort
from onnx import TensorProto, helper, numpy_helper


ROOT = Path(__file__).resolve().parents[1]
DYNA_MPO = Path("/Users/yardas/dyna-mpo")
DEFAULT_MANIFEST = ROOT / "viewer/public/assets/scene/puzzle_task4/env_manifest.json"
DEFAULT_OUTPUT = ROOT / "viewer/public/assets/scene/puzzle_task4/policy.onnx"


def _tensor(name: str, value: np.ndarray) -> onnx.TensorProto:
    return numpy_helper.from_array(np.asarray(value), name)


def _dense(
    nodes: list[onnx.NodeProto],
    initializers: list[onnx.TensorProto],
    input_name: str,
    layer_name: str,
    params: dict[str, np.ndarray],
    *,
    activate: bool,
    weight_prefix: str | None = None,
    initialized_weights: set[str] | None = None,
) -> str:
    initializer_prefix = weight_prefix or layer_name
    kernel = f"{initializer_prefix}_kernel"
    bias = f"{initializer_prefix}_bias"
    mm = f"{layer_name}_matmul"
    out = f"{layer_name}_out"
    if initialized_weights is None or kernel not in initialized_weights:
        initializers.append(_tensor(kernel, np.asarray(params["kernel"], dtype=np.float32)))
        initializers.append(_tensor(bias, np.asarray(params["bias"], dtype=np.float32)))
        if initialized_weights is not None:
            initialized_weights.add(kernel)
            initialized_weights.add(bias)
    nodes.append(helper.make_node("MatMul", [input_name, kernel], [mm]))
    nodes.append(helper.make_node("Add", [mm, bias], [out]))
    if not activate:
        return out

    half_out = f"{layer_name}_half_out"
    scaled = f"{layer_name}_gelu_scaled"
    erf = f"{layer_name}_gelu_erf"
    one_plus = f"{layer_name}_gelu_one_plus"
    result = f"{layer_name}_gelu"
    nodes.append(helper.make_node("Mul", [out, "gelu_inv_sqrt2"], [scaled]))
    nodes.append(helper.make_node("Erf", [scaled], [erf]))
    nodes.append(helper.make_node("Add", [erf, "gelu_one"], [one_plus]))
    nodes.append(helper.make_node("Mul", [out, "gelu_half"], [half_out]))
    nodes.append(helper.make_node("Mul", [half_out, one_plus], [result]))
    return result


def _actor_flow(
    nodes: list[onnx.NodeProto],
    initializers: list[onnx.TensorProto],
    obs_name: str,
    action_name: str,
    time_name: str,
    params: dict[str, dict[str, np.ndarray]],
    prefix: str,
    initialized_weights: set[str] | None = None,
) -> str:
    current = f"{prefix}_input"
    nodes.append(helper.make_node("Concat", [obs_name, action_name, time_name], [current], axis=1))
    layer_names = sorted(params, key=lambda name: int(name.split("_")[-1]))
    for index, layer_name in enumerate(layer_names):
        current = _dense(
            nodes,
            initializers,
            current,
            f"{prefix}_{layer_name}",
            params[layer_name],
            activate=index < len(layer_names) - 1,
            weight_prefix=f"actor_{layer_name}",
            initialized_weights=initialized_weights,
        )
    return current


def build_model(
    *,
    actor_params: dict[str, dict[str, np.ndarray]],
    obs_dim: int,
    full_action_dim: int,
    action_dim: int,
    flow_steps: int,
    output_full_action: bool = False,
) -> onnx.ModelProto:
    nodes: list[onnx.NodeProto] = []
    initializers: list[onnx.TensorProto] = [
        _tensor("gelu_half", np.asarray(0.5, dtype=np.float32)),
        _tensor("gelu_one", np.asarray(1.0, dtype=np.float32)),
        _tensor("gelu_inv_sqrt2", np.asarray(1.0 / np.sqrt(2.0), dtype=np.float32)),
        _tensor("step_size", np.asarray(1.0 / float(flow_steps), dtype=np.float32)),
    ]
    if not output_full_action:
        initializers.extend(
            [
                _tensor("slice_starts", np.asarray([0], dtype=np.int64)),
                _tensor("slice_ends", np.asarray([action_dim], dtype=np.int64)),
                _tensor("slice_axes", np.asarray([1], dtype=np.int64)),
                _tensor("slice_steps", np.asarray([1], dtype=np.int64)),
            ]
        )
    initialized_weights: set[str] = set()

    action_name = "noise"
    for step in range(flow_steps):
        time_value = np.full((1, 1), step / float(flow_steps), dtype=np.float32)
        time_name = f"time_{step}"
        scaled_velocity = f"scaled_velocity_{step}"
        next_action = f"flow_action_{step + 1}"
        initializers.append(_tensor(time_name, time_value))
        velocity = _actor_flow(
            nodes,
            initializers,
            "obs",
            action_name,
            time_name,
            actor_params,
            f"flow_{step}",
            initialized_weights=initialized_weights,
        )
        nodes.append(helper.make_node("Mul", [velocity, "step_size"], [scaled_velocity]))
        nodes.append(helper.make_node("Add", [action_name, scaled_velocity], [next_action]))
        action_name = next_action

    clipped_action = "action" if output_full_action else "clipped_full_action"
    nodes.append(
        helper.make_node(
            "Clip",
            [action_name, "clip_min", "clip_max"],
            [clipped_action],
        )
    )
    initializers.extend(
        [
            _tensor("clip_min", np.asarray(-1.0, dtype=np.float32)),
            _tensor("clip_max", np.asarray(1.0, dtype=np.float32)),
        ]
    )
    if not output_full_action:
        nodes.append(
            helper.make_node(
                "Slice",
                ["clipped_full_action", "slice_starts", "slice_ends", "slice_axes", "slice_steps"],
                ["action"],
            )
        )
    graph = helper.make_graph(
        nodes,
        "gradflow_policy_unrolled",
        [
            helper.make_tensor_value_info("obs", TensorProto.FLOAT, [1, obs_dim]),
            helper.make_tensor_value_info("noise", TensorProto.FLOAT, [1, full_action_dim]),
        ],
        [
            helper.make_tensor_value_info(
                "action",
                TensorProto.FLOAT,
                [1, full_action_dim if output_full_action else action_dim],
            )
        ],
        initializer=initializers,
    )
    model = helper.make_model(
        graph,
        producer_name="export_gradflow_policy_to_onnx",
        opset_imports=[helper.make_opsetid("", 13)],
    )
    model.ir_version = 10
    onnx.checker.check_model(model)
    return model


def _np_actor_flow(
    obs: np.ndarray,
    action: np.ndarray,
    time: np.ndarray,
    params: dict[str, dict[str, np.ndarray]],
) -> np.ndarray:
    current = np.concatenate([obs, action, time], axis=-1).astype(np.float32)
    for index, layer_name in enumerate(sorted(params, key=lambda name: int(name.split("_")[-1]))):
        layer = params[layer_name]
        current = current @ np.asarray(layer["kernel"], dtype=np.float32)
        current = current + np.asarray(layer["bias"], dtype=np.float32)
        if index < len(params) - 1:
            current = 0.5 * current * (1.0 + np.vectorize(math.erf)(current / np.sqrt(2.0)))
    return current.astype(np.float32)


def _np_policy(
    obs: np.ndarray,
    noise: np.ndarray,
    params: dict[str, dict[str, np.ndarray]],
    *,
    action_dim: int,
    flow_steps: int,
    output_full_action: bool = False,
) -> np.ndarray:
    action = noise.astype(np.float32)
    for step in range(flow_steps):
        time = np.full((obs.shape[0], 1), step / float(flow_steps), dtype=np.float32)
        action = action + _np_actor_flow(obs, action, time, params) / float(flow_steps)
    action = np.clip(action, -1.0, 1.0)
    if output_full_action:
        return action
    return action[:, :action_dim]


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--checkpoint", type=Path, required=True)
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--flow-steps", type=int)
    parser.add_argument("--obs-dim", type=int)
    parser.add_argument("--action-dim", type=int, default=5)
    return parser.parse_args()


def main() -> None:
    args = _parse_args()
    payload = pickle.loads(args.checkpoint.read_bytes())
    manifest = json.loads(args.manifest.read_text()) if args.manifest.exists() else {}
    flags_path = args.checkpoint.with_name("flags.json")
    flags = json.loads(flags_path.read_text()) if flags_path.exists() else {}
    agent_cfg: dict[str, Any] = dict(flags.get("agent", {}))

    params = payload["agent"]["network"]["params"]["modules_actor_flow"]["mlp"]
    actor_params = {
        name: {
            "kernel": np.asarray(layer["kernel"], dtype=np.float32),
            "bias": np.asarray(layer["bias"], dtype=np.float32),
        }
        for name, layer in params.items()
    }
    first_kernel = actor_params["Dense_0"]["kernel"]
    final_bias = actor_params[sorted(actor_params, key=lambda name: int(name.split("_")[-1]))[-1]][
        "bias"
    ]
    flow_steps = int(args.flow_steps or agent_cfg.get("flow_steps", 1))
    action_dim = int(args.action_dim)
    full_action_dim = int(final_bias.shape[0])
    obs_dim = int(args.obs_dim or manifest.get("constants", {}).get("observation_size", 0))
    inferred_obs_dim = int(first_kernel.shape[0] - full_action_dim - 1)
    if obs_dim <= 0:
        obs_dim = inferred_obs_dim
    if inferred_obs_dim != obs_dim:
        raise ValueError(
            "Checkpoint is not dimensionally compatible with the requested env: "
            f"actor input implies obs_dim={inferred_obs_dim}, manifest has obs_dim={obs_dim}. "
            "Use a puzzle-task4-compatible checkpoint or pass --obs-dim for a deliberate export."
        )
    if full_action_dim % action_dim != 0:
        raise ValueError(
            f"full_action_dim={full_action_dim} is not divisible by action_dim={action_dim}."
        )
    if flow_steps < 1:
        raise ValueError(f"flow_steps must be >= 1, got {flow_steps}.")

    model = build_model(
        actor_params=actor_params,
        obs_dim=obs_dim,
        full_action_dim=full_action_dim,
        action_dim=action_dim,
        flow_steps=flow_steps,
    )
    args.output.parent.mkdir(parents=True, exist_ok=True)
    onnx.save(model, args.output)

    session = ort.InferenceSession(str(args.output), providers=["CPUExecutionProvider"])
    obs = np.linspace(-0.25, 0.25, obs_dim, dtype=np.float32).reshape(1, obs_dim)
    noise = np.linspace(-0.5, 0.5, full_action_dim, dtype=np.float32).reshape(1, full_action_dim)
    expected = _np_policy(obs, noise, actor_params, action_dim=action_dim, flow_steps=flow_steps)
    actual = session.run(None, {"obs": obs, "noise": noise})[0]
    np.testing.assert_allclose(actual, expected, rtol=1e-5, atol=1e-5)
    print(f"saved {args.output}")
    print(f"input obs {[1, obs_dim]}")
    print(f"input noise {[1, full_action_dim]}")
    print(f"output action {[1, action_dim]}")
    print(f"flow_steps {flow_steps}")


if __name__ == "__main__":
    main()
