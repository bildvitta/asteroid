import { boot } from 'quasar/wrappers'

import Asteroid from 'asteroid'
import { InitializeGlobalStores } from '@bildvitta/store-adapter'

export default boot(({ app }) => {
  app.use(InitializeGlobalStores)
  app.use(Asteroid)
})
