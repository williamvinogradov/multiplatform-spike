import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete'

const OUTPUT_DIR = '../../dist/core';
const COMPONENTS = [
    'slideToggle',
    'simpleButton',
    'simpleGrid',
    'pager'
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
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    outDir: outputDir,
                    declaration: false,
                }
            })
        ]
    }
}

function getTypeConfigForComponent(componentName, outputDir) {
    return {
        input: `src/types/${componentName}/index.ts`,
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
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    outDir: outputDir,
                    declaration: false,
                }
            })
        ]
    }
}


const CONFIG = [
    {
        input: './src/index.ts',
        output: {
            dir: OUTPUT_DIR,
        },
        plugins: [
            del({ targets: [OUTPUT_DIR], force: true}),
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    outDir: OUTPUT_DIR,
                    rootDir: './src',
                    declaration: true,
                    emitDeclarationOnly: true,
                }
            }),
            copy({
                targets: [
                    {src: './package.dist.json', dest: OUTPUT_DIR, rename: 'package.json'}
                ]
            })
        ]
    },
    ...COMPONENTS.map((componentName) => getBaseConfigForComponent(componentName, OUTPUT_DIR)),
    ...COMPONENTS.map((componentName) => getTypeConfigForComponent(componentName, OUTPUT_DIR))
];

export default CONFIG;

