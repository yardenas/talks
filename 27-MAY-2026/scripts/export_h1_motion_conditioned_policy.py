from __future__ import annotations

import argparse
import io
import json
import sys
import zipfile
from pathlib import Path
from types import SimpleNamespace

import numpy as np
import onnx
import onnxruntime as rt
from onnx import TensorProto, helper

from export_h1_policy_to_onnx import add_dense, numpy_policy, tensor


DEFAULT_SAFE_LEARNING = Path("/Users/yardas/safe-learning")
DEFAULT_CHECKPOINT = DEFAULT_SAFE_LEARNING / "ckpt/gytlhnyk_step_latest"
DEFAULT_POLICY_DIR = (
    Path(__file__).resolve().parents[1]
    / "public/mjswan/assets/policy/h1_mocap_tracking"
)
DEFAULT_OUTPUT = DEFAULT_POLICY_DIR / "h1_policy_motion_conditioned.onnx"
DEFAULT_REFERENCE_OUTPUT = DEFAULT_POLICY_DIR / "h1_walk1_subject5_reference_obs.npz"
DEFAULT_RESET_STATE = DEFAULT_POLICY_DIR / "h1_reset_state.json"
DEFAULT_BASE_POLICY = DEFAULT_POLICY_DIR / "h1_policy.onnx"


def load_reset_payload(path: Path) -> dict:
    payload = json.loads(path.read_text())
    if not isinstance(payload, dict):
        raise TypeError(f"{path} must contain a reset-state object")
    return payload


def save_npz_for_mjswan(path: Path, **arrays: np.ndarray) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(
        path,
        mode="w",
        compression=zipfile.ZIP_STORED,
        allowZip64=False,
    ) as archive:
        for name, value in arrays.items():
            buffer = io.BytesIO()
            np.lib.format.write_array(buffer, np.asarray(value), allow_pickle=False)
            archive.writestr(f"{name}.npy", buffer.getvalue())


def rotate_to_start(value: np.ndarray, frame: int) -> np.ndarray:
    return np.concatenate([value[frame:], value[:frame]], axis=0)


def trajectory_arrays(env) -> dict[str, np.ndarray]:
    data = env._loco_env.th.traj.data
    return {
        name: np.asarray(getattr(data, name), dtype=np.float32)
        for name in (
            "qpos",
            "qvel",
            "xpos",
            "xquat",
            "cvel",
            "subtree_com",
            "site_xpos",
            "site_xmat",
        )
    }


def build_reference_table(env, arrays: dict[str, np.ndarray], reset_frame: int) -> np.ndarray:
    from ss2r.benchmark_suites.mujoco_playground.h1_mocap_tracking.loco_mujoco.core.utils.math import (
        calculate_relative_site_quatities,
    )

    goal = env._loco_env.obs_container["GoalTrajMimic"]
    qpos_ind = np.asarray(goal._qpos_ind, dtype=np.int64)
    qvel_ind = np.asarray(goal._qvel_ind, dtype=np.int64)
    rel_site_ids = np.asarray(goal._rel_site_ids, dtype=np.int64)
    rel_body_ids = np.asarray(goal._site_bodyid[rel_site_ids], dtype=np.int64)
    body_rootid = np.asarray(goal._body_rootid, dtype=np.int64)

    qpos = rotate_to_start(arrays["qpos"], reset_frame)
    qvel = rotate_to_start(arrays["qvel"], reset_frame)
    site_xpos = rotate_to_start(arrays["site_xpos"], reset_frame)
    site_xmat = rotate_to_start(arrays["site_xmat"], reset_frame)
    cvel = rotate_to_start(arrays["cvel"], reset_frame)
    subtree_com = rotate_to_start(arrays["subtree_com"], reset_frame)

    rows = np.empty((qpos.shape[0], 217), dtype=np.float32)
    for frame in range(qpos.shape[0]):
        frame_data = SimpleNamespace(
            qpos=qpos[frame],
            qvel=qvel[frame],
            site_xpos=site_xpos[frame],
            site_xmat=site_xmat[frame],
            cvel=cvel[frame],
            subtree_com=subtree_com[frame],
        )
        site_rpos, site_rangles, site_rvel = calculate_relative_site_quatities(
            frame_data,
            rel_site_ids,
            rel_body_ids,
            body_rootid,
            np,
        )
        rows[frame] = np.concatenate(
            [
                qpos[frame, qpos_ind],
                qvel[frame, qvel_ind],
                np.ravel(site_rpos),
                np.ravel(site_rangles),
                np.ravel(site_rvel),
            ]
        ).astype(np.float32)
    return rows


def build_motion_conditioned_model(
    *,
    reference_obs: np.ndarray,
    reset_live_obs: np.ndarray,
    mean: np.ndarray,
    std: np.ndarray,
    params: dict[str, dict[str, np.ndarray]],
    act_size: int,
) -> onnx.ModelProto:
    nodes: list[onnx.NodeProto] = []
    initializers: list[onnx.TensorProto] = [
        tensor("reference_obs", np.asarray(reference_obs, np.float32)),
        tensor("reset_live_obs", np.asarray(reset_live_obs, np.float32)),
        tensor("time_step_shape", np.asarray([1], np.int64)),
        tensor("zero_time_step", np.asarray([[0]], np.int64)),
        tensor("reference_length", np.asarray([reference_obs.shape[0]], np.int64)),
        tensor("normalizer_mean", np.asarray(mean, np.float32)),
        tensor("normalizer_std", np.asarray(std, np.float32)),
    ]

    nodes.extend(
        [
            helper.make_node("Cast", ["time_step"], ["time_step_i64"], to=TensorProto.INT64),
            helper.make_node(
                "Reshape", ["time_step_i64", "time_step_shape"], ["time_step_flat"]
            ),
            helper.make_node(
                "Mod",
                ["time_step_flat", "reference_length"],
                ["reference_frame"],
                fmod=0,
            ),
            helper.make_node("Equal", ["time_step_i64", "zero_time_step"], ["reset_live_mask"]),
            helper.make_node("Where", ["reset_live_mask", "reset_live_obs", "live_obs"], ["selected_live_obs"]),
            helper.make_node("Gather", ["reference_obs", "reference_frame"], ["reference_row"], axis=0),
            helper.make_node("Concat", ["selected_live_obs", "reference_row"], ["obs"], axis=1),
            helper.make_node("Sub", ["obs", "normalizer_mean"], ["obs_centered"]),
            helper.make_node("Div", ["obs_centered", "normalizer_std"], ["normalized_obs"]),
        ]
    )

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
        "h1_sac_policy_motion_conditioned",
        [
            helper.make_tensor_value_info("live_obs", TensorProto.FLOAT, [1, 217]),
            helper.make_tensor_value_info("time_step", TensorProto.FLOAT, [1, 1]),
        ],
        [helper.make_tensor_value_info("action", TensorProto.FLOAT, [1, act_size])],
        initializer=initializers,
    )
    model = helper.make_model(
        graph,
        producer_name="export_h1_motion_conditioned_policy",
        opset_imports=[helper.make_opsetid("", 11)],
    )
    model.ir_version = 10
    onnx.checker.check_model(model)
    return model


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--safe-learning", type=Path, default=DEFAULT_SAFE_LEARNING)
    parser.add_argument("--checkpoint", type=Path, default=DEFAULT_CHECKPOINT)
    parser.add_argument("--reset-state-json", type=Path, default=DEFAULT_RESET_STATE)
    parser.add_argument("--base-policy", type=Path, default=DEFAULT_BASE_POLICY)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument(
        "--reference-output",
        type=Path,
        default=DEFAULT_REFERENCE_OUTPUT,
        help="Debug artifact containing the embedded reference observation table.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    sys.path.insert(0, str(args.safe_learning))

    from ss2r.benchmark_suites.mujoco_playground.h1_mocap_tracking import viewer
    from ss2r.benchmark_suites.mujoco_playground.h1_mocap_tracking.h1_mocap_env import (
        H1MocapTracking,
    )

    reset_payload = load_reset_payload(args.reset_state_json)
    reset_frame = int(reset_payload["trajectory"]["subtraj_step_no"])
    reset_obs = np.asarray(reset_payload["observation"], dtype=np.float32).reshape(1, -1)

    env = H1MocapTracking()
    if env._dataset_name != reset_payload["trajectory"]["name"]:
        raise ValueError(
            f"Reset state uses {reset_payload['trajectory']['name']}, "
            f"but environment loaded {env._dataset_name}"
        )

    restored = viewer._restore_sac_checkpoint_numpy(str(args.checkpoint))
    normalizer = restored[0]
    params = {
        name: {
            "kernel": np.asarray(layer["kernel"], np.float32),
            "bias": np.asarray(layer["bias"], np.float32),
        }
        for name, layer in restored[1]["params"].items()
    }

    arrays = trajectory_arrays(env)
    if reset_frame < 0 or reset_frame >= arrays["qpos"].shape[0]:
        raise IndexError(f"Reset frame {reset_frame} is outside trajectory length {arrays['qpos'].shape[0]}")

    reference_obs = build_reference_table(env, arrays, reset_frame)
    save_npz_for_mjswan(args.reference_output, reference_obs=reference_obs)

    np.testing.assert_allclose(reference_obs[0], reset_obs[0, 217:], rtol=2e-5, atol=2e-5)

    model = build_motion_conditioned_model(
        reference_obs=reference_obs,
        reset_live_obs=reset_obs[:, :217],
        mean=np.asarray(normalizer.mean, np.float32),
        std=np.asarray(normalizer.std, np.float32),
        params=params,
        act_size=env.action_size,
    )
    args.output.parent.mkdir(parents=True, exist_ok=True)
    onnx.save(model, args.output)

    live_obs = reset_obs[:, :217]
    expected = numpy_policy(
        reset_obs,
        mean=np.asarray(normalizer.mean, np.float32),
        std=np.asarray(normalizer.std, np.float32),
        params=params,
        act_size=env.action_size,
    )
    wrapped_session = rt.InferenceSession(str(args.output), providers=["CPUExecutionProvider"])
    wrapped = wrapped_session.run(
        None,
        {"live_obs": np.zeros_like(live_obs), "time_step": np.asarray([[0]], dtype=np.float32)},
    )[0]
    np.testing.assert_allclose(wrapped, expected, rtol=1e-5, atol=1e-5)

    wrapped_loop = wrapped_session.run(
        None,
        {
            "live_obs": live_obs,
            "time_step": np.asarray([[reference_obs.shape[0]]], dtype=np.float32),
        },
    )[0]
    np.testing.assert_allclose(wrapped_loop, wrapped, rtol=1e-5, atol=1e-5)

    if args.base_policy.exists():
        base_session = rt.InferenceSession(str(args.base_policy), providers=["CPUExecutionProvider"])
        base = base_session.run(None, {"obs": reset_obs})[0]
        np.testing.assert_allclose(wrapped, base, rtol=1e-5, atol=1e-5)

    print(f"saved {args.output}")
    print(f"saved {args.reference_output}")
    print(f"reference_obs {list(reference_obs.shape)}")
    print(f"embedded_motion_frames {reference_obs.shape[0]}")
    print("inputs live_obs [1, 217] time_step [1, 1]")
    print(f"output action [1, {env.action_size}]")
    print(f"reset_frame {reset_frame}")
    print("reset_live_obs_override true")
    print(f"reset_action_minmax {float(wrapped.min()):.6f} {float(wrapped.max()):.6f}")


if __name__ == "__main__":
    main()
