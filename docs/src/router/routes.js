import getPages from './pages.js'

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('src/layouts/DocLayout.vue'),
    children: getPages()
  },

  {
    path: '/pagina1',
    name: 'Page1',
    component: () => import('src/pages/page1.vue')
  },

  {
    path: '/pagina2',
    name: 'Page2',
    component: () => import('src/pages/page2.vue')
  },

  {
    path: '/pagina3',
    name: 'Page3',
    component: () => import('src/pages/page3.vue')
  },

  {
    path: '/paginas/not-found',
    component: () => import('../../../ui/src/pages/NotFound.vue')
  },

  {
    path: '/paginas/unauthorized',
    component: () => import('../../../ui/src/pages/Unauthorized.vue')
  },

  {
    path: '/paginas/forbidden',
    component: () => import('../../../ui/src/pages/Forbidden.vue')
  },

  {
    path: '/paginas/server-error',
    component: () => import('../../../ui/src/pages/ServerError.vue')
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('../../../ui/src/pages/NotFound.vue')
  }
]

export default routes
