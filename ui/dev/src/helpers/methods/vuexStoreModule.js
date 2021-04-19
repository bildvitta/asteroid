import axios from 'axios'
import VuexStoreModule from '@bildvitta/vuex-store-module'

const storeModule = new VuexStoreModule({ apiService: axios })

export default storeModule
