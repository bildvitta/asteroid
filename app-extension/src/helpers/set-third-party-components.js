module.exports = async function (api, { filePath }) {
  const thirdPartyComponentsHandler = require('./third-party-components-handler')

  const components = [
    require('../third-party-components/map')
  ]

  function exec () {
    components.forEach(async ({ name, config }) => {
      const thirdPartyComponent = await thirdPartyComponentsHandler(api, {
        componentName: name,
        filePath,

        ...config
      })

      thirdPartyComponent.exec()
    })
  }

  return {
    exec
  }
}
