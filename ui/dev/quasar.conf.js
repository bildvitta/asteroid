/* eslint-env node */

const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = function (/* quasar */) {
  return {
    // https://v1.quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://v1.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // https://v1.quasar.dev/quasar-cli/boot-files
    boot: [
      'register',
      'error-pages',
      'store',
      'axios',
      'i18n',
      'vue-google-maps'
    ],

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'material-icons-outlined'
    ],

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history',

      // https://v1.quasar.dev/quasar-cli/handling-process-env
      env: {
        SERVER_BASE_URL: process.env.SERVER_BASE_URL
      },

      // https://v1.quasar.dev/quasar-cli/handling-webpack
      chainWebpack (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])

        chain.resolve.alias
          .set('ui', path.resolve(__dirname, '../src'))

          .set('helpers', path.resolve(__dirname, './src/helpers'))
          .set('mixins', path.resolve(__dirname, './src/mixins'))
      }
    },

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true
    },

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      lang: 'pt-br',
      iconSet: 'material-icons-outlined',

      config: {},

      importStrategy: 'auto',

      components: [
        'QPage'
      ],

      directives: [],

      plugins: [
        'Dialog',
        'Loading',
        'Notify'
      ]
    },

    // https://v1.quasar.dev/options/animations
    animations: [],

    // https://v1.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://v1.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {},

      manifest: {
        name: 'Asteroid App',
        short_name: 'Asteroid App',
        description: 'An Asteroid app',

        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#027be3',

        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // https://v1.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {},

    // https://v1.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {},

    // https://v1.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager',

      // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
      packager: {},

      builder: {
        // https://www.electron.build/configuration/configuration
        appId: 'dev'
      },

      // https://v1.quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (/* webpack */) {}
    }
  }
}
