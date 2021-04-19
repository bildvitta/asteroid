import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      users
    },

    strict: process.env.DEBUGGING
  })

  return Store
}
