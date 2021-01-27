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

  quasar.css.push(...resolve('index.scss'))
    // TODO preciso lanaçar versão para testar...
    // Styles
    // quasar.css.push(...resolve(
    //   'css/container.scss',
    //   'css/line-height.scss',
    //   'css/opacity.scss',
    //   'css/steroids.scss',
    //   'css/text.scss'
    // ))

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

  // TODO aparentemente não precisa
  // api.compatibleWith('axios', '^0.21.1')
  // api.compatibleWith('date-fns', '^2.16.1')
  // api.compatibleWith('fuse.js', '^6.4.3')
  // api.compatibleWith('humps', '^2.0.1')
  // api.compatibleWith('lodash', '^4.17.20')
  // api.compatibleWith('sortablejs', '^1.12.0')

  api.extendQuasarConf(extendQuasar)
}
