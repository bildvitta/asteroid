import ForbiddenPage from '@bildvitta/quasar-ui-asteroid/src/pages/Forbidden.vue'
import NotFound from '@bildvitta/quasar-ui-asteroid/src/pages/NotFound.vue'
import ServerError from '@bildvitta/quasar-ui-asteroid/src/pages/ServerError.vue'

export default function ({ router }) {
  const routes = [
    {
      name: 'Forbidden',
      path: '/',
      component: ForbiddenPage
    },
    {
      name: 'ServerError',
      path: '/',
      component: ServerError
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
