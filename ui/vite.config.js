import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import circleDependency from "vite-plugin-circular-dependency";
import Components from 'unplugin-vue-components/vite'
import {
  QuasarResolver
} from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // {
    //   name: 'singleHMR',
    //   handleHotUpdate ({ modules, file }) {
    //     if (file.match(/xml$/)) return []
    //     modules.map(m => {
    //       m.importedModules = new Set()
    //       m.importers = new Set()
    //     })

    //     return modules
    //   }
    // },
    // circleDependency(),
    Components({
      resolvers: [
        QuasarResolver({
          importStyle: false,
          sassVariables: false
        }),
        // criar resolver para os components no /src/components
        name => {
          if (name.startsWith('Qas')) {
            return { name, from: path.resolve(__dirname, 'src/asteroid.js') }
          }
        }
      ],
      extensions: ['js', 'vue'],
      dts: true,
      directoryAsNamespace: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.js$/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
      isProduction: process.env.NODE_ENV === 'production'
    })
  ],

  resolve: {
    alias: {
      'asteroid-config': path.resolve(__dirname, '../app-extension/src/defaults/default-asteroid-config.js'),
      'asteroid-config-app': path.resolve(__dirname, '../app-extension/src/defaults/default-asteroid-config.js'),
      quasar: path.resolve(__dirname, 'node_modules/quasar')
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "quasar/src/css/variables.sass";
          @import "${path.resolve(__dirname, 'src/index.scss')}";
        `
      }
    }
  },

  // Configuração de optimizeDeps
  optimizeDeps: {
    include: [
      '@fawmi/vue-google-maps',
      'fast-deep-equal',
      'humps',
      'debug',
      'pica',
      'hammerjs',
      'asteroid-config',
      'asteroid-config-app'
    ],
    exclude: [] // Dependências a serem excluídas da pré-agrupação
  },

  build: {
    lib: {
      entry: 'src/asteroid.js',
      name: 'asteroid',
      fileName: format => `asteroid-build.${format}.js`,
      formats: ['es', 'cjs'],
      cssFileName: 'asteroid-build'
    },
    rollupOptions: {
      output: {
        // Desabilita o hash nos nomes dos arquivos
        entryFileNames: 'asteroid-build.[format].js',
        chunkFileNames: 'chunks/[name].[format].js',
        assetFileNames: 'assets/[name].[ext]',
        // Garante que os módulos ES mantenham o formato adequado
        preserveModules: false,
        esModule: true
      },
      external: [
        'vue',
        'quasar',
        'vue-router',
        'date-fns',
        'lodash',
        'axios',
        'humps',
        'lodash-es'
      ]
    }
  }
})
