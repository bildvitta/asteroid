import { boot } from 'quasar/wrappers'

import DocApi from 'components/DocApi.vue'
import DocApiEntry from 'components/DocApiEntry.vue'
import DocCardTitle from 'components/DocCardTitle.vue'
import DocCode from 'components/DocCode.vue'
import DocCopyButton from 'components/DocCopyButton.vue'
import DocExample from 'components/DocExample.vue'
import DocHeading from 'components/DocHeading.vue'
import DocMenu from 'components/DocMenu.vue'
import DocNote from 'components/DocNote.vue'
import DocPage from 'components/DocPage.vue'
import DocToken from 'components/DocToken.vue'

export default boot(({ app }) => {
  app.component('DocApi', DocApi)
  app.component('DocApiEntry', DocApiEntry)
  app.component('DocCardTitle', DocCardTitle)
  app.component('DocCode', DocCode)
  app.component('DocCopyButton', DocCopyButton)
  app.component('DocExample', DocExample)
  app.component('DocHeading', DocHeading)
  app.component('DocMenu', DocMenu)
  app.component('DocNote', DocNote)
  app.component('DocPage', DocPage)
  app.component('DocToken', DocToken)
})
