import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'Asteroid',

  setup () {
    return () => h(QBadge, {
      class: 'Asteroid',
      label: 'Asteroid'
    })
  }
}
