import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

function getJsConfig(outputDir) {
  return {
    input: `src/index.ts`,
    output: [
      {
        dir: outputDir,
        entryFileNames: '[name].mjs',
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [
      nodeResolve(),
      peerDepsExternal(),
      esbuild(),
    ],
  };
}

function getDtsConfig(outputDir) {
  return {
    input: `src/index.ts`,
    output: [
      {
        dir: outputDir,
        exports: 'named',
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [
      dts(),
      copy({
        targets: [
          { src: './rollup/package.build.json', dest: outputDir, rename: 'package.json' },
        ],
      }),
    ],
  };
}

export function getRollupConfig(outputDir) {
  return [
    getJsConfig(outputDir),
    getDtsConfig(outputDir),
  ];
}

