import useHistory from '@bildvitta/quasar-ui-asteroid/src/composables/use-history'

/**
 * Função na qual valida os seguintes cenários:
 * 1 - Se estou indo para a mesma rota;
 * 2 - Se a rota tem o beforeEnter (normalmente usado com o método setDefaultFiltersBeforeEnter);
 * 3 - Se a rota de destino nao tem query.
 *
 * Dado as validações acima, caso seja verdadeira, eu redireciono para rota com os filtros padrões aplicados.
 *
 * @param {object} to - Rota de destino.
 * @param {object} from - Rota de origem.
 * @param {function} next - Função de redirecionamento.
 */
function onBeforeEach (to, from, next) {
  const isSameRoute = to.name === from.name
  const hasBeforeEnter = to.matched.some(record => record.beforeEnter)

  if (isSameRoute && hasBeforeEnter) {
    const defaultFromQuery = from.meta.defaultQuery

    // Caso for a mesma rota e tenha beforeEnter, necessário setar o to.meta também para não perder os filtros padrões.
    to.meta = { defaultQuery: defaultFromQuery }

    const defaultQueryList = Object.keys(from.meta.defaultQuery || {})
    const defaultQuery = {}

    // Loopa com base na lista de filtros padrões da rota e seto as chaves com os filtros da rota de origem.
    defaultQueryList.forEach(key => {
      defaultQuery[key] = from.query[key]
    })

    const hasQuery = !!Object.keys(to.query).length

    // Se a rota de destino nao tem query, eu redireciono para ela com os filtros padrões aplicados.
    if (!hasQuery) return next({ ...to, query: defaultQuery, replace: true })
  }

  next()
}

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const { addRoute } = useHistory()

    addRoute(to)

    onBeforeEach(to, from, next)
  })
}
