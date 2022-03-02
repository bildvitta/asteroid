import { addRoute } from '@bildvitta/quasar-ui-asteroid/src/store/history'
// import { handleHistory } from

export default ({ router }) => {
  // Vue.prototype.$history = []
  // const history = handleHistory()

  router.beforeEach((to, from, next) => {
    // Vue.prototype.$history.unshift(from)
    addRoute(to)
    next()
  })
}
