import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

const OUTPUT_DIR = '../../dist/core';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: OUTPUT_DIR,
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  plugins: [
    peerDepsExternal(),
    typescript({
      tsconfig: './tsconfig.json',
      compilerOptions: {
        outDir: OUTPUT_DIR,
        declaration: true,
      },
    }),
    copy({
      targets: [
        { src: './rollup/package.build.json', dest: OUTPUT_DIR, rename: 'package.json' },
      ],
    }),
  ],
};
