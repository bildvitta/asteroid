// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

const path = require('path')
const webpack = require('webpack')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'register.js'
    ],

    css: [
      'app.scss'
    ],

    extras: [
      'material-icons-outlined'
    ],

    framework: {
      lang: 'pt-BR',
      iconSet: 'material-icons-outlined',

      config: {},

      components: [
        'QPage',
        'QBtn'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog'
      ]
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history',

      env: {
        BUCKET: 'uploader.nave.dev',
        MAPS_API_KEY: 'AIzaSyDl00zRKG51WWBIJa8yVXqX7jFD5xyqe24'
      },

      chainWebpack (chain) {
        chain.resolve.alias.merge({
          ui: path.resolve(__dirname, '../src/index.esm.js')
        })
      }
    },

    devServer: {
      // port: 8080,
      open: true // opens browser window automatically
    },

    ssr: {
      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    }
  }
}
