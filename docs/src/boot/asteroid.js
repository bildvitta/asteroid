import { boot } from 'quasar/wrappers'
import axios from 'axios'

import Asteroid from 'asteroid'
// import chartView from 'asteroid-boot/chart-view.js'
// import map from 'asteroid-boot/map.js'
import fontFace from 'asteroid-boot/font-face.js'
import debug from 'asteroid-boot/debug.js'

import { InitializeGlobalStores } from '@bildvitta/store-adapter'

export default boot(config => {
  config.app.use(InitializeGlobalStores)
  config.app.use(Asteroid)

  // adicionado para componentes que usam `inject` terem acesso ao axios e não quebrar na doc.
  config.app.provide('axios', axios)

  debug()
  // chartView(config)
  // map(config)
  fontFace()
})
