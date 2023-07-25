import { SessionStorage } from 'quasar'
import { reactive } from 'vue'

const cachedFilters = reactive({})

export default function (entity) {
  const storedFilters = SessionStorage.getItem('cachedFilters') || {}

  Object.keys(storedFilters).length
    ? Object.keys(storedFilters).forEach(filter => (cachedFilters[filter] = storedFilters[filter]))
    : cachedFilters[entity] = {}

  function updateSessionStorage () {
    SessionStorage.set('cachedFilters', cachedFilters)
  }

  return {
    add (filters) {
      cachedFilters[entity] = filters
      updateSessionStorage()
    },

    findOne (filter) {
      return cachedFilters[entity][filter]
    },

    findAll () {
      return cachedFilters[entity]
    },

    clearOne (filter) {
      delete cachedFilters[entity][filter]
      updateSessionStorage()
    },

    clearAll () {
      delete cachedFilters[entity]
      updateSessionStorage()
    }
  }
}
