import * as path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import del from "rollup-plugin-delete";

const OUTPUT_DIR = '../../dist/react';
const COMPONENTS = [
    'slideToggle',
    'simpleButton',
    'simpleGrid',
    'pager',
];

function getConfigForComponentCjs(componentName, outputDir) {
    const inputPath = `src/components/${componentName}/index.ts`;

    return {
        input: inputPath,
        output: {
            dir: outputDir,
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: 'src',
        },
        plugins: [
            peerDepsExternal(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    outDir: outputDir,
                    declaration: true,
                }
            }),
            postcss({
                extract: path.resolve(__dirname, `${outputDir}/${componentName}.css`),
            }),
            copy({
                targets: [{
                    src: `src/components/${componentName}/package.json`,
                    dest: `${outputDir}/components/${componentName}`
                }]
            })
        ],
    }
}

function getConfigForComponentEs6(componentName, outputDir) {
    const inputPath = `src/components/${componentName}/index.ts`;
    const esmOutputDir = `${outputDir}/esm`

    return {
        input: inputPath,
        output: {
            dir: esmOutputDir,
            format: 'esm',
            sourcemap: true,
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: 'src',
        },
        plugins: [
            peerDepsExternal(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    outDir: esmOutputDir,
                    declaration: false,
                }
            }),
            postcss({
                inject: false,
                extract: false,
            }),
        ],
    };
}

const CONFIG = [
    {
        input: './src/index.ts',
        output: {
            dir: OUTPUT_DIR,
            format: 'esm',
            preserveModules: true,
            preserveModulesRoot: 'src',
        },
        plugins: [
            del({ targets: [OUTPUT_DIR], force: true}),
            copy({
                targets: [
                    {src: './package.dist.json', dest: OUTPUT_DIR, rename: 'package.json'}
                ]
            })
        ]
    },
    ...COMPONENTS.map((componentName) => getConfigForComponentCjs(componentName, OUTPUT_DIR)),
    ...COMPONENTS.map((componentName) => getConfigForComponentEs6(componentName, OUTPUT_DIR))
];

export default CONFIG;
