// TODO: Rever uso do build
// import VuePlugin from '@bildvitta/quasar-ui-asteroid/dist/asteroid.esm.js'

import * as VuePlugin from 'asteroid'

export default ({ app }) => {
  app.use(VuePlugin)
}
