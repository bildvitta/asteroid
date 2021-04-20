import ForbiddenPage from '@bildvitta/quasar-ui-asteroid/src/pages/Forbidden.vue'
import NotFound from '@bildvitta/quasar-ui-asteroid/src/pages/NotFound.vue'

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
