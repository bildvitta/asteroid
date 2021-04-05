import VuexStoreModule from '@bildvitta/vuex-store-module'
import axios from 'axios'

const storeModule = new VuexStoreModule({ apiService: axios })
// you can pass your own API like axios to apiService

export default storeModule
