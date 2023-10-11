import { camelizeKeys, decamelizeKeys } from 'humps'

import asteroidConfig from 'asteroid-config'

export default async ({ app }) => {
  const api = app.config.globalProperties.$axios

  // Defaults
  api.defaults.baseURL = process.env.SERVER_BASE_URL || '/'

  api.defaults.timeout = asteroidConfig.api.serverTimeout

  // Transformers
  api.defaults.transformResponse = [
    ...api.defaults.transformResponse,

    data => camelizeKeys(data, (key, convert) =>
      /^\D+$/.test(key) ? convert(key) : key
    )
  ]

  api.defaults.transformRequest = [
    data => {
      if (data instanceof FormData) {
        return data
      }

      return decamelizeKeys(data, (key, convert, options) =>
        /^\D+$/.test(key) ? convert(key, options) : key
      )
    },

    ...api.defaults.transformRequest
  ]

  /* Adicionado por conta de composition components não terem acesso ao "globalProperties" */
  app.provide('axios', api)
}
