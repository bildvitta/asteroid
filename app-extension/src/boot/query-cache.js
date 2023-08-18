import { addMany, findAll } from '@bildvitta/quasar-ui-asteroid/src/composables/use-cached-filters'
import useHistory from '@bildvitta/quasar-ui-asteroid/src/composables/use-history'

let isReplacingQuery = false

function getQueriesToExclude (route) {
  const { exclude = [], include = [] } = route.meta || {}

  return exclude.filter(value => !include.includes(value))
}

function setRouteCache (route) {
  if (!route.meta.useCache) return

  const filteredQuery = {}
  const { query } = route || {}

  const queriesToExclude = getQueriesToExclude(route)

  for (const filter in query) {
    if (!queriesToExclude.includes(filter)) {
      filteredQuery[filter] = query[filter]
    }
  }

  const hasQueryParams = !!Object.keys(filteredQuery).length

  if (hasQueryParams) {
    addMany(route.name, filteredQuery)
  }
}

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (useHistory().history.list.length <= 1) { return next() }

    setRouteCache(from)

    const { query, meta: { useCache } } = to
    const hasQueries = !!Object.keys(query).length

    if (!hasQueries && useCache && !isReplacingQuery) {
      const cachedQuery = findAll(to.name) || {}
      const queriesToExclude = getQueriesToExclude(to)
      const filteredQuery = {}

      for (const query in cachedQuery) {
        if (!queriesToExclude.includes(query)) {
          filteredQuery[query] = cachedQuery[query]
        }
      }

      isReplacingQuery = true

      return next({ ...to, query: filteredQuery })
    }

    isReplacingQuery = false

    next()
  })
}
