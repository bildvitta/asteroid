import { createStore } from 'vuex'

import VuexOffline from '@bildvitta/vuex-offline'

import { charts, chartsMultipleResults, users, notifications } from './modules'

import chartsMock from './mocks/charts.json'
import chartsMultipleResultsMock from './mocks/charts-multiple-results.json'
import usersMock from './mocks/users.json'
import notificationsMock from './mocks/notifications.json'

const vuexOffline = new VuexOffline({
  idKey: 'uuid',

  storage: 'memory',

  database: {
    name: 'asteroiddb',
    multiInstance: true,
    ignoreDuplicate: true
  },

  modules: [
    charts,
    chartsMultipleResults,
    users,
    notifications
  ]
})

window.vuexOffline = vuexOffline

export default async function (/* { ssrContext } */) {
  await vuexOffline.createDatabase()
  await vuexOffline.setupCollections()

  const {
    charts,
    charts_multiple_results: chartsMultipleResults,
    users,
    notifications
  } = vuexOffline.collections

  await charts.importJSON(chartsMock)
  await chartsMultipleResults.importJSON(chartsMultipleResultsMock)
  await users.importJSON(usersMock)
  await notifications.importJSON(notificationsMock)

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
