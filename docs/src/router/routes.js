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
    component: () => import('src/pages/error-404.vue')
  }
]

export default routes
