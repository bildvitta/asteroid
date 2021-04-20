import axios from 'axios'
import VuexStoreModule from '@bildvitta/vuex-store-module'

const storeModule = new VuexStoreModule({ apiService: axios, idAttribute: 'uuid' })
// you can pass your own API like axios to apiService

export default storeModule
