import rimraf from 'rimraf'

import localResolve from 'rollup-plugin-local-resolve'
import replace from '@rollup/plugin-replace'
import scss from 'rollup-plugin-scss'
import { terser } from 'rollup-plugin-terser'
import url from '@rollup/plugin-url'
import vue from 'rollup-plugin-vue'

import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

// Clean build artifacts
rimraf.sync('dist/!(api|vetur)')

// Setup
import { name, author, version } from './package.json'
const year = (new Date()).getFullYear()

const banner = `/*!
* ${name} v${version}
* (c) ${year} ${author}
* Released under the MIT License.
*/`

const replaceOptions = {
  preventAssignment: false,

  values: {
    __UI_VERSION__: `'${version}'`
  }
}

const scssOptions = {
  outputStyle: 'compressed',
  prefix: '@import \'./src/index.scss\';',
  processor: () => postcss([autoprefixer()])
}

const urlOptions = {
  destDir: 'dist/assets/',
  limit: 0
}

const vueOptions = {
  css: false,

  template: {
    isProduction: true
  }
}

function addEntry (format = 'esm', options = {}) {
  if (format === 'cjs') {
    if (!vueOptions.template) {
      vueOptions.template = {}
    }

    vueOptions.template.optimizeSSR = true
  }

  const entry = {
    input: `src/index.${format}.js`,

    output: [
      {
        banner,
        file: `dist/asteroid.${format}.js`,
        format
      },
      {
        banner,
        file: `dist/asteroid.${format}.min.js`,
        format,
        plugins: [terser()]
      }
    ],

    plugins: [
      localResolve(),
      replace(replaceOptions),
      scss(scssOptions),
      url(urlOptions),
      vue(vueOptions)
    ],

    ...options
  }

  if (format === 'umd') {
    for (const index in entry.output) {
      entry.output[index].name = '{{ umdExportName }}'

      entry.output[index].globals = {
        autonumeric: 'AutoNumeric',
        'date-fns': 'dateFns',
        'date-fns/locale': 'dateFnsLocale',
        'fuse.js': 'Fuse',
        'lodash-es': '_',
        quasar: 'Quasar',
        signature_pad: 'SignaturePad',
        sortablejs: 'Sortable',
        vue: 'Vue'
      }
    }
  }

  return entry
}

export default [
  addEntry('esm'),
  addEntry('cjs'), // Server-side rendering
  addEntry('umd') // Browser
]
