import * as AsteroidPlugin from 'asteroid'
import fontFace from 'asteroid-boot/font-face.js'
import debug from 'asteroid-boot/debug.js'

import axios from 'axios'
import { boot } from 'quasar/wrappers'

import { InitializeGlobalStores } from '@bildvitta/store-adapter'

export default boot(config => {
  config.app.use(InitializeGlobalStores)
  config.app.use(AsteroidPlugin)

  // adicionado para componentes que usam `inject` terem acesso ao axios e não quebrar na doc.
  config.app.provide('axios', axios)

  debug()
  fontFace()
})
