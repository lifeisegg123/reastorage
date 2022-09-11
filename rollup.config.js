import esbuild from "rollup-plugin-esbuild";

/** @type {import('rollup').RollupOptions['output']} */
const output = {
  preserveModules: true,
  sourcemap: true,
  dir: "./dist",
};

export default {
  external: [
    "react",
    "use-sync-external-store",
    "use-sync-external-store/shim",
  ],
  input: "src/index.ts",
  plugins: [
    esbuild({
      jsx: "automatic",
      minify: true,
    }),
  ],
  output: [
    {
      ...output,
      format: "cjs",
    },
    {
      ...output,
      format: "esm",
      entryFileNames: "[name].mjs",
    },
  ],
};
