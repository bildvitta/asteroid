import { addRoute } from '@bildvitta/quasar-ui-asteroid/src/store/history'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    addRoute(to)
    next()
  })
}
