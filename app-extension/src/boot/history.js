import { useHistory } from 'asteroid'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const { addRoute } = useHistory()
    addRoute(to)
    next()
  })
}
