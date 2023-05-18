const sourcePath = '~@bildvitta/quasar-app-extension-asteroid/src/'
const resolve = (...paths) => paths.map(path => sourcePath + path)

function extendQuasar (quasar, api) {
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

  if (api.hasWebpack) {
    // Transpilação de arquivos!
    quasar.build.transpileDependencies.push(/quasar-app-extension-asteroid[\\/]src/)

    // Preserva whitespaces!
    // https://github.com/vuejs/core/pull/1600
    quasar.build.vueLoaderOptions.whitespace = 'preserve'
  }
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

module.exports = function (api) {
  const asteroid = 'node_modules/@bildvitta/quasar-ui-asteroid/src/asteroid.js'

  if (api.hasWebpack) {
    api.compatibleWith('@quasar/app', '^3.0.0')

    api.extendWebpack(webpack => {
      // Adiciona um "alias" chamado "asteroid" para a aplicação

      webpack.resolve.alias = {
        ...webpack.resolve.alias,

        asteroid: api.resolve.app(asteroid)
      }
    })
  } else {
    api.compatibleWith('@quasar/app-vite', '^1.3.0')

    api.extendViteConf((viteConf, { isClient, isServer }, api) => {
      Object.assign(viteConf.optimizeDeps, {
        include: ['fast-deep-equal'],
        exclude: ['@fawmi/vue-google-maps']
      })

      Object.assign(viteConf.resolve.alias, {
        asteroid: api.resolve.app(asteroid)
      })
    })
  }

  api.compatibleWith('quasar', '^2.0.0')

  api.extendQuasarConf(extendQuasar)
}
