import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-asteroid'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
