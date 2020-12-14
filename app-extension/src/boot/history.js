export default async ({ Vue, router }) => {
  Vue.prototype.$history = []

  router.beforeEach(async (to, from, next) => {
    Vue.prototype.$history.unshift(from)
    next()
  })
}
