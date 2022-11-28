import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

function getJsConfig(outputDir) {
  return {
    input: 'src/index.ts',
    output: {
      dir: outputDir,
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src/components',
    },
    plugins: [
      nodeResolve(),
      peerDepsExternal(),
      esbuild(),
      postcss({
        extract: 'index.css',
      }),
    ],
  };
}

function getDtsConfig(outputDir) {
  return {
    input: 'src/index.ts',
    output: {
      dir: outputDir,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src/components',
    },
    plugins: [
      postcss({ inject: false, extract: false }),
      dts(),
      copy({
        targets: [
          { src: './rollup/package.build.json', dest: outputDir, rename: 'package.json' },
        ],
      }),
    ],
  };
}

export function getRollupConfig(components, outputPath) {
  return [
    getJsConfig(outputPath),
    getDtsConfig(outputPath),
  ];
}
