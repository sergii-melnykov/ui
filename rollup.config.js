import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import strip from "rollup-plugin-strip";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json"; // Import JSON plugin
import packages from "./package.json" assert { type: "json" };

const external = [
  "react",
  "react-dom",
  ...Object.keys(packages.devDependencies),
];

export default [
  // JS Bundles
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.es.js",
        format: "es",
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      resolve(),
      commonjs(),
      json(),
      strip({
        directives: ["use client"],
      }),
      postcss({
        plugins: [],
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist", // Specify outDir for TypeScript plugin
        declaration: false, // Disable declaration generation in Rollup plugin
      }),
    ],
  },
  // TypeScript Declaration Bundles
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
    external,
  },
];
