import useContext from './use-context'
import { SessionStorage } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const cachedFilters = {}

export default function (entity) {
  function updateSessionStorage () {
    SessionStorage.set('cachedFilters', cachedFilters)
  }

  async function initCache () {
    const router = useRouter()
    const route = useRoute()

    cachedFilters[entity] = {}

    const { search, filters } = useContext().context.value

    const hasQueryParams = search || Object.keys(filters).length

    if (hasQueryParams) {
      search && addOne({ label: 'search', value: search })
      Object.keys(filters).forEach(filter => addOne({ label: filter, value: filters[filter] }))
    } else {
      const storedFilters = SessionStorage.getItem('cachedFilters') || {}
      Object.keys(storedFilters).forEach(filter => (cachedFilters[filter] = storedFilters[filter]))

      await router.push({ query: { ...route.query, ...cachedFilters[entity] } })
    }
  }

  function addOne ({ label, value }) {
    cachedFilters[entity][label] = value
    updateSessionStorage()
  }

  function addMany (filters) {
    cachedFilters[entity] = filters
    updateSessionStorage()
  }

  function findOne (filter) {
    return cachedFilters[entity][filter]
  }

  function findAll () {
    return cachedFilters[entity]
  }

  function clearOne (filter) {
    delete cachedFilters[entity][filter]
    updateSessionStorage()
  }

  function clearAll ({ exclude = [] }) {
    if (exclude?.length) {
      cachedFilters[entity] = Object.keys(cachedFilters[entity]).filter(filter => exclude.includes(filter))
    } else {
      delete cachedFilters[entity]
    }

    updateSessionStorage()
  }

  return {
    initCache,
    addOne,
    addMany,
    findOne,
    findAll,
    clearOne,
    clearAll
  }
}
