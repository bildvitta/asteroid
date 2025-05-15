// TODO: Rever uso do build
// import VuePlugin from '@bildvitta/quasar-ui-asteroid/dist/asteroid.esm.js'

import VuePlugin from '@bildvitta/quasar-ui-asteroid/src/index.esm.js'
export default ({ app }) => {
  app.use(VuePlugin)
}
