import { install } from '@bildvitta/quasar-ui-asteroid/src/asteroid'
import fontFace from 'asteroid-boot/font-face.js'
import debug from 'asteroid-boot/debug.js'
import api from 'asteroid-boot/api.js'

import axios from 'axios'
import { boot } from 'quasar/wrappers'

import { InitializeGlobalStores } from '@bildvitta/store-adapter'

export default boot(config => {
  config.app.use(InitializeGlobalStores)
  config.app.use(install)

  // adicionado para componentes que usam `inject` terem acesso ao axios e não quebrar na doc.
  config.app.provide('axios', axios)

  axios.defaults.headers.common.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJkZWI1N2ZlOS01OGYyLTQyMTQtYjg0Ny04YTRjNWIwNjk5NjMiLCJqdGkiOiJkZWQxMjQ3N2UyMzI2NDM3MWY3MzM3ZWJlYjdiMDBjYTlkNmVmODMzNzg4NjA4NzE5ODc1ZjRlZWQ3OTA1YTc3YmUwNDcxYmM5MzM0NGVhZiIsImlhdCI6MTc1NjMxNjc2OS41NDg3NDEsIm5iZiI6MTc1NjMxNjc2OS41NDg3NDMsImV4cCI6MTc1NzYxMjc2OS41NDI3NjIsInN1YiI6IjMwIiwic2NvcGVzIjpbInByb2ZpbGUiXX0.IH0sirNSCJ8rjvuffM1AiaVmyOfYNp7pvhLCxSAclSLRVXlTE9KjCp3CHC1oMNuUedhqP_raoBy_vF9Y9eUYIb8vJVNzElOY5lqeuv3W5UFHjKrmq-vDuvLMan1q_KOZP63LQYQDRoVqSIlhBORC77L4zqY_2QLqYId-boypllRmWsPuUVuYAo6J0Ew4M2FS_It-BaEtHmcADjiEmYEr7TiIswzTeKRQpxFWo-hKD2_rtTB3U6UW-V0a9bFE7ZI0_lGHQpFz2yxfkiCD9fV7Cl948BjMUSsWs2V3-IobKpBQ_clhqYYjB9OaAew6ZIwxxvTmFb6gHYQjlrruE_ftK7WaaPkEz9-1BDUA1WwRATrXjJIL1dO29U8RS96uzjBMyRTu_kvsnoT0LwSrinVcdbK-5--mun_9rwQBW6BTUW-n_-kJIg0WAU5omxal-3BY_C-RzHjiJfpPinvIGF3qWSUok3G-arM0d9Ff_3rqzDWgsrCiNXDWmqJn_GisGhTmMVJVLfQKRDtQS-9dcddj-9vcu8hR1gjgf3ORVQLfBriZbfubtjfuMSi-VUNRX8rieVqngvsWZXBDp2giXXGvHw24wpB9iH-Uvy_2_YvyPTPtaLMXOtBo-uwFGG4TuYs19VXO-UnmvGmJQA88ZP-UtieGzGty8QaEFttD5Syhfe8'

  config.app.config.globalProperties.$axios = axios

  debug()
  fontFace()
  api(config)

  axios.defaults.baseURL = 'https://crm-server.nave.dev.br/api'
})
