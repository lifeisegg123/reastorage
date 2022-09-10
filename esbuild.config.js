const esbuild = require("esbuild");

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["./src/index.ts"],
  minify: true,
  target: "es2015",
  external: ["react"],
  sourcemap: true,
  outdir: "./dist",
  bundle: true,
};

Promise.all([
  esbuild.build({
    ...options,
    format: "cjs",
  }),
  esbuild.build({
    ...options,
    format: "esm",
    outExtension: {
      ".js": ".mjs",
    },
  }),
]).catch(() => process.exit(1));
