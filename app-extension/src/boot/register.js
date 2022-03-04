import VuePlugin from '../../../ui/src/index.esm.js'

/* It's a plugin that allows you to use Google Maps in your Vue app. */
import VueGoogleMaps from '@fawmi/vue-google-maps'

import { Notify, Quasar } from 'quasar'

export default ({ app }) => {
  app
    .use(VuePlugin)
    .use(VueGoogleMaps, { load: { key: process.env.MAPS_API_KEY, libraries: 'places' } })
    .use(Quasar, { plugins: { Notify } })
}
