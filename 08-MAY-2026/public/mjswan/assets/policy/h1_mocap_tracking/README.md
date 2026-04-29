# H1 Motion-Conditioned Policy Artifact

The SAC checkpoint at `/Users/yardas/safe-learning/ckpt/gytlhnyk_step_latest`
is exported in two forms:

- `h1_policy.onnx`: original 434D observation policy.
- `h1_policy_motion_conditioned.onnx`: browser policy with inputs
  `live_obs [1, 217]` and mjswan's generic `time_step [1, 1]`.

`h1_reset_state.json` is a deterministic `H1MocapTracking.reset(PRNGKey(0))`
sample from `h1_mocap_env.py`. It stores the full 434-dimensional observation,
the named observation chunks from `obs_container`, the MuJoCo `qpos`/`qvel`, and
the policy-order joint positions.

`h1_policy_motion_conditioned.onnx` embeds
`h1_walk1_subject5_reference_obs.npz` as a constant table. It casts
`time_step`, wraps it to the trajectory length, gathers the matching 217D
reference row, concatenates it with the browser-computed 217D live observation,
and runs the SAC MLP. No mjswan `TrackingCommand` or motion `.npz` asset is
used at runtime.

Regenerate all motion-conditioned artifacts with:

```bash
/Users/yardas/safe-learning/.venv/bin/python scripts/export_h1_motion_conditioned_policy.py
```

The exporter checks that `time_step = 0` reconstructs the reset-frame reference
observation, that `time_step = trajectory_length` wraps back to frame 0, and
that the wrapper action matches `h1_policy.onnx` on the reconstructed 434D reset
observation.
