import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import del from "rollup-plugin-delete";

const OUTPUT_DIR = '../../dist/react';
const COMPONENTS = [
    'slideToggle',
];

function getBaseConfigForComponent(componentName, outputDir) {
    return {
        input: `src/components/${componentName}/index.ts`,
        output: [
            {
                dir: outputDir,
                format: 'esm',
                sourcemap: true,
                exports: 'named',
                preserveModules: true,
                preserveModulesRoot: 'src',
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss({
                extract: true,
            }),
            copy({
                targets: [{
                    src: `src/components/${componentName}/package.json`,
                    dest: `${outputDir}/components/${componentName}`
                }]
            })
        ]
    }
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
    ...COMPONENTS.map((componentName) => getBaseConfigForComponent(componentName, OUTPUT_DIR))
];

export default CONFIG;