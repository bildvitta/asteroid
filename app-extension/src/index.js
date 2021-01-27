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

  // make sure the stylesheet goes through webpack to avoid SSR issues
  // quasar.css.push('~quasar-ui-asteroid/src/index.sass')

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

  api.compatibleWith('humps', '^2.0.1')

  api.extendQuasarConf(extendQuasar)
}
