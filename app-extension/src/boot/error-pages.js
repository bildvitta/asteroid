export default async function ({ router }) {
  const routes = [
    {
      name: 'Forbidden',
      path: '/',
      component: () => import('asteroid').then(module => module.Forbidden)
    },
    {
      name: 'ServerError',
      path: '/',
      component: () => import('asteroid').then(module => module.ServerError)
    }
  ]

  if (process.env.MODE !== 'ssr') {
    routes.push({
      name: 'NotFound',
      path: '/:catchAll(.*)*',
      component: () => import('asteroid').then(module => module.NotFound)
    })
  }

  routes.forEach(route => router.addRoute(route))
}
