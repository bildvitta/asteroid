module.exports = function (api, { filePath }) {
  const thirdPartyComponentsHandler = require('./third-party-components-handler')

  const components = [
    require('../third-party-components/map'),
    require('../third-party-components/chart-view')
  ]

  async function exec () {
    for (const component of components) {
      const { name, ...config } = component

      const thirdPartyComponent = await thirdPartyComponentsHandler(api, {
        componentName: name,
        filePath,

        ...config
      })

      thirdPartyComponent.exec()
    }
  }

  return {
    exec
  }
}
