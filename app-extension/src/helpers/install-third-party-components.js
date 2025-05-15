import thirdPartyComponentsHandler from './third-party-components-handler.js'

import chartView from '../third-party-components/chart-view.js'
import map from '../third-party-components/map.js'

export default function (api, { filePath }) {
  const components = [chartView, map]

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
