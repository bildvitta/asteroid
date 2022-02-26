import { boot } from 'quasar/wrappers'
// TODO voltar
// import VuePlugin from 'quasar-ui-asteroid'

import VuePlugin from '../../../ui/src/index.esm.js'
import { Notify, Quasar } from 'quasar'

export default boot(({ app }) => {
  app.use(VuePlugin).use(Quasar, {
    plugins: {
      Notify
    }
  })
})
