import typescript from "@rollup/plugin-typescript";

/**
 * @type import('rollup').RollupOptions
 */
const plugin = {
  input: "src/plugin/index.ts",
  output: {
    dir: "lib/plugin",
    format: "es",
  },
  plugins: [
    typescript({
      outDir: "lib/plugin/types",
      include: ["src/plugin/**/*.ts"],
    }),
  ],
};

/**
 * @type import('rollup').RollupOptions
 */
const runtime = {
  input: "src/runtime/index.ts",
  output: {
    dir: "lib/runtime",
    format: "es",
  },
  external: ["@webwriter-options"],
  plugins: [
    typescript({
      outDir: "lib/runtime/types",
      include: ["src/runtime/**/*.ts"],
    })
  ],
};

export default [plugin, runtime];
