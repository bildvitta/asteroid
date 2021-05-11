import pages from './pages'

const children = pages.map(page => ({
  path: page.path,
  component: () => import('pages/' + page.file + '.vue')
}))

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    children: [
      {
        path: '',
        name: 'Root',
        component: () => import('pages/Index.vue')
      }
    ].concat(children)
  }
]

export default routes
