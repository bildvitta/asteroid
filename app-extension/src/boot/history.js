import { handleHistory } from '@bildvitta/quasar-ui-asteroid/src/helpers/historyHandler'

export default async ({ Vue, router }) => {
  Vue.prototype.$history = []
  const history = handleHistory()

  router.beforeEach(async (to, from, next) => {
    Vue.prototype.$history.unshift(from)
    history.push(to)
    next()
  })
}
