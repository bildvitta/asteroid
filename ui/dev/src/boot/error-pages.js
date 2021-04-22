import ForbiddenPage from 'ui/pages/Forbidden.vue'
import NotFound from 'ui/pages/NotFound.vue'

export default function ({ router }) {
  const routes = [
    {
      name: 'Forbidden',
      path: '/',
      component: ForbiddenPage
    }
  ]

  if (process.env.MODE !== 'ssr') {
    routes.push({
      name: 'NotFound',
      path: '*',
      component: NotFound
    })
  }

  router.addRoutes(routes)
}
