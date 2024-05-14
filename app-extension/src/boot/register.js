// TODO: Rever uso do build
// import VuePlugin from '@bildvitta/quasar-ui-asteroid/dist/asteroid.esm.js'

import { install } from '@bildvitta/quasar-ui-asteroid/src/index.esm.js'
console.log('TCL: VuePlugin --->', install)

export default ({ app }) => {
  app.use({ install })
}
