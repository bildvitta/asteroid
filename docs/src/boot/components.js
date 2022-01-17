import { boot } from 'quasar/wrappers'

import DocCardTitle from 'components/DocCardTitle.vue'
import DocCode from 'components/DocCode.vue'
import DocCopyButton from 'components/DocCopyButton.vue'
import DocExample from 'components/DocExample.vue'
import DocHeading from 'components/DocHeading.vue'
import DocMenu from 'components/DocMenu.vue'
import DocPage from 'components/DocPage.vue'

export default boot(({ app }) => {
  app.component('DocCardTitle', DocCardTitle)
  app.component('DocCode', DocCode)
  app.component('DocCopyButton', DocCopyButton)
  app.component('DocExample', DocExample)
  app.component('DocHeading', DocHeading)
  app.component('DocMenu', DocMenu)
  app.component('DocPage', DocPage)
})
