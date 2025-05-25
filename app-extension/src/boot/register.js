// TODO: Rever uso do build
import VuePlugin from '@bildvitta/quasar-ui-asteroid'
// Or use the specific component import if available
// import { QasBtn } from '@bildvitta/quasar-ui-asteroid'

console.log('TCL: VuePlugin', VuePlugin)

export default ({ app }) => {
  app.use(VuePlugin)
}
