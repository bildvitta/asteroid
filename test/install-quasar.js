import { createApp } from 'vue'
import { Quasar, QBtn } from 'quasar'

export default function ({ components }) {
  const app = createApp({})

  app.use(Quasar, { components: QBtn })

  return {
    app: Quasar
  }
}
