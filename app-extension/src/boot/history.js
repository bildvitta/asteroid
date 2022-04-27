import useHistory from '@bildvitta/quasar-ui-asteroid/src/composables/useHistory'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const { addRoute } = useHistory()
    addRoute(to)
    next()
  })
}
