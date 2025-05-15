import ComponentsVite from 'unplugin-vue-components/vite'
import ComponentsWebpack from 'unplugin-vue-components/webpack'

import asteroidConfigHandler from './helpers/asteroid-config-handler.js'

const sourcePath = '~@bildvitta/quasar-app-extension-asteroid/src/'
const resolve = (...paths) => paths.map(path => sourcePath + path)

function extendQuasar (quasar, api, asteroidConfigFile) {
  // Arquivos de boot
  // https://quasar.dev/quasar-cli-vite/boot-files#introduction
  quasar.boot.push(...resolve(
    'boot/api.js',
    'boot/debug.js',
    'boot/error-pages.js',
    'boot/font-face.js',
    'boot/register.js',
    'boot/history.js',
    'boot/loading.js',
    'boot/query-cache.js',
    'boot/store-adapter.js'
  ))

  // controle das notificações
  if (asteroidConfigFile.framework.featureToggle.useNotifications) {
    quasar.boot.push(...resolve('boot/notifications'))
  }

  // Transpilação de arquivos!
  if (api.hasWebpack) {
    const transpileTarget = (
      quasar.build.webpackTranspileDependencies || // q/app-webpack >= v4
      quasar.build.transpileDependencies // q/app-webpack v3
    )

    transpileTarget.push(
      /quasar-app-extension-asteroid[\\/]src/,
      /@bildvitta[\\/]quasar-ui-asteroid[\\/]src/
    )
  }

  // Preserva whitespaces!
  // https://github.com/vuejs/core/pull/1600
  // quasar.build.vueLoaderOptions.whitespace = 'preserve'

  // Adiciona todas classes do asteroid
  // quasar.css.push(...resolve('index.scss'))

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

export default async function (api) {
  api.compatibleWith('quasar', '^2.0.0')

  const asteroid = 'node_modules/@bildvitta/quasar-ui-asteroid/src/asteroid.js'
  const asteroidConfig = 'node_modules/@bildvitta/quasar-app-extension-asteroid/src/defaults/default-asteroid-config.js'
  const vueRouter = 'node_modules/vue-router/dist/vue-router.esm-bundler.js'

  const { validate, getAsteroidConfigPath } = asteroidConfigHandler(api)

  validate()

  const asteroidConfigPath = getAsteroidConfigPath()
  const { default: asteroidConfigFile } = await import(asteroidConfigPath)

  if (api.hasVite) {
    api.compatibleWith('@quasar/app-vite', '^2.0.0')

    api.extendViteConf(viteConf => {
      Object.assign(viteConf.resolve.alias, {
        'asteroid-config': api.resolve.app(asteroidConfig),
        'asteroid-config-app': asteroidConfigPath,
        asteroid: api.resolve.app(asteroid),
        'vue-router': api.resolve.app(vueRouter)
      })

      // optimizeDeps
      viteConf.optimizeDeps = viteConf.optimizeDeps || {}
      viteConf.optimizeDeps.include = viteConf.optimizeDeps.include || []
      viteConf.optimizeDeps.include.push(...[
        '@fawmi/vue-google-maps',
        'fast-deep-equal'
      ])

      viteConf.plugins = viteConf.plugins || []
      viteConf.plugins.push(
        ComponentsVite({
          dirs: ['node_modules/@bildvitta/quasar-ui-asteroid/src/components'], // ajusta o path para a lib
          extensions: ['vue'],
          deep: true,
          dts: false // desativa geração de types se não quiser
        })
      )
    })

    api.extendQuasarConf(quasar => extendQuasar(quasar, api, asteroidConfigFile))

    return
  }

  api.compatibleWith('@quasar/app', '^3.10.0 || ^4.0.0')

  api.extendWebpack(webpack => {
    // Adiciona um "alias" chamado "asteroid" para a aplicação

    webpack.resolve.alias = {
      ...webpack.resolve.alias,

      'asteroid-config': api.resolve.app(asteroidConfig),
      'asteroid-config-app': asteroidConfigPath,
      asteroid: api.resolve.app(asteroid),
      'vue-router': api.resolve.app(vueRouter)
    }

    // Adiciona o plugin de componentes
    webpack.plugins = webpack.plugins || []

    webpack.plugins.push(
      ComponentsWebpack({
        dirs: ['node_modules/@bildvitta/quasar-ui-asteroid/src/components'], // ajusta o path para a lib
        extensions: ['vue'],
        deep: true,
        dts: false // desativa geração de types se não quiser
      })
    )
  })

  api.extendQuasarConf(quasar => extendQuasar(quasar, api, asteroidConfigFile))
}
