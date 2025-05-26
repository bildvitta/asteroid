// TODO: Rever uso do build
import * as VuePlugin from 'asteroid'
// Or use the specific component import if available
// import { QasBtn } from '@bildvitta/quasar-ui-asteroid'

export default ({ app }) => {
  app.use(VuePlugin)
}
