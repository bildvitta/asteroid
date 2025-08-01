const sourcePath = '~@bildvitta/quasar-app-extension-asteroid/src/'
const resolve = (...paths) => paths.map(path => sourcePath + path)

function extendQuasar (quasar, asteroidConfigFile) {
  // Arquivos de boot
  // https://quasar.dev/quasar-cli-vite/boot-files#introduction
  quasar.boot.push(...resolve(
    'boot/api.js',
    'boot/debug.js',
    'boot/error-pages.js',
    'boot/font-face.js',
    'boot/register.js',
    'boot/loading.js',
    'boot/query-cache.js',
    'boot/store-adapter',
    'boot/before-each.js'
  ))

  // controle dos componentes que utilizam bibliotecas terceiras.
  const thirdPartyComponentsList = {
    QasMap: 'boot/map.js',
    QasChartView: 'boot/chart-view.js'
  }

  for (const key in thirdPartyComponentsList) {
    if (asteroidConfigFile.framework.thirdPartyComponents.includes(key)) {
      quasar.boot.push(...resolve(
        thirdPartyComponentsList[key]
      ))
    }
  }

  // controle das notificações
  if (asteroidConfigFile.framework.featureToggle.useNotifications) {
    quasar.boot.push(...resolve('boot/notifications'))
  }

  // Transpilação de arquivos!
  quasar.build.transpileDependencies.push(/quasar-app-extension-asteroid[\\/]src/)

  // Preserva whitespaces!
  // https://github.com/vuejs/core/pull/1600
  quasar.build.vueLoaderOptions.whitespace = 'preserve'

  // Adiciona todas classes do asteroid
  quasar.css.push(...resolve('index.scss'))

  // Adiciona todos os Plugins obrigatório do Quasar
  const plugins = [
    'Dialog',
    'Loading',
    'Notify'
  ]

  plugins.forEach(plugin => quasar.framework.plugins.push(plugin))

  // Adiciona todas as classes de animação do Animate.css ao quasar
  // https://animate.style/
  const animations = [
    'slideInDown',
    'rubberBand'
  ]

  animations.forEach(animation => quasar.animations.push(animation))

  // Configurações
  quasar.extras.push(
    'material-symbols-rounded'
  )

  quasar.framework.iconSet = 'material-symbols-rounded'
  quasar.framework.lang = 'pt-BR'
}

module.exports = async function (api) {
  const asteroidConfigHandler = require('./helpers/asteroid-config-handler')
  const { validate, getAsteroidConfigPath } = asteroidConfigHandler(api)
  const asteroidConfigPath = getAsteroidConfigPath()
  const asteroidConfigFile = require(asteroidConfigPath)

  const setThirdPartyComponents = require('./helpers/set-third-party-components')

  await setThirdPartyComponents(api, { filePath: asteroidConfigPath }).exec()

  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  api.extendQuasarConf(quasar => extendQuasar(quasar, asteroidConfigFile))

  api.extendWebpack(webpack => {
    // Adiciona um "alias" chamado "asteroid" para a aplicação
    const asteroid = 'node_modules/@bildvitta/quasar-ui-asteroid/src/asteroid.js'
    const asteroidConfig = 'node_modules/@bildvitta/quasar-app-extension-asteroid/src/defaults/default-asteroid-config.js'

    validate()

    webpack.resolve.alias = {
      ...webpack.resolve.alias,

      'asteroid-config': api.resolve.app(asteroidConfig),
      'asteroid-config-app': asteroidConfigPath,
      asteroid: api.resolve.app(asteroid)
    }
  })
}
