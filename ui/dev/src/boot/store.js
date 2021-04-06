import store from '../store'

export default function ({ Vue }) {
  Vue.prototype.$store = store
}
