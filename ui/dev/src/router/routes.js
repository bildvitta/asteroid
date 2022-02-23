import pages from './pages'

const children = pages.map(page => ({
  path: page.path,
  component: () => import('pages/' + page.file + '.vue')
}))

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'users/new', name: 'UsersCreate', component: () => import('pages/TestFormView.vue') },
      { path: 'users/:id/edit', name: 'UsersEdit', component: () => import('pages/TestFormView.vue') }
    ].concat(children)
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

console.log(routes)

export default routes
