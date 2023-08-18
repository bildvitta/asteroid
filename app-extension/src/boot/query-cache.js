import useQueryCache from '@bildvitta/quasar-ui-asteroid/src/composables/use-query-cache'
import useHistory from '@bildvitta/quasar-ui-asteroid/src/composables/use-history'

const { addMany, findAll, clearAll } = useQueryCache()

let isReplacingQuery = false

function getQueriesToExclude (route) {
  const { excludes = [], includes = [] } = route.meta || {}

  return excludes.filter(value => !includes.includes(value))
}

function setRouteCache (route) {
  if (!route.meta.useCache) return

  let filteredQuery = {}
  const { query } = route || {}

  const queriesToExclude = getQueriesToExclude(route)

  if (queriesToExclude.length) {
    for (const filter in query) {
      if (!queriesToExclude.includes(filter)) {
        filteredQuery[filter] = query[filter]
      }
    }
  } else {
    filteredQuery = query
  }

  const hasQueryParams = !!Object.keys(filteredQuery).length

  if (hasQueryParams) {
    addMany(route.name, filteredQuery)
  }
}

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (!useHistory().hasPreviousRoute.value) {
      clearAll(to.name)

      return next()
    }

    setRouteCache(from)

    const { query, meta: { useCache } } = to
    const hasQueries = !!Object.keys(query).length

    if (!hasQueries && useCache && !isReplacingQuery) {
      const cachedQuery = findAll(to.name) || {}

      isReplacingQuery = true

      return next({ ...to, query: cachedQuery })
    }

    isReplacingQuery = false

    next()
  })
}
