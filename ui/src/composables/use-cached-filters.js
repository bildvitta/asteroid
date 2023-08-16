import useContext from './use-context'
import { filterObject } from '../helpers'
import { SessionStorage } from 'quasar'
import { useRouter } from 'vue-router'
import useHistory from './use-history'

const cachedFilters = SessionStorage.getItem('cachedFilters') || {}
const onReadyCallbacks = {}

export default function (entity) {
  function updateSessionStorage () {
    SessionStorage.set('cachedFilters', cachedFilters)
  }

  async function initCache () {
    const router = useRouter()
    const { history: { list } } = useHistory()

    const { context } = useContext()
    const { search, filters } = context.value
    const filtersList = Object.keys(filters)

    const hasQueryParams = search || Object.keys(filters).length

    if (hasQueryParams) {
      cachedFilters[entity] = {}

      search && addOne({ label: 'search', value: search })
      filtersList.forEach(filter => addOne({ label: filter, value: filters[filter] }))

      executeOnReadyCallbacks()

      return
    }

    if (list.length > 1 && Object.keys(cachedFilters[entity] || {}).length) {
      await router.replace({ query: findAll() })
    }

    executeOnReadyCallbacks()
  }

  function executeOnReadyCallbacks () {
    if (!onReadyCallbacks[entity]?.length) return

    onReadyCallbacks[entity].forEach(callback => callback())
    delete onReadyCallbacks[entity]
  }

  function onReady (callback) {
    if (!onReadyCallbacks[entity]?.length) {
      onReadyCallbacks[entity] = []
    }

    onReadyCallbacks[entity].push(callback)
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
    clearAll,
    onReady
  }
}
