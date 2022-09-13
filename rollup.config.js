import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";

/** @type {import('rollup').RollupOptions['output']} */
const output = {
  preserveModules: true,
  sourcemap: true,
  dir: "./dist",
};

const sharedConfig = {
  external: [
    "react",
    "use-sync-external-store",
    "use-sync-external-store/shim/index.js",
    "lz-string",
  ],
  input: "src/index.ts",
};

export default [
  {
    ...sharedConfig,
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
  },
  {
    ...sharedConfig,
    output: { ...output, entryFileNames: "[name].d.ts", format: "esm" },
    plugins: [dts()],
  },
];
