module.exports = async function (api, config = {}) {
  const {
    componentName,
    dependencies = {},
    devDependencies = {},
    filePath
  } = config

  const { default: ora } = await import('ora')
  const { execaSync } = await import('execa')

  const asteroidConfig = require(filePath)

  function getPackage () {
    const packageJson = require(api.resolve.app('package.json'))

    return packageJson
  }

  function hasPackage (dependency) {
    const packageJson = getPackage()
    const { dependencies, devDependencies } = packageJson

    return dependencies[dependency] || devDependencies[dependency]
  }

  function getCommand ({ isDev = false, dependency, version }) {
    const command = ['install', `${dependency}@${version}`]

    if (isDev) command.push('--save-dev')

    return command
  }

  async function install ({ isDev, dependency, version }) {
    const installSpinner = ora(`instalando dependência "${dependency}" na versão "${version}".`).start()

    try {
      const command = getCommand({ isDev, dependency, version })

      await execaSync('npm', [...command], { cwd: api.appDir })

      installSpinner.succeed(`Dependência "${dependency}" instalada com sucesso.`).succeed()
    } catch {
      ora(`Erro ao instalar dependência "${dependency}" na versão "${version}".`).fail()
    }
  }

  function uninstall ({ dependency }) {
    const uninstallSpinner = ora(`desinstalando dependência "${dependency}".`).start()

    try {
      execaSync('npm', ['uninstall', dependency], { cwd: api.appDir })

      uninstallSpinner.succeed(`Dependência "${dependency}" desinstalada com sucesso.`).succeed()

      ora('Não deveria desinstalar essa dependência? Veja mais sobre a opção "autoRemoveThirdDependencies"').info()
    } catch {
      ora(`Erro ao desinstalar dependência "${dependency}".`).fail()
    }
  }

  function loop ({ dependenciesObject, callbackFn = () => {} }) {
    for (const key in dependenciesObject) {
      callbackFn({ key, value: dependenciesObject[key] })
    }
  }

  function exec () {
    const {
      framework: { autoRemoveThirdDependencies, thirdPartyComponents }
    } = asteroidConfig

    const hasThirdPartyComponent = thirdPartyComponents.includes(componentName)

    if (hasThirdPartyComponent) {
      const onInstall = ({ key, value, isDev }) => {
        if (hasPackage(key)) return

        install({ dependency: key, version: value, isDev })
      }

      loop({
        dependenciesObject: dependencies,
        callbackFn: ({ key, value }) => onInstall({ key, value, isDev: false })
      })

      loop({
        dependenciesObject: devDependencies,
        callbackFn: ({ key, value }) => onInstall({ key, value, isDev: true })
      })

      return
    }

    if (autoRemoveThirdDependencies) {
      loop({
        dependenciesObject: {
          ...dependencies,
          ...devDependencies
        },

        callbackFn: ({ key }) => {
          if (!hasPackage(key)) return

          uninstall({ dependency: key })
        }
      })
    }
  }

  return {
    exec
  }
}
