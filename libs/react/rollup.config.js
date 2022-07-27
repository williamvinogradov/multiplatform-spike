import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import copy from 'rollup-plugin-copy';

const OUTPUT_DIR = '../../playgrounds/react/dist-dep/dx-react/'

export default {
    input: "./src/public_api.ts",
    output: [
        // {
        //     file: `../../dist/dx-react/cjs/${packageJson.main}`,
        //     format: "cjs",
        //     sourcemap: true
        // },
        {
            dir: OUTPUT_DIR,
            format: "esm",
            sourcemap: true,
            exports: "named",
            preserveModules: true,
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ compilerOptions: { outDir: OUTPUT_DIR }}),
        postcss({
            extract: true,
        }),
        copy({
            targets: [
                {src: './package-dist.json', dest: OUTPUT_DIR, rename: 'package.json'}
            ]
        })
    ]
};