import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { SessionStorage } from 'quasar'
import { filterObject } from '../helpers'

import useContext from './use-context'
import useHistory from './use-history'

const cachedFilters = SessionStorage.getItem('cachedFilters') || {}
const onReadyCallbacks = {}
const enabledCachedList = {}

export default function (entity, options) {
  enabledCachedList[entity] = false

  function updateSessionStorage () {
    SessionStorage.set('cachedFilters', cachedFilters)
  }

  const defaultOptions = {
    watchRoute: true,
    exclude: [],
    ...options
  }

  async function initCache () {
    enabledCachedList[entity] = true

    const router = useRouter()
    const { history: { list } } = useHistory()

    if (defaultOptions.watchRoute) {
      const { context } = useContext()
      const { search, filters } = context.value
      const filtersList = Object.keys(filters)

      const hasQueryParams = search || filtersList.length

      if (hasQueryParams) {
        cachedFilters[entity] = {}

        search && addOne({ label: 'search', value: search })
        filtersList.forEach(filter => addOne({ label: filter, value: filters[filter] }))
      } else if (list.length > 1 && Object.keys(cachedFilters[entity] || {}).length) {
        await router.replace({ query: findAll() })
      }

      watch(context, value => {
        const { search, filters } = value
        const query = {
          ...filters,
          ...(search && { search })
        }

        const filteredQuery = {}

        for (const filter in query) {
          if (!defaultOptions.exclude.includes(filter)) {
            filteredQuery[filter] = query[filter]
          }
        }

        addMany(filteredQuery)
      }, { flush: 'post' })
    }

    executeOnReadyCallbacks()
  }

  function executeOnReadyCallbacks () {
    if (!onReadyCallbacks[entity]?.length) return

    onReadyCallbacks[entity].forEach(callbackFn => callbackFn({ filters: findAll() }))
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
    onReady,
    isEnabled: enabledCachedList[entity]
  }
}
