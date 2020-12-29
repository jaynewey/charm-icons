import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

const OUTPUT_DIR = 'dist';

export default {
  input: 'build/charm.js',
  output: [
    {
      name: 'charm',
      file: path.join(OUTPUT_DIR, 'umd', 'charm.js'),
      format: 'umd',
    },
    {
      name: 'charm',
      file: path.join(OUTPUT_DIR, 'umd', 'charm.min.js'),
      format: 'umd',
      plugins: [terser()],
    },
    {
      name: 'charm',
      file: path.join(OUTPUT_DIR, 'cjs', 'charm.js'),
      format: 'cjs',
    },
  ],
  plugins: [babel({ babelHelpers: 'bundled' }), json()],
};
