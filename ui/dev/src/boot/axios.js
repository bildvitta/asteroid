import axios from 'axios'

export default async ({ Vue }) => {
  // baseURL
  axios.defaults.baseURL = 'http://localhost:3000/portal-app/'

  axios.defaults.headers.Authorization = 'JWT eyJhbGciOiJIUzI1NiJ9.eyJzbHVnIjoiZGVmYXVsdC11c2VyIiwiY29tcGFueSI6MSwiY3JlYXRlZF9hdCI6MTYyMDkxNjMyMH0.32mgAUHfYv2TvcFv6WbIPlELXZUoVw04qBQW-GkWS58'
  // axios.defaults.headers.Authorization = 'JWT eyJhbGciOiJIUzI1NiJ9.eyJzbHVnIjoiZWxpYXMtYXNzdW5jYW8iLCJjcmVhdGVkX2F0IjoxNjIwNzU4Nzg5fQ.RqjLw-4UPNjz4DUs4dmpEH8nRn27RhNc66nrW-tc0Hw'

  Vue.prototype.$axios = axios
}
