import { boot } from 'quasar/wrappers'
import VuePlugin from 'ui' // "ui" is aliased in quasar.conf.js
console.log(VuePlugin)

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5051'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
