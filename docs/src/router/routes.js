import getPages from './pages.js'

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('src/layouts/DocLayout.vue'),
    children: getPages()
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('../../../ui/src/pages/NotFound.vue')
  }
]

export default routes
