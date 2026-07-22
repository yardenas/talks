import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const viewerRoot = fileURLToPath(new URL("../public/mjswan/", import.meta.url));
const targets = [
  `${viewerRoot}/index.html`,
  `${viewerRoot}/static`,
];

if (process.argv.includes("--all")) {
  targets.push(fileURLToPath(new URL("../dist/", import.meta.url)));
}

await Promise.all(targets.map((target) => rm(target, { force: true, recursive: true })));
