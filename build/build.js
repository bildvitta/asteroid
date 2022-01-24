// https://github.com/Marak/colors.js
require('colors')

// https://github.com/enquirer/enquirer
const { prompt } = require('enquirer')

// https://github.com/szwacz/fs-jetpack
const jetpack = require('fs-jetpack')

// https://nodejs.org/api/path.html
const path = require('path')

// https://github.com/npm/node-semver
const semver = require('semver')

// Options
const packages = {
  global: {
    path: './',
    resolved: path.resolve('./')
  },

  'app-extension': {
    path: 'app-extension/',
    resolved: path.resolve('app-extension/')
  },

  docs: {
    path: 'docs/',
    resolved: path.resolve('docs/')
  },

  ui: {
    path: 'ui/',
    resolved: path.resolve('ui/')
  }
}

const packageCore = {
  author: 'Bild & Vitta <systemteam@bild.com.br>',
  license: 'MIT'
}

// Methods
function logError (error) {
  return console.error(error.red)
}

// Main
async function main () {
  // https://github.com/sindresorhus/execa
  const { execaSync } = await import('execa')

  // https://github.com/sindresorhus/ora
  const { default: ora } = await import('ora')

  // Start!
  console.clear()

  console.log(
    '\n  ========================'.bold.dim.yellow +
    '\n  === ASTEROID BUILDER ==='.bold.yellow +
    '\n  ========================'.bold.dim.yellow +
    '\n'
  )

  const currentVersion = require('../package.json').version

  const responses = await prompt({
    name: 'nextVersion',
    type: 'input',
    message: 'Qual será o número da próxima versão?',
    initial: currentVersion,

    validate (value) {
      value = semver.clean(value)

      if (!value || semver.lt(value, currentVersion)) {
        return logError('\n✘ Informe uma versão válida e superior a atual.')
      }

      return true
    }
  })

  const nextVersion = semver.clean(responses.nextVersion)

  for (const packageName in packages) {
    const packageData = packages[packageName]

    // Update package.json
    const packagePath = `${packageData.path}package.json`
    const resolvedPackagePath = path.resolve(packagePath)

    const packageSpinner = ora(`Alterando versão em "${packagePath}"...`).start()
    const currentPackage = jetpack.read(resolvedPackagePath, 'json')

    jetpack.write(resolvedPackagePath, {
      ...currentPackage,
      ...packageCore,

      version: nextVersion
    })

    packageSpinner.succeed(`Versão alterada em "${packagePath}".`)

    // Install dependencies
    const installSpinner = ora(`Instalando dependências em "${packageName}"...`).start()
    execaSync('npm', ['install'], { cwd: packageData.resolved })
    installSpinner.succeed(`Dependências instaladas em "${packageName}".`)
  }

  // Lint
  const lintSpinner = ora('Lintando arquivos...').start()
  execaSync('npm', ['run', 'lint'], { cwd: packages.global.resolved })
  lintSpinner.succeed('Arquivos lintados.')

  // Build UI
  const buildSpinner = ora('Gerando o "ui"...').start()
  execaSync('npm', ['run', 'build'], { cwd: packages.ui.resolved })
  buildSpinner.succeed('Geração do "ui" concluída.')
}

main()
