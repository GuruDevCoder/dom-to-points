import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import commonJS from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      name: pkg.main,
      file: pkg.main,
      format: 'umd',
      exports: 'named',
      sourcemap: false
    }
  ],
  plugins: [
    resolve(),
    commonJS({
      include: '**'
    }),
    babel({
      presets: [],
      exclude: 'node_modules/**',
      plugins: ['@babel/external-helpers']
    }),
    uglify()
  ]
}
