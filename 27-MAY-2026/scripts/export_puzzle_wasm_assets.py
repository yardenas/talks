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
DEFAULT_OUTPUT = ROOT / "viewer/public/assets/puzzle_task4"
DEFAULT_ENV_NAME = "puzzle-3x3-singletask-task4-v0"


def _json_array(value: Any) -> list[Any]:
    return np.asarray(jax.device_get(value)).tolist()


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

    from envs.ogbench_puzzle_mjx import OGBenchPuzzle3x3

    env = OGBenchPuzzle3x3(config_overrides={"env_name": args.env_name})
    state = env.reset(jax.random.PRNGKey(args.seed))
    model = env.mj_model
    data = mujoco.MjData(model)
    mujoco.mj_resetData(model, data)
    data.qpos[:] = np.asarray(jax.device_get(state.data.qpos), dtype=np.float64)
    data.qvel[:] = np.asarray(jax.device_get(state.data.qvel), dtype=np.float64)
    data.ctrl[:] = np.asarray(jax.device_get(state.data.ctrl), dtype=np.float64)
    mujoco.mj_forward(model, data)

    args.output_dir.mkdir(parents=True, exist_ok=True)
    xml_path = args.output_dir / "model.xml"
    mjb_path = args.output_dir / "model.mjb"
    manifest_path = args.output_dir / "env_manifest.json"

    mujoco.mj_saveLastXML(str(xml_path), model)
    mujoco.mj_saveModel(model, str(mjb_path), None)
    assets = _copy_referenced_assets(xml_path, args.output_dir)

    manifest = {
        "version": 1,
        "source": str(Path(__file__).resolve()),
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
            "sim_dt": float(env._config.sim_dt),
            "ctrl_dt": float(env._config.ctrl_dt),
            "n_substeps": int(round(float(env._config.ctrl_dt) / float(env._config.sim_dt))),
            "episode_length": int(env._config.episode_length),
        },
        "ids": {
            "arm_joint_ids": _json_array(env._arm_joint_ids),
            "arm_qposadr": _json_array(env._arm_qposadr),
            "arm_dofadr": _json_array(env._arm_dofadr),
            "arm_actuator_ids": _json_array(env._arm_actuator_ids),
            "gripper_actuator_ids": _json_array(env._gripper_actuator_ids),
            "gripper_opening_qposadr": int(env._gripper_opening_qposadr),
            "pinch_site_id": int(env._pinch_site_id),
            "attach_site_id": int(env._attach_site_id),
            "right_pad_body_id": int(env._right_pad_body_id),
            "button_qposadr": _json_array(env._button_qposadr),
            "button_dofadr": _json_array(env._button_dofadr),
            "button_site_ids": _json_array(env._button_site_ids),
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
            "qpos": _json_array(state.data.qpos),
            "qvel": _json_array(state.data.qvel),
            "ctrl": _json_array(state.data.ctrl),
            "button_states": _json_array(state.info["button_states"]),
            "target_button_states": _json_array(state.info["target_button_states"]),
            "prev_button_qpos": _json_array(state.info["prev_button_qpos"]),
            "observation": _json_array(state.obs),
        },
        "constants": {
            "action_low": [-0.05, -0.05, -0.05, -0.3, -1.0],
            "action_high": [0.05, 0.05, 0.05, 0.3, 1.0],
            "down_quat": [0.0, 1.0, 0.0, 0.0],
            "xyz_center": [0.425, 0.0, 0.0],
            "t_pa_pos": _json_array(env._t_pa_pos),
            "t_pa_quat": _json_array(env._t_pa_quat),
            "ctrl_low": _json_array(env._ctrl_low),
            "ctrl_high": _json_array(env._ctrl_high),
            "toggle_matrix": _json_array(env._toggle_matrix),
            "observation_size": int(np.asarray(jax.device_get(state.obs)).shape[0]),
            "action_size": int(env.action_size),
            "gripper_limit_contact_threshold": float(env._config.gripper_limit_contact_threshold),
            "gripper_limit_contact_gain": float(env._config.gripper_limit_contact_gain),
            "gripper_limit_contact_max": float(env._config.gripper_limit_contact_max),
        },
    }
    manifest_path.write_text(json.dumps(manifest, indent=2))
    print(f"saved {xml_path}")
    print(f"saved {mjb_path}")
    print(f"saved {manifest_path}")
    print(f"copied {len(assets)} assets")
    print(f"observation_size {manifest['constants']['observation_size']}")


if __name__ == "__main__":
    main()
