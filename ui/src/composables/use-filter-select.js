import { computed, ref } from 'vue'
import { LocalStorage } from 'quasar'

const filterQuery = ref({})

/**
 * Define os filtros padrão antes de entrar na rota.
 *
 * Prioridade de aplicação dos filtros:
 * 1 - Se o filtro estiver salvo no estado global, então utiliza ele.
 * 2 - Se o filtro já estiver na query, então utiliza ele.
 * 3 - Se o filtro já estiver salvo no LocalStorage, então utiliza ele.
 *
 * @param {Object} to - Rota de destino.
 * @param {Object} _from - Rota de origem.
 * @param {Function} next - Função de redirecionamento.
 * @param {Array} queryList='company' - Lista de filtros a serem aplicados.
 */
export function setDefaultFiltersBeforeEnter (to, _from, next, queryList = ['company']) {
  const { getDefaultFiltersFromStorage, setFilterQuery } = useFilterSelect()

  const { query } = to
  const newQuery = { ...query }

  // recupera os filtros padrão do LocalStorage
  const defaultFiltersFromStorage = getDefaultFiltersFromStorage()

  queryList.forEach(name => {
    // se o filtro já estiver salvo no estado, então utiliza ele
    if (filterQuery.value[name]) {
      newQuery[name] = filterQuery.value[name]
      return
    }

    // se o filtro já estiver na query, então utiliza ele
    if (query[name]) {
      setFilterQuery(query[name], name)

      return
    }

    // se o filtro já estiver salvo no LocalStorage, então utiliza ele
    const storedQuery = defaultFiltersFromStorage[name]

    if (storedQuery) {
      setFilterQuery(storedQuery, name)
      newQuery[name] = storedQuery
    }
  })

  /**
   * Verifica se houve mudanças na query antes de redirecionar, sem essa validação
   * o redirecionamento ocorre mesmo que a query seja a mesma, gerando loop infinito.
   */
  if (JSON.stringify(newQuery) !== JSON.stringify(query)) return next({ ...to, query: newQuery, replace: true })

  next()
}

export default function useFilterSelect () {
  const hasFilterQuery = computed(() => !!Object.keys(filterQuery.value).length)

  function setFilterQuery (query, name = 'company') {
    filterQuery.value[name] = query
  }

  function getDefaultFiltersFromStorage () {
    const defaultFiltersFromStorage = LocalStorage.getItem('defaultFilters') || {}

    return defaultFiltersFromStorage
  }

  return {
    filterQuery,
    hasFilterQuery,
    getDefaultFiltersFromStorage,
    setFilterQuery
  }
}
