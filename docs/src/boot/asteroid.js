import { boot } from 'quasar/wrappers'

import Asteroid from 'asteroid'

export default boot(({ app }) => {
  app.use(Asteroid)
})
