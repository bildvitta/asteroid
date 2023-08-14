import useContext from './use-context'
import { filterObject } from '../helpers'
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

    const { context } = useContext()
    const { search, filters } = context.value
    const filtersList = Object.keys(filters)

    const hasQueryParams = search || Object.keys(filters).length

    if (hasQueryParams) {
      search && addOne({ label: 'search', value: search })
      filtersList.forEach(filter => addOne({ label: filter, value: filters[filter] }))

      return
    }

    const storedFilters = SessionStorage.getItem('cachedFilters') || {}
    const storageFiltersList = Object.keys(storedFilters[entity] || {})

    storageFiltersList.forEach(filter => {
      cachedFilters[entity][filter] = storedFilters[entity][filter]
    })

    if (Object.keys(cachedFilters[entity]).length) {
      await router.replace({ query: { ...route.query, ...cachedFilters[entity] } })
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
    if (exclude.length) {
      cachedFilters[entity] = filterObject(cachedFilters[entity], exclude)
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
