import { boot } from 'quasar/wrappers'

import Asteroid from 'asteroid'
import chartView from 'asteroid-boot/chart-view.js'
import map from 'asteroid-boot/map.js'
import fontFace from 'asteroid-boot/font-face.js'
import debug from 'asteroid-boot/debug.js'

import { InitializeGlobalStores } from '@bildvitta/store-adapter'

export default boot(config => {
  config.app.use(InitializeGlobalStores)
  config.app.use(Asteroid)

  debug()
  chartView(config)
  map(config)
  fontFace()
})
