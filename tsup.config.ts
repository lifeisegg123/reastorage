import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/*.ts', 'src/*/*.ts', '!**/*.{spec,test,test-d}.*'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  dts: true,
  platform: "neutral",
  splitting: true,
  minify: true,
})
