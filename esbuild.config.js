const esbuild = require("esbuild");

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["./src/index.ts"],
  minify: true,
  external: ["react"],
  sourcemap: true,
  outdir: "./dist",
  bundle: true,
};

esbuild.build({
  ...options,
  format: "cjs",
});
esbuild.build({
  ...options,
  format: "esm",
  outExtension: {
    ".js": ".mjs",
  },
});
