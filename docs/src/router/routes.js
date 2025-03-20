import getPages from './pages.js'

import { setDefaultFiltersBeforeEnter } from '../../../ui/src/composables/use-default-filters.js'

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('src/layouts/DocLayout.vue'),
    children: getPages()
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
    path: '/test/1',
    component: () => import('src/pages/page1.vue'),
    beforeEnter: setDefaultFiltersBeforeEnter
  },

  {
    path: '/test/2',
    component: () => import('src/pages/page2.vue'),
    beforeEnter: (to, from, next) => setDefaultFiltersBeforeEnter(to, from, next, { company: true })
  },

  {
    path: '/test/3',
    component: () => import('src/pages/page3.vue'),
    beforeEnter: (to, from, next) => setDefaultFiltersBeforeEnter(to, from, next, { company: true })
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('../../../ui/src/pages/NotFound.vue')
  }
]

export default routes
