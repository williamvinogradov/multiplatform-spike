import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";


function getEs6Config(componentName, section, outputDir) {
    return {
        input: `src/${section}/${componentName}/index.ts`,
        output: [
            {
                dir: `${outputDir}`,
                entryFileNames: '[name].mjs',
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
                    outDir: `${outputDir}`,
                    declaration: true,
                }
            }),
        ]
    }
}

function getCjsConfig(componentName, section, outputDir) {
    return {
        input: `src/${section}/${componentName}/index.ts`,
        output: [
            {
                dir: `${outputDir}/cjs`,
                entryFileNames: '[name].cjs',
                format: 'cjs',
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
                    outDir: `${outputDir}/cjs`,
                    declaration: false,
                }
            }),
        ]
    }
}

function getRootConfig(outputDir) {
    return {
        input: './src/index.ts',
        output: {
            dir: outputDir,
        },
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    outDir: outputDir,
                    declaration: true,
                }
            }),
            copy({
                targets: [
                    {src: './rollup/package.build.json', dest: outputDir, rename: 'package.json'}
                ]
            })
        ]
    };
}

function getRollupConfig(components, outputDir) {
    return [
        ...components.map((componentName) => getEs6Config(componentName, 'components', outputDir)),
        ...components.map((componentName) => getCjsConfig(componentName, 'components', outputDir)),
        ...components.map((componentName) => getEs6Config(componentName, 'types', outputDir)),
        ...components.map((componentName) => getCjsConfig(componentName, 'types', outputDir)),
        getRootConfig(outputDir),
    ];
}

export {
    getEs6Config,
    getCjsConfig,
    getRootConfig,
    getRollupConfig,
}
