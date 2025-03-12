import { computed, ref } from 'vue'
import { LocalStorage, is } from 'quasar'

const filterQuery = ref({})

const defaultFiltersHooks = {
  defaultFiltersChange: []
}

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
  const { getDefaultFiltersFromStorage, setFilterQuery } = useDefaultFilters()

  const { query } = to
  const newQuery = { ...query }

  // recupera os filtros padrão do LocalStorage
  const defaultFiltersFromStorage = getDefaultFiltersFromStorage()

  queryList.forEach(name => {
    // 1. se o filtro já estiver salvo no estado, então utiliza ele
    if (filterQuery.value[name]) {
      newQuery[name] = filterQuery.value[name]
      return
    }

    // 2. se o filtro já estiver na query, então utiliza ele
    if (query[name]) {
      setFilterQuery(query[name], name)

      return
    }

    const storedFilter = defaultFiltersFromStorage[name]

    // 3. se o filtro já estiver salvo no LocalStorage, então utiliza ele
    if (storedFilter) {
      setFilterQuery(storedFilter, name)
      newQuery[name] = storedFilter
    }
  })

  /**
   * Verifica se houve mudanças na query antes de redirecionar, sem essa validação
   * o redirecionamento ocorre mesmo que a query seja a mesma, gerando loop infinito.
   */
  if (!is.deepEqual(newQuery, query)) return next({ ...to, query: newQuery, replace: true })

  next()
}

/**
 * Este composable recupera os filtros default salvos no LocalStorage na chave 'defaultFilters'.
 */
export default function useDefaultFilters () {
  const hasFilterQuery = computed(() => !!Object.keys(filterQuery.value).length)

  function setFilterQuery (query, name = 'company') {
    filterQuery.value[name] = query
  }

  function getDefaultFiltersFromStorage () {
    const defaultFiltersFromStorage = LocalStorage.getItem('defaultFilters') || {}

    return defaultFiltersFromStorage
  }

  function triggerDefaultFiltersChange (newFilters, oldFilters) {
    // necessário verificar se houve mudanças antes de disparar o evento para não duplicar.
    if (is.deepEqual(newFilters, oldFilters)) return

    defaultFiltersHooks.defaultFiltersChange.forEach(hook => hook(newFilters, oldFilters))
  }

  function onDefaultFiltersChange (callback) {
    defaultFiltersHooks.defaultFiltersChange.push(callback)
  }

  function removeOnDefaultFiltersChange (callback) {
    const index = defaultFiltersHooks.defaultFiltersChange.indexOf(callback)

    if (~index) defaultFiltersHooks.defaultFiltersChange.splice(index, 1)
  }

  return {
    filterQuery,
    hasFilterQuery,
    getDefaultFiltersFromStorage,
    onDefaultFiltersChange,
    removeOnDefaultFiltersChange,
    setFilterQuery,
    triggerDefaultFiltersChange
  }
}
