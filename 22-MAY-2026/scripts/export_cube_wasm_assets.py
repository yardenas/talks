from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import sys
from pathlib import Path
from typing import Any

os.environ.setdefault("MUJOCO_GL", "disable")

import jax
import mujoco
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
DYNA_MPO = Path("/Users/yardas/dyna-mpo")
DEFAULT_OUTPUT = ROOT / "viewer/public-cube/assets/scene/cube_task2"
DEFAULT_ENV_NAME = "cube-double-singletask-task2-v0"


def _json_array(value: Any) -> list[Any]:
    return np.asarray(jax.device_get(value)).tolist()


def _flat_json_array(value: Any) -> list[Any]:
    return np.asarray(jax.device_get(value)).reshape(-1).tolist()


def _name_list(model: mujoco.MjModel, kind: str, count: int) -> list[str]:
    accessor = {
        "body": model.body,
        "geom": model.geom,
        "joint": model.joint,
        "actuator": model.actuator,
        "site": model.site,
        "light": model.light,
        "camera": model.camera,
    }[kind]
    return [accessor(i).name for i in range(count)]


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dyna-mpo", type=Path, default=DYNA_MPO)
    parser.add_argument("--env-name", default=DEFAULT_ENV_NAME)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--seed", type=int, default=0)
    return parser.parse_args()


def _copy_referenced_assets(xml_path: Path, output_dir: Path) -> list[str]:
    import ogbench

    ogbench_root = Path(ogbench.__file__).resolve().parent / "manipspace/descriptions"
    asset_index = {
        path.name: path
        for path in ogbench_root.rglob("*")
        if path.is_file() and path.suffix.lower() in {".stl", ".obj", ".png", ".jpg", ".jpeg"}
    }
    copied: list[str] = []
    xml = xml_path.read_text()
    for name in sorted(set(re.findall(r'file="([^"]+)"', xml))):
        if "/" in name:
            continue
        source = asset_index.get(name)
        if source is None:
            raise FileNotFoundError(f"Could not locate MuJoCo asset {name!r} under {ogbench_root}")
        shutil.copy2(source, output_dir / name)
        copied.append(name)
    return copied


def main() -> None:
    args = _parse_args()
    sys.path.insert(0, str(args.dyna_mpo))

    import gymnasium
    import ogbench  # noqa: F401

    gym_env = gymnasium.make(args.env_name)
    observation, _ = gym_env.reset(seed=args.seed)
    env = gym_env.unwrapped
    model = env._model
    data = env._data

    arm_joint_ids = np.asarray(env._arm_joint_ids, dtype=np.int32)
    arm_qposadr = np.asarray([model.jnt_qposadr[joint_id] for joint_id in arm_joint_ids], dtype=np.int32)
    arm_dofadr = np.asarray([model.jnt_dofadr[joint_id] for joint_id in arm_joint_ids], dtype=np.int32)
    gripper_opening_qposadr = int(model.jnt_qposadr[env._gripper_opening_joint_id])
    cube_qposadr = np.asarray(
        [model.jnt_qposadr[model.joint(f"object_joint_{idx}").id] for idx in range(env._num_cubes)],
        dtype=np.int32,
    )

    args.output_dir.mkdir(parents=True, exist_ok=True)
    xml_path = args.output_dir / "model.xml"
    mjb_path = args.output_dir / "model.mjb"
    manifest_path = args.output_dir / "env_manifest.json"

    mujoco.mj_saveLastXML(str(xml_path), model)
    mujoco.mj_saveModel(model, str(mjb_path), None)
    assets = _copy_referenced_assets(xml_path, args.output_dir)

    target_xyzs = np.asarray(
        [data.mocap_pos[mocap_id].copy() for mocap_id in env._cube_target_mocap_ids],
        dtype=np.float64,
    )
    target_quats = np.asarray(
        [data.mocap_quat[mocap_id].copy() for mocap_id in env._cube_target_mocap_ids],
        dtype=np.float64,
    )
    cube_positions = np.asarray(
        [data.qpos[qposadr : qposadr + 3].copy() for qposadr in cube_qposadr],
        dtype=np.float64,
    )
    successes = np.linalg.norm(cube_positions - target_xyzs, axis=1) <= 0.04

    manifest = {
        "version": 1,
        "source": str(Path(__file__).resolve()),
        "source_backend": "ogbench",
        "env_name": args.env_name,
        "seed": args.seed,
        "model": {
            "xml": "model.xml",
            "mjb": "model.mjb",
            "assets": assets,
            "nq": int(model.nq),
            "nv": int(model.nv),
            "nu": int(model.nu),
            "nbody": int(model.nbody),
            "ngeom": int(model.ngeom),
            "nsite": int(model.nsite),
            "nlight": int(model.nlight),
        },
        "timing": {
            "sim_dt": float(env._physics_timestep),
            "ctrl_dt": float(env._control_timestep),
            "n_substeps": int(env._n_steps),
            "episode_length": int(gym_env.spec.max_episode_steps or 500),
        },
        "ids": {
            "arm_joint_ids": _json_array(arm_joint_ids),
            "arm_qposadr": _json_array(arm_qposadr),
            "arm_dofadr": _json_array(arm_dofadr),
            "arm_actuator_ids": _json_array(env._arm_actuator_ids),
            "gripper_actuator_ids": _json_array(env._gripper_actuator_ids),
            "gripper_opening_qposadr": gripper_opening_qposadr,
            "pinch_site_id": int(env._pinch_site_id),
            "attach_site_id": int(env._attach_site_id),
            "right_pad_body_id": int(model.body("ur5e/robotiq/right_pad").id),
            "cube_qposadr": _json_array(cube_qposadr),
            "cube_target_mocap_ids": _json_array(env._cube_target_mocap_ids),
            "cube_geom_ids_list": _json_array(env._cube_geom_ids_list),
            "cube_target_geom_ids_list": _json_array(env._cube_target_geom_ids_list),
        },
        "names": {
            "body": _name_list(model, "body", model.nbody),
            "geom": _name_list(model, "geom", model.ngeom),
            "joint": _name_list(model, "joint", model.njnt),
            "actuator": _name_list(model, "actuator", model.nu),
            "site": _name_list(model, "site", model.nsite),
            "light": _name_list(model, "light", model.nlight),
            "camera": _name_list(model, "camera", model.ncam),
        },
        "reset": {
            "qpos": _json_array(data.qpos),
            "qvel": _json_array(data.qvel),
            "ctrl": _json_array(data.ctrl),
            "mocap_pos": _flat_json_array(data.mocap_pos),
            "mocap_quat": _flat_json_array(data.mocap_quat),
            "target_xyzs": _json_array(target_xyzs),
            "target_quats": _json_array(target_quats),
            "successes": _json_array(successes),
            "observation": _json_array(observation),
        },
        "constants": {
            "action_low": _json_array(env.action_low),
            "action_high": _json_array(env.action_high),
            "down_quat": [0.0, 1.0, 0.0, 0.0],
            "xyz_center": [0.425, 0.0, 0.0],
            "workspace_bounds": _json_array(env._workspace_bounds),
            "t_pa_pos": _json_array(env._T_pa.translation()),
            "t_pa_quat": _json_array(env._T_pa.rotation().wxyz),
            "ctrl_low": _json_array(model.actuator_ctrlrange[:, 0]),
            "ctrl_high": _json_array(model.actuator_ctrlrange[:, 1]),
            "arm_sampling_bounds": _json_array(env._arm_sampling_bounds),
            "cube_colors": _json_array(env._cube_colors[: env._num_cubes]),
            "cube_success_colors": _json_array(env._cube_success_colors[: env._num_cubes]),
            "num_cubes": int(env._num_cubes),
            "success_threshold": 0.04,
            "observation_size": int(np.asarray(observation).shape[0]),
            "action_size": int(env.action_space.shape[0]),
        },
    }
    manifest_path.write_text(json.dumps(manifest, indent=2))
    public_root = args.output_dir.parents[2] if len(args.output_dir.parents) >= 3 else args.output_dir.parent
    asset_manifest = sorted(
        path.relative_to(public_root).as_posix()
        for path in args.output_dir.iterdir()
        if path.is_file() and path.name != "index.json"
    )
    (args.output_dir / "index.json").write_text(json.dumps(asset_manifest, indent=2))
    print(f"saved {xml_path}")
    print(f"saved {mjb_path}")
    print(f"saved {manifest_path}")
    print(f"copied {len(assets)} assets")
    print(f"observation_size {manifest['constants']['observation_size']}")


if __name__ == "__main__":
    main()
