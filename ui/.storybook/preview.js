// Storybook
import '@storybook/addon-console'

// Quasar
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

import 'quasar/dist/quasar.min.css'
import '../index.js'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: 'docs'
}

import Vue from 'vue'
import storeModule from '../src/mocks/storeModule'

import Vuex from 'vuex'
Vue.use(Vuex)