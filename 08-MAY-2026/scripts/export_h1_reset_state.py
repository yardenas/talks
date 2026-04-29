from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import jax
import numpy as np


DEFAULT_SAFE_LEARNING = Path("/Users/yardas/safe-learning")
DEFAULT_OUTPUT = (
    Path(__file__).resolve().parents[1]
    / "public/mjswan/assets/policy/h1_mocap_tracking/h1_reset_state.json"
)


def as_list(value) -> list[float]:
    return np.asarray(value, dtype=np.float32).reshape(-1).tolist()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--safe-learning", type=Path, default=DEFAULT_SAFE_LEARNING)
    parser.add_argument("--seed", type=int, default=0)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    sys.path.insert(0, str(args.safe_learning))

    from ss2r.benchmark_suites.mujoco_playground.h1_mocap_tracking.h1_mocap_env import (
        H1MocapTracking,
    )

    env = H1MocapTracking()
    state = env.reset(jax.random.PRNGKey(args.seed))
    loco_state = state.info["_loco_state"]
    obs = np.asarray(state.obs, dtype=np.float32)
    qpos = np.asarray(state.data.qpos, dtype=np.float32)
    qvel = np.asarray(state.data.qvel, dtype=np.float32)
    traj_state = loco_state.additional_carry.traj_state

    observation_parts = []
    for name, item in env._loco_env.obs_container.items():
        indices = np.asarray(item.obs_ind, dtype=np.int32)
        observation_parts.append(
            {
                "name": name,
                "type": type(item).__name__,
                "indices": indices.tolist(),
                "size": int(indices.size),
                "values": as_list(obs[indices]),
            }
        )

    policy_joint_names = [
        "back_bkz",
        "l_arm_shy",
        "l_arm_shx",
        "l_arm_shz",
        "left_elbow",
        "r_arm_shy",
        "r_arm_shx",
        "r_arm_shz",
        "right_elbow",
        "hip_flexion_r",
        "hip_adduction_r",
        "hip_rotation_r",
        "knee_angle_r",
        "ankle_angle_r",
        "hip_flexion_l",
        "hip_adduction_l",
        "hip_rotation_l",
        "knee_angle_l",
        "ankle_angle_l",
    ]
    qpos_by_joint = {
        env._mj_model.joint(joint_id).name: int(env._mj_model.jnt_qposadr[joint_id])
        for joint_id in range(env._mj_model.njnt)
        if env._mj_model.joint(joint_id).name != "root"
    }

    reset = {
        "source": str(
            args.safe_learning
            / "ss2r/benchmark_suites/mujoco_playground/h1_mocap_tracking/h1_mocap_env.py"
        ),
        "seed": args.seed,
        "trajectory": {
            "name": env._dataset_name,
            "traj_no": int(np.asarray(traj_state.traj_no)),
            "subtraj_step_no": int(np.asarray(traj_state.subtraj_step_no)),
            "subtraj_step_no_init": int(np.asarray(traj_state.subtraj_step_no_init)),
        },
        "sizes": {
            "observation": int(obs.size),
            "qpos": int(qpos.size),
            "qvel": int(qvel.size),
            "action": int(env.action_size),
        },
        "qpos": as_list(qpos),
        "qvel": as_list(qvel),
        "observation": as_list(obs),
        "observation_parts": observation_parts,
        "policy_joint_names": policy_joint_names,
        "default_joint_pos": [
            float(qpos[qpos_by_joint[name]]) for name in policy_joint_names
        ],
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(reset, indent=2) + "\n")
    print(f"saved {args.output}")
    print(
        "reset",
        f"seed={args.seed}",
        f"traj_step={reset['trajectory']['subtraj_step_no']}",
        f"obs={reset['sizes']['observation']}",
    )


if __name__ == "__main__":
    main()
