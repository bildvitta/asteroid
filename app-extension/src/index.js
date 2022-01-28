const sourcePath = '~@bildvitta/quasar-app-extension-asteroid/src/'
const resolve = (...paths) => paths.map(path => sourcePath + path)

function extendQuasar (quasar) {
  // Boot
  quasar.boot.push(...resolve(
    'boot/register.js'
  ))

  // Transpile!
  quasar.build.transpileDependencies.push(/quasar-app-extension-asteroid[\\/]src/)

  // Preserve whitespaces!
  // https://github.com/vuejs/core/pull/1600
  quasar.build.vueLoaderOptions.whitespace = 'preserve'

  quasar.css.push(...resolve('index.scss'))

  const plugins = [
    'Dialog',
    'Loading',
    'Notify'
  ]

  // Add all required Quasar plugins
  plugins.forEach(plugin => quasar.framework.plugins.push(plugin))

  // Settings
  quasar.extras.push(
    'material-icons-outlined'
  )

  quasar.framework.iconSet = 'material-icons-outlined'
  quasar.framework.lang = 'pt-BR'
}

module.exports = function (api) {
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  api.extendQuasarConf(extendQuasar)

  api.extendWebpack(webpack => {
    const asteroid = 'node_modules/@bildvitta/quasar-ui-asteroid/src/asteroid.js'

    webpack.resolve.alias = {
      ...webpack.resolve.alias,

      asteroid: api.resolve.app(asteroid)
    }
  })
}
