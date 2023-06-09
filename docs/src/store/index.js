import { createStore } from 'vuex'

import VuexOffline from '@bildvitta/vuex-offline'

import { charts, chartsTwoLines, users } from './modules'

import chartsMock from './mocks/charts.json'
import chartsTwoLinesMock from './mocks/charts-two-lines.json'
import usersMock from './mocks/users.json'

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
    chartsTwoLines,
    users
  ]
})

export default async function (/* { ssrContext } */) {
  await vuexOffline.createDatabase()
  await vuexOffline.setupCollections()

  const { charts, chartsTwoLines, users } = vuexOffline.collections

  await charts.importJSON(chartsMock)
  await chartsTwoLines.importJSON(chartsTwoLinesMock)
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
