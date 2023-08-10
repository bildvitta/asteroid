import useContext from './use-context'
import { SessionStorage } from 'quasar'
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const cachedFilters = reactive({})

export default function (entity) {
  function updateSessionStorage () {
    SessionStorage.set('cachedFilters', cachedFilters)
  }

  async function init () {
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
    }

    await router.push({ query: { ...route.query, ...cachedFilters[entity] } })
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
    exclude?.length
      ? Object.keys(cachedFilters[entity]).forEach(filter => !exclude.includes(filter) && clearOne(filter))
      : delete cachedFilters[entity]

    updateSessionStorage()
  }

  return {
    init,
    addOne,
    addMany,
    findOne,
    findAll,
    clearOne,
    clearAll
  }
}
