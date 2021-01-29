/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const sourcePath = '~@bildvitta/quasar-app-extension-asteroid/src/'
const resolve = (...paths) => paths.map(path => sourcePath + path)

function extendQuasar (quasar) {
  // Boot
  quasar.boot.push(
    ...resolve(
      'boot/environment.js',
      'boot/api.js',
      'boot/force-https.js',
      'boot/history.js',
      'boot/register.js',
      'boot/router.js',
      'boot/store.js'
    )
  )

  // Transpile!
  quasar.build.transpileDependencies.push(/quasar-app-extension-asteroid[\\/]src/)

  quasar.css.push(...resolve('index.scss'))

  const plugins = [
    'Notify',
    'Dialog',
    'Loading'
  ]

  // Add all required quasar plugins
  plugins.forEach(plugin => quasar.framework.plugins.push(plugin))

  // Settings
  quasar.extras.push(
    'material-icons-outlined'
  )

  quasar.framework.iconSet = 'material-icons-outlined'
  quasar.framework.lang = 'pt-br'
}

module.exports = function (api) {
  api.compatibleWith('quasar', '^1.1.1')
  api.compatibleWith('@quasar/app', '^1.1.0 || ^2.0.0')

  api.extendQuasarConf(extendQuasar)

  api.extendWebpack(webpack => {
    const helpers = 'node_modules/@bildvitta/quasar-ui-asteroid/src/helpers/index.js'

    webpack.resolve.alias = {
      ...webpack.resolve.alias,

      asteroid: api.resolve.app(helpers),
      extensions: api.resolve.app('quasar.extensions.json')
    }
  })
}
