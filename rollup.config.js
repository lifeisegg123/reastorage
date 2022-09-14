import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";
import fs from "fs";

const { dependencies, peerDependencies } = JSON.parse(
  fs.readFileSync("./package.json")
);

const external = new Set(Object.keys({ ...dependencies, ...peerDependencies }));

/** @type {import('rollup').RollupOptions['output']} */
const output = {
  preserveModules: true,
  sourcemap: true,
  dir: "./dist",
};

const sharedConfig = {
  external: [...external],
  input: "src/index.ts",
};

export default [
  {
    ...sharedConfig,
    plugins: [
      esbuild({
        jsx: "automatic",
        minify: true,
        exclude: "**/*.spec.ts",
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
