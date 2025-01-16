import getPages from './pages.js'

// import { setDefaultFiltersBeforeEnter } from '../../../ui/src/composables/use-filter-select.js'

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('src/layouts/DocLayout.vue'),
    children: [
      ...getPages(),
      {
        path: '/2',
        name: 'Root2',
        component: () => import('src/pages/index2.vue')
        // beforeEnter: setDefaultFiltersBeforeEnter
      }
    ]
  },

  {
    path: '/paginas/not-found',
    component: () => import('../../../ui/src/pages/NotFound.vue')
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
