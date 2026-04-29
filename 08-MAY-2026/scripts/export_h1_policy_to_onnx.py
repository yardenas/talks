from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np
import onnx
import onnxruntime as rt
from onnx import TensorProto, helper, numpy_helper


DEFAULT_SAFE_LEARNING = Path("/Users/yardas/safe-learning")
DEFAULT_CHECKPOINT = DEFAULT_SAFE_LEARNING / "ckpt/gytlhnyk_step_latest"
DEFAULT_OUTPUT = (
    Path(__file__).resolve().parents[1]
    / "public/mjswan/assets/policy/h1_mocap_tracking/h1_policy.onnx"
)


def tensor(name: str, value: np.ndarray) -> onnx.TensorProto:
    return numpy_helper.from_array(np.asarray(value), name)


def add_dense(
    *,
    nodes: list[onnx.NodeProto],
    initializers: list[onnx.TensorProto],
    input_name: str,
    layer_name: str,
    layer_params: dict[str, np.ndarray],
    activate: bool,
) -> str:
    kernel_name = f"{layer_name}_kernel"
    bias_name = f"{layer_name}_bias"
    matmul_name = f"{layer_name}_matmul"
    output_name = f"{layer_name}_out"

    initializers.append(tensor(kernel_name, np.asarray(layer_params["kernel"], np.float32)))
    initializers.append(tensor(bias_name, np.asarray(layer_params["bias"], np.float32)))
    nodes.append(helper.make_node("MatMul", [input_name, kernel_name], [matmul_name]))
    nodes.append(helper.make_node("Add", [matmul_name, bias_name], [output_name]))

    if not activate:
        return output_name

    sigmoid_name = f"{layer_name}_sigmoid"
    swish_name = f"{layer_name}_swish"
    nodes.append(helper.make_node("Sigmoid", [output_name], [sigmoid_name]))
    nodes.append(helper.make_node("Mul", [output_name, sigmoid_name], [swish_name]))
    return swish_name


def build_policy_model(
    *,
    mean: np.ndarray,
    std: np.ndarray,
    params: dict[str, dict[str, np.ndarray]],
    obs_size: int,
    act_size: int,
    constant_obs: np.ndarray | None = None,
) -> onnx.ModelProto:
    nodes: list[onnx.NodeProto] = []
    initializers: list[onnx.TensorProto] = []

    if constant_obs is None:
        obs_input_name = "obs"
        graph_input = helper.make_tensor_value_info("obs", TensorProto.FLOAT, [1, obs_size])
    else:
        reset_obs = np.asarray(constant_obs, np.float32).reshape(1, obs_size)
        obs_input_name = "obs_from_reset_state"
        graph_input = helper.make_tensor_value_info("obs", TensorProto.FLOAT, [1, 1])
        initializers.extend(
            [
                tensor("constant_observation", reset_obs),
                tensor("dummy_obs_zero", np.zeros((1, obs_size), dtype=np.float32)),
            ]
        )
        nodes.append(helper.make_node("MatMul", ["obs", "dummy_obs_zero"], ["dummy_obs"]))
        nodes.append(
            helper.make_node(
                "Add", ["constant_observation", "dummy_obs"], ["obs_from_reset_state"]
            )
        )

    initializers.extend(
        [
            tensor("normalizer_mean", np.asarray(mean, np.float32)),
            tensor("normalizer_std", np.asarray(std, np.float32)),
        ]
    )
    nodes.append(helper.make_node("Sub", [obs_input_name, "normalizer_mean"], ["obs_centered"]))
    nodes.append(helper.make_node("Div", ["obs_centered", "normalizer_std"], ["normalized_obs"]))

    layer_names = sorted(params, key=lambda name: int(name.rsplit("_", 1)[1]))
    current = "normalized_obs"
    for index, layer_name in enumerate(layer_names):
        current = add_dense(
            nodes=nodes,
            initializers=initializers,
            input_name=current,
            layer_name=layer_name,
            layer_params=params[layer_name],
            activate=index < len(layer_names) - 1,
        )

    initializers.extend(
        [
            tensor("slice_starts", np.asarray([0], np.int64)),
            tensor("slice_ends", np.asarray([act_size], np.int64)),
            tensor("slice_axes", np.asarray([1], np.int64)),
            tensor("slice_steps", np.asarray([1], np.int64)),
        ]
    )
    nodes.append(
        helper.make_node(
            "Slice",
            [current, "slice_starts", "slice_ends", "slice_axes", "slice_steps"],
            ["action_loc"],
        )
    )
    nodes.append(helper.make_node("Tanh", ["action_loc"], ["action"]))

    graph = helper.make_graph(
        nodes,
        "h1_sac_policy",
        [graph_input],
        [helper.make_tensor_value_info("action", TensorProto.FLOAT, [1, act_size])],
        initializer=initializers,
    )
    model = helper.make_model(
        graph,
        producer_name="export_h1_policy_to_onnx",
        opset_imports=[helper.make_opsetid("", 11)],
    )
    model.ir_version = 10
    onnx.checker.check_model(model)
    return model


def numpy_policy(
    obs: np.ndarray,
    *,
    mean: np.ndarray,
    std: np.ndarray,
    params: dict[str, dict[str, np.ndarray]],
    act_size: int,
) -> np.ndarray:
    current = (obs - mean) / std
    layer_names = sorted(params, key=lambda name: int(name.rsplit("_", 1)[1]))
    for index, layer_name in enumerate(layer_names):
        layer = params[layer_name]
        current = current @ np.asarray(layer["kernel"], np.float32)
        current = current + np.asarray(layer["bias"], np.float32)
        if index < len(layer_names) - 1:
            current = current / (1.0 + np.exp(-current))
    return np.tanh(current[:, :act_size])


def load_constant_observation(path: Path, obs_size: int) -> np.ndarray:
    payload = json.loads(path.read_text())
    values = payload["observation"] if isinstance(payload, dict) else payload
    obs = np.asarray(values, dtype=np.float32).reshape(1, -1)
    if obs.shape[1] != obs_size:
        raise ValueError(
            f"{path} contains observation size {obs.shape[1]}, expected {obs_size}"
        )
    return obs


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--safe-learning", type=Path, default=DEFAULT_SAFE_LEARNING)
    parser.add_argument("--checkpoint", type=Path, default=DEFAULT_CHECKPOINT)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument(
        "--constant-observation-json",
        type=Path,
        help=(
            "Optional reset-state JSON. When provided, the ONNX graph accepts a "
            "single dummy input and feeds this observation into the SAC policy."
        ),
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    sys.path.insert(0, str(args.safe_learning))

    from ss2r.benchmark_suites.mujoco_playground.h1_mocap_tracking import viewer
    from ss2r.benchmark_suites.mujoco_playground.h1_mocap_tracking.h1_mocap_env import (
        H1MocapTracking,
    )

    env = H1MocapTracking()
    restored = viewer._restore_sac_checkpoint_numpy(str(args.checkpoint))
    normalizer = restored[0]
    constant_obs = (
        load_constant_observation(args.constant_observation_json, env.observation_size)
        if args.constant_observation_json
        else None
    )
    params = {
        name: {
            "kernel": np.asarray(layer["kernel"], np.float32),
            "bias": np.asarray(layer["bias"], np.float32),
        }
        for name, layer in restored[1]["params"].items()
    }

    model = build_policy_model(
        mean=np.asarray(normalizer.mean, np.float32),
        std=np.asarray(normalizer.std, np.float32),
        params=params,
        obs_size=env.observation_size,
        act_size=env.action_size,
        constant_obs=constant_obs,
    )
    args.output.parent.mkdir(parents=True, exist_ok=True)
    onnx.save(model, args.output)

    session = rt.InferenceSession(str(args.output), providers=["CPUExecutionProvider"])
    probe = np.zeros((1, 1 if constant_obs is not None else env.observation_size), dtype=np.float32)
    expected_obs = constant_obs if constant_obs is not None else probe
    expected = numpy_policy(
        expected_obs,
        mean=np.asarray(normalizer.mean, np.float32),
        std=np.asarray(normalizer.std, np.float32),
        params=params,
        act_size=env.action_size,
    )
    actual = session.run(None, {"obs": probe})[0]
    np.testing.assert_allclose(actual, expected, rtol=1e-5, atol=1e-5)

    print(f"saved {args.output}")
    print(f"input obs {[1, probe.shape[1]]}")
    print(f"output action {[1, env.action_size]}")
    if constant_obs is not None:
        print(f"constant_observation {args.constant_observation_json}")
    print(f"zero_obs_minmax {float(actual.min()):.6f} {float(actual.max()):.6f}")


if __name__ == "__main__":
    main()
