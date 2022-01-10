import pages from './pages'
import UsersCreate from '../pages/users/UsersCreate'
import UsersList from '../pages/users/UsersList'

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
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('layouts/ChildrenLayout.vue'),
        children: [
          {
            path: '',
            redirect: { name: 'list' }
          },
          {
            path: 'list',
            name: 'list',
            component: UsersList
          },
          {
            path: 'create',
            name: 'create',
            component: UsersCreate
          }
        ]
      }
    ].concat(children)
  }
]

export default routes
