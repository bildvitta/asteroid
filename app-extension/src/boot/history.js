import useHistory from '@bildvitta/quasar-ui-asteroid/src/composables/use-history'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const { addRoute } = useHistory()
    addRoute(to)
    next()
  })
}
