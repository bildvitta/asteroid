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
 * Comportamento entre mesma entidade variando telas com multiple: true|false:
 * 1 - Se minha tela atual for de múltiplos registros e a próxima for de um único registro,
 * então o filtro será aplicado apenas no primeiro item.
 * 2 - Se minha tela atual for de um único registro e a próxima for de múltiplos registros,
 * então o filtro será aplicado em todos os registros.
 * 3 - Se minha tela atual e a próxima forem de múltiplos registros, então o filtro será aplicado
 * em todos os registros.
 *
 * @param {object} to - Rota de destino.
 * @param {object} _from - Rota de origem.
 * @param {function} next - Função de redirecionamento.
 * @param {array|object} queryList='company' - Lista de filtros a serem aplicados.
 *
 * @example
 * ```js
 * setDefaultFiltersBeforeEnter(to, from, next)
 * setDefaultFiltersBeforeEnter(to, from, next, ['company', 'properties'])
 * setDefaultFiltersBeforeEnter(to, from, next, { company: false, properties: true // multiple })
 * ```
 */
export function setDefaultFiltersBeforeEnter (to, _from, next, queryList = ['company']) {
  const { getDefaultFiltersFromStorage, setFilterQuery } = useDefaultFilters()

  const { query } = to
  const newQuery = { ...query }

  const isQueryListArray = Array.isArray(queryList)
  const normalizedQueryList = isQueryListArray ? {} : queryList

  /**
   * Meta no qual será utilizado para recuperar os filtros padrão de determinada rota.
   * Será utilizado no boot beforeEach, sendo que ele sempre garantirá que caso eu vá para a mesma tela de origem (normalmente
   * em caso de menu ou breadcrumb), os filtros padrões não se percam, pois o beforeEnter não é chamado novamente ao ir
   * para a mesma rota.
   */
  to.meta = { defaultQuery: normalizedQueryList }

  // normaliza sempre o queryList para um objeto
  if (isQueryListArray) {
    queryList.forEach(name => { normalizedQueryList[name] = false })
  }

  // recupera os filtros padrão do LocalStorage
  const defaultFiltersFromStorage = getDefaultFiltersFromStorage()

  for (const key in normalizedQueryList) {
    const filterQueryValue = filterQuery.value[key]

    // 1. se o filtro já estiver salvo no estado, então utiliza ele
    if (filterQueryValue) {
      // se normalizedQueryList[key] for "true" (multiple) então utiliza o filtro completo
      if (normalizedQueryList[key]) {
        newQuery[key] = filterQueryValue
        continue
      }

      // filterQueryValue é um array, então pega o primeiro item
      newQuery[key] = Array.isArray(filterQueryValue) ? filterQueryValue?.at(0) : filterQueryValue
      continue
    }

    // 2. se o filtro já estiver na query, então utiliza ele
    if (query[key]) {
      setFilterQuery(query[key], key)

      continue
    }

    const storedFilter = defaultFiltersFromStorage[key]

    // 3. se o filtro já estiver salvo no LocalStorage, então utiliza ele
    if (storedFilter) {
      setFilterQuery(storedFilter, key)
      newQuery[key] = storedFilter
    }
  }

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
