module.exports = function (api) {
  const FILE_NAME = 'asteroid.config.js'

  return {
    async validate () {
      const fs = require('fs')
      const hasAsteroidConfigFile = fs.existsSync(FILE_NAME)

      if (!hasAsteroidConfigFile) {
        const { default: ora } = await import('ora')

        ora('Você deve criar um arquivo asteroid.config.js na raiz do projeto').fail()

        throw new Error()
      }
    },

    getAsteroidConfigPath () {
      return api.resolve.app(FILE_NAME)
    }
  }
}
