import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHashHistory, createWebHistory } from 'vue-router'

import routes from './routes'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),

    routes,

    scrollBehavior: (to, _, savedPosition) => (
      to.hash.length > 1 ? false : (savedPosition || { left: 0, top: 0 })
    )
  })

  return Router
})
