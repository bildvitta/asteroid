import useHistory from '@bildvitta/quasar-ui-asteroid/src/composables/use-history'
import { setDefaultFiltersBeforeEach } from '@bildvitta/quasar-ui-asteroid'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const { addRoute } = useHistory()

    addRoute(to)

    setDefaultFiltersBeforeEach(to, from, next)
  })
}
