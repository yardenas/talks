import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  root: "viewer",
  publicDir: "public-cube",
  base: "/mjswan-cube/",
  plugins: [react(), vanillaExtractPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify("0.5.1-cube"),
    __MUJOCO_MT__: JSON.stringify(false),
  },
  resolve: {
    alias: {
      "@": path.resolve("viewer/src"),
    },
  },
  build: {
    outDir: "../public/mjswan-cube",
    emptyOutDir: true,
    target: "es2022",
    assetsDir: "assets",
    chunkSizeWarningLimit: 11000,
    rollupOptions: {
      input: path.resolve("viewer/index.html"),
      onwarn(warning, warn) {
        if (
          warning.message.includes("mujoco") &&
          warning.message.includes("externalized for browser compatibility")
        ) {
          return;
        }
        warn(warning);
      },
      output: {
        format: "es",
      },
    },
  },
  optimizeDeps: {
    exclude: ["mujoco", "mujoco/mt"],
  },
  assetsInclude: ["**/*.wasm"],
  worker: {
    format: "es",
  },
});
