# Beyond Priors talk

The Slidev deck lives in `main.slides.md`.

## Run locally

1. Install Git LFS and fetch the media assets: `git lfs install && git lfs pull`.
2. Install JavaScript dependencies: `npm ci`.
3. Start the deck: `npm run dev`.
4. Visit <http://localhost:3030>.

`npm run dev` builds the embedded MuJoCo viewer before starting Slidev. A production
build is available through `npm run build`. Run `npm run clean` to remove generated
viewer files and `dist` without touching canonical assets.

## Asset layout

- `public/deck` and `public/videos` contain the presentation media.
- `public/mjswan/assets` is the single canonical copy of the MuJoCo scenes and ONNX
  policies used by both manipulation demos.
- `public/mjswan/assets/common` contains geometry shared by every scene.
- `public/mjswan/index.html` and `public/mjswan/static` are generated and ignored.
- `dist`, `node_modules`, local caches, and raw training checkpoints are not source
  assets and are ignored.

The policy-export scripts accept external checkpoint locations through their command
line arguments; the exported ONNX policies needed by the deck are included here.
