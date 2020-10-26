import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import serve from 'rollup-plugin-serve'
import styles from 'rollup-plugin-styles'

const pkg = require('./package.json')

// dev build if watching, prod build if not
const isProduction = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'tingle'
    },
    {
      file: pkg.cdn,
      format: 'umd',
      name: 'tingle'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    serve({
      open: true,
      contentBase: 'doc'
    }),
    styles({
      // ... or with relative to output dir/output file's basedir (but not outside of it)
      mode: ['extract', 'tingle.css']
    }),
    babel({ exclude: 'node_modules/**' }),
    isProduction && terser({ include: [/^.+\.min\.js$/] }),
    isProduction && filesize()
  ]
}
