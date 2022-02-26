import { handleHistory } from '@bildvitta/quasar-ui-asteroid/src/store/history'
// import { handleHistory } from

export default async ({ router }) => {
  // Vue.prototype.$history = []
  const history = handleHistory()

  router.beforeEach(async ({ name }, from, next) => {
    console.log('estou aqui 2', handleHistory)
    // Vue.prototype.$history.unshift(from)
    history.push({ name })
    next()
  })
}
