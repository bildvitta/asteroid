import { LocalStorage } from 'quasar'

// adicionada globalmente para estado persistir.
const filterQuery = {}

export default function setDefaultFiltersBeforeEnter (to, _from, next, queryList = ['company']) {
  const { query } = to
  const newQuery = { ...query }

  const defaultFiltersFromStorage = getDefaultFiltersFromStorage()

  queryList.forEach(name => {
    if (query[name] && !filterQuery[name]) {
      console.log('TCL: setDefaultFiltersBeforeEnter -> query[name]', query[name])
      setFilterQuery(query[name], name)

      console.log(filterQuery, 'filterQuery')

      return
    }

    const storedQuery = defaultFiltersFromStorage[name]
    console.log('TCL: setDefaultFiltersBeforeEnter -> storedQuery', storedQuery)

    if (storedQuery) {
      setFilterQuery(storedQuery, name)
      newQuery[name] = storedQuery
    }
  })

  /**
   * Verifica se houve mudanças na query antes de redirecionar, sem essa validação
   * o redirecionamento ocorre mesmo que a query seja a mesma, gerando loop infinito.
   */
  if (JSON.stringify(newQuery) !== JSON.stringify(query)) return next({ ...to, query: newQuery })

  next()

  // private functions
  function setFilterQuery (query, name = 'company') {
    filterQuery[name] = query
  }

  function getDefaultFiltersFromStorage () {
    const defaultFiltersFromStorage = LocalStorage.getItem('defaultFilters') || {}

    return defaultFiltersFromStorage
  }
}
