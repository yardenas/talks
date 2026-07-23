from __future__ import annotations

import argparse
import json
import pickle
from pathlib import Path
from typing import Any

import numpy as np
import onnx
import onnxruntime as ort

from export_gradflow_policy_to_onnx import _np_policy, build_model


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_RUN_ROOT = ROOT / "acfql-mpo-dyna-bon-ablation"

TASKS = {
    "puzzle-3x3-play-singletask-task5-v0": {
        "asset_dir": ROOT / "public/mjswan/assets/scene/puzzle_task5",
        "manifest_env": "puzzle-3x3-singletask-task5-v0",
    },
    "cube-double-play-singletask-task5-v0": {
        "asset_dir": ROOT / "public/mjswan/assets/scene/cube_task5",
        "manifest_env": "cube-double-singletask-task5-v0",
    },
}

BEST_POLICY = "mpo_awr_prior_dyna_bon"
BEST_POLICY_LABEL = "Odyn"

POLICY_LABELS = {
    BEST_POLICY: BEST_POLICY_LABEL,
}

POLICY_ORDER = [
    BEST_POLICY,
]


def _variant_name(flags: dict[str, Any]) -> str:
    variant = flags.get("variant")
    if isinstance(variant, dict) and isinstance(variant.get("name"), str):
        return variant["name"]
    agent = flags.get("agent")
    if isinstance(agent, dict):
        variant = agent.get("variant")
        if isinstance(variant, dict) and isinstance(variant.get("name"), str):
            return variant["name"]
    raise ValueError("flags.json does not contain variant.name.")


def _safe_filename(name: str) -> str:
    return "".join(ch if ch.isalnum() or ch in "._-" else "_" for ch in name)


def _display_path(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


def _actor_params(payload: dict[str, Any]) -> dict[str, dict[str, np.ndarray]]:
    params = payload["agent"]["network"]["params"]["modules_actor_flow"]["mlp"]
    return {
        name: {
            "kernel": np.asarray(layer["kernel"], dtype=np.float32),
            "bias": np.asarray(layer["bias"], dtype=np.float32),
        }
        for name, layer in params.items()
        if name.startswith("Dense_")
    }


def _infer_dims(
    actor_params: dict[str, dict[str, np.ndarray]],
    manifest: dict[str, Any],
    action_dim: int,
) -> tuple[int, int]:
    first_kernel = actor_params["Dense_0"]["kernel"]
    final_name = sorted(actor_params, key=lambda name: int(name.split("_")[-1]))[-1]
    full_action_dim = int(actor_params[final_name]["bias"].shape[0])
    obs_dim = int(manifest.get("constants", {}).get("observation_size", 0))
    inferred_obs_dim = int(first_kernel.shape[0] - full_action_dim - 1)
    if obs_dim != inferred_obs_dim:
        raise ValueError(
            "Checkpoint does not match the exported env manifest: "
            f"actor input implies obs_dim={inferred_obs_dim}, manifest has obs_dim={obs_dim}."
        )
    if full_action_dim % action_dim != 0:
        raise ValueError(
            f"full_action_dim={full_action_dim} is not divisible by action_dim={action_dim}."
        )
    return obs_dim, full_action_dim


def _validate_onnx(
    output: Path,
    actor_params: dict[str, dict[str, np.ndarray]],
    *,
    obs_dim: int,
    full_action_dim: int,
    action_dim: int,
    flow_steps: int,
) -> None:
    session = ort.InferenceSession(str(output), providers=["CPUExecutionProvider"])
    obs = np.linspace(-0.25, 0.25, obs_dim, dtype=np.float32).reshape(1, obs_dim)
    noise = np.linspace(-0.5, 0.5, full_action_dim, dtype=np.float32).reshape(1, full_action_dim)
    expected = _np_policy(
        obs,
        noise,
        actor_params,
        action_dim=action_dim,
        flow_steps=flow_steps,
        output_full_action=True,
    )
    actual = session.run(None, {"obs": obs, "noise": noise})[0]
    np.testing.assert_allclose(actual, expected, rtol=1e-5, atol=1e-5)


def _export_checkpoint(
    checkpoint: Path,
    output: Path,
    manifest: dict[str, Any],
    flags: dict[str, Any],
    *,
    action_dim: int,
) -> dict[str, Any]:
    payload = pickle.loads(checkpoint.read_bytes())
    actor_params = _actor_params(payload)
    obs_dim, full_action_dim = _infer_dims(actor_params, manifest, action_dim)
    flow_steps = int(flags.get("agent", {}).get("flow_steps", 10))
    model = build_model(
        actor_params=actor_params,
        obs_dim=obs_dim,
        full_action_dim=full_action_dim,
        action_dim=action_dim,
        flow_steps=flow_steps,
        output_full_action=True,
    )
    output.parent.mkdir(parents=True, exist_ok=True)
    onnx.save(model, output)
    _validate_onnx(
        output,
        actor_params,
        obs_dim=obs_dim,
        full_action_dim=full_action_dim,
        action_dim=action_dim,
        flow_steps=flow_steps,
    )
    return {
        "flow_steps": flow_steps,
        "obs_dim": obs_dim,
        "full_action_dim": full_action_dim,
    }


def _find_runs(run_root: Path, task_name: str) -> list[Path]:
    task_dir = run_root / task_name
    if not task_dir.exists():
        raise FileNotFoundError(f"Missing task directory: {task_dir}")
    return sorted(path.parent for path in task_dir.glob("*/flags.json"))


def _run_sort_key(run_dir: Path) -> tuple[int, str]:
    try:
        flags = json.loads((run_dir / "flags.json").read_text())
        variant = _variant_name(flags)
    except Exception:
        variant = run_dir.name
    try:
        return (POLICY_ORDER.index(variant), run_dir.name)
    except ValueError:
        return (len(POLICY_ORDER), run_dir.name)


def _export_task(
    run_root: Path,
    task_name: str,
    task_config: dict[str, Any],
    *,
    checkpoint_step: int,
    action_dim: int,
) -> None:
    asset_dir = task_config["asset_dir"]
    manifest_path = asset_dir / "env_manifest.json"
    manifest = json.loads(manifest_path.read_text())
    if manifest.get("env_name") != task_config["manifest_env"]:
        raise ValueError(
            f"{manifest_path} has env_name={manifest.get('env_name')!r}; "
            f"expected {task_config['manifest_env']!r}."
        )

    entries: list[dict[str, Any]] = []
    for run_dir in sorted(_find_runs(run_root, task_name), key=_run_sort_key):
        flags = json.loads((run_dir / "flags.json").read_text())
        variant = _variant_name(flags)
        if variant != BEST_POLICY:
            continue
        checkpoint = run_dir / f"params_{checkpoint_step}.pkl"
        if not checkpoint.exists():
            raise FileNotFoundError(f"Missing checkpoint for {variant}: {checkpoint}")

        output_name = f"policy_{_safe_filename(variant)}.onnx"
        stats = _export_checkpoint(
            checkpoint,
            asset_dir / output_name,
            manifest,
            flags,
            action_dim=action_dim,
        )
        agent_flags = flags.get("agent", {})
        entries.append(
            {
                "id": variant,
                "label": POLICY_LABELS.get(variant, variant.replace("_", " ")),
                "path": output_name,
                "default": variant == BEST_POLICY,
                "checkpoint_step": checkpoint_step,
                "checkpoint": _display_path(checkpoint),
                "metadata": {
                    "variant": variant,
                    "actor_num_samples": agent_flags.get("actor_num_samples"),
                    "offline_dyna_enabled": agent_flags.get("offline_dyna", {}).get("enabled"),
                    "prior_loss_type": agent_flags.get("prior_loss_type"),
                    "offline_actor_loss_type": agent_flags.get("offline_actor_loss_type"),
                    **stats,
                },
            }
        )
        print(f"saved {asset_dir / output_name}")

    policy_manifest = {
        "version": 1,
        "env_name": manifest["env_name"],
        "checkpoint_step": checkpoint_step,
        "default": BEST_POLICY,
        "policies": entries,
    }
    (asset_dir / "policy_manifest.json").write_text(
        json.dumps(policy_manifest, indent=2) + "\n"
    )
    print(f"saved {asset_dir / 'policy_manifest.json'}")


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--run-root", type=Path, default=DEFAULT_RUN_ROOT)
    parser.add_argument("--checkpoint-step", type=int, default=500000)
    parser.add_argument("--action-dim", type=int, default=5)
    return parser.parse_args()


def main() -> None:
    args = _parse_args()
    for task_name, task_config in TASKS.items():
        _export_task(
            args.run_root,
            task_name,
            task_config,
            checkpoint_step=args.checkpoint_step,
            action_dim=args.action_dim,
        )


if __name__ == "__main__":
    main()
