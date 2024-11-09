import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import strip from "rollup-plugin-strip";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import packages from "./package.json" assert { type: "json" };

const external = [
  "react",
  "react-dom",
  ...Object.keys(packages.peerDependencies),
];

// Define the entry points
const entries = [
  "src/index.ts",
  "src/example/index.ts",
  "src/hook-forms/index.ts",
];

// Generate output and configurations for each entry
const createConfig = (entry) => ({
  input: entry,
  output: [
    {
      file: `dist/${entry.replace("src/", "").replace(".ts", "")}/index.cjs.js`,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: `dist/${entry.replace("src/", "").replace(".ts", "")}/index.es.js`,
      format: "es",
      sourcemap: true,
    },
  ],
  external,
  plugins: [
    resolve(),
    commonjs(),
    json(),
    babel({
      extensions: [".jsx", ".js", ".tsx", "ts"],
      exclude: "node_modules/**",
      presets: [["@babel/preset-react", { runtime: "automatic" }]],
      babelHelpers: "bundled",
    }),
    strip({
      directives: ["use client"],
    }),
    postcss(),
    typescript({
      tsconfig: "./tsconfig.json",
      outDir: `dist/${entry.replace("src/", "").replace(".ts", "")}`,
      declaration: true,
      declarationDir: `dist/${entry.replace("src/", "").replace(".ts", "")}`,
    }),
  ],
});

export default entries.map(createConfig);
