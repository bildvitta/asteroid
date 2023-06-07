import { createStore } from 'vuex'
import { chart, users } from './modules'
import VuexOffline from '@bildvitta/vuex-offline'
import chartMock from './chart-mock.json'
import usersMock from './users-mock.json'

const vuexOffline = new VuexOffline({
  idKey: 'uuid',

  storage: 'memory',

  database: {
    name: 'asteroiddb',
    multiInstance: true,
    ignoreDuplicate: true
  },

  modules: [
    chart,
    users
  ]
})

export default async function (/* { ssrContext } */) {
  await vuexOffline.createDatabase()
  await vuexOffline.setupCollections()

  const { chart, users } = vuexOffline.collections

  await chart.importJSON(chartMock)
  await users.importJSON(usersMock)

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
