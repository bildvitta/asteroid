import { camelizeKeys, decamelizeKeys } from 'humps'
import axios from 'axios'

export default async ({ Vue }) => {
  const api = Vue.prototype.$axios

  // Defaults
  axios.defaults.baseURL = process.env.SERVER_BASE_URL || '/'
  axios.defaults.timeout = process.env.SERVER_TIMEOUT || 10000

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
}
