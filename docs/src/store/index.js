import { createStore } from 'vuex'
import users from './modules/users'
import VuexOffline from '@bildvitta/vuex-offline'
import mock from './mock.json'

const vuexOffline = new VuexOffline({
  idKey: 'uuid',

  storage: 'memory',

  database: {
    name: 'asteroiddb',
    multiInstance: true,
    ignoreDuplicate: true
  },

  modules: [
    users
  ]
})

export default async function (/* { ssrContext } */) {
  await vuexOffline.createDatabase()
  await vuexOffline.setupCollections()

  const { users } = vuexOffline.collections

  await users.importJSON(mock)
  window.vuexOffline = vuexOffline

  const Store = createStore({
    modules: {
      ...vuexOffline.getStoreModules()
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}
