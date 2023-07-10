import chartViewComponent from './components/chart-view-component'
import mapComponent from './components/map-component'

export default function () {
  const components = {
    QasChartView: chartViewComponent(),
    QasMap: mapComponent()
  }

  function getComponents () {
    const normalizedComponents = {}

    for (const key in components) {
      normalizedComponents[key] = components[key].QasComponent
    }

    return normalizedComponents
  }

  async function initializeComponents (app) {
    for (const key in components) {
      components[key].initializeComponent(app)
    }
  }

  return {
    initializeComponents,

    getComponents
  }
}
