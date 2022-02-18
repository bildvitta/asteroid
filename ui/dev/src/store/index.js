import { createStore } from 'vuex'
import users from './modules/users'
// import showcase from './showcase'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      users
      // showcase
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}
