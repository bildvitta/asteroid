const sourcePath = '~@bildvitta/quasar-app-extension-asteroid/src/'
const resolve = (...paths) => paths.map(path => sourcePath + path)

function extendQuasar (quasar) {
  // Arquivos de boot
  // https://quasar.dev/quasar-cli-vite/boot-files#introduction
  quasar.boot.push(...resolve(
    'boot/api.js',
    'boot/error-pages.js',
    'boot/register.js',
    'boot/history.js',
    'boot/loading.js',
    'boot/store-adapter'
  ))

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
    'slideInDown'
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

  const setThirdPartyComponents = require('./helpers/set-third-party-components')

  console.log('CHAMADO AQUI, ANTES')
  await setThirdPartyComponents(api, { filePath: asteroidConfigPath }).exec()
  console.log('CHAMADO AQUI, DEPOIS')

  // const map = require('./third-party-components/map')
  // const qasMapThirdPartyComponent = await thirdPartyComponentsHandler(api, {
  //   componentName: 'QasMap',
  //   filePath: asteroidConfigPath,

  //   ...map
  // })

  // qasMapThirdPartyComponent.exec()

  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  api.extendQuasarConf(extendQuasar)

  api.extendWebpack(async webpack => {
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
