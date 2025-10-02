import { computed, inject, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

/**
 * Histórico de navegação utilizado para controlar o histórico de rotas quando em um overlay.
 * Obs: Esse histórico é resetado sempre que o overlay é fechado ou expandido para tela cheia.
 * Obs2: Esse histórico não é persistido, ou seja, ao recarregar a página ele é perdido.
 * Obs3: Esse histórico é compartilhado entre todas as instâncias que utilizam o useOverlayNavigation,
 * por isso declara fora da função.
 */
const historyRoute = ref({
  history: [],
  nextStack: [],
  currentIndex: -1
})

export default function useOverlayNavigation () {
  // composables
  const route = useRoute()
  const router = useRouter()

  /**
   * Retorna "true" quando for chamado em uma pagina que está sendo exibida em um overlay.
   */
  const isOverlay = inject('isOverlay', false)

  // computeds
  /**
   * Rota que está sendo exibida embaixo do overlay.
   */
  const backgroundRoute = computed(() => route.meta.backgroundRoute || {})

  /**
   * Retorna "true" quando for chamado em uma pagina que está sendo exibida abaixo de um overlay.
   * Esta propriedade só funciona quando o componente pai não é um overlay.
   */
  const isBackgroundOverlay = computed(() => !isOverlay && route.query.overlay === 'true')

  /**
   * Retorna "true" quando a rota atual está em um overlay, não necessariamente sendo o overlay ou background.
   */
  const hasOverlay = computed(() => route.query.overlay === 'true')

  /**
   * Computada para ser utilizada tanto no background quanto no overlay, substituindo o uso padrão do "route".
   */
  const defaultRoute = computed(() => isBackgroundOverlay.value ? backgroundRoute.value : route)

  /**
   * Indica se existe uma rota anterior no histórico de navegação.
   */
  const hasPreviousRoute = computed(() => historyRoute.value.currentIndex > 0)

  /**
   * Indica se existe uma rota posterior no histórico de navegação.
   */
  const hasNextRoute = computed(() => historyRoute.value.currentIndex < historyRoute.value.history.length - 1)

  // functions
  /**
   * Retorna a rota normalizada para ser usada com overlay.
   * Obs: Sempre utilize essa função para navegar entre rotas que precisam do overlay.
   *
   * @param {import('vue-router').RouteLocationNormalized} externalRoute
   * @param {boolean=true} useOverlay
   * @return {import('vue-router').RouteLocationNormalized}
   */
  function getRoute (externalRoute, useOverlay = true) {
    return {
      ...externalRoute,
      query: {
        ...externalRoute.query,
        overlay: useOverlay,
        ...(!isOverlay.value && { backgroundOverlay: encodeURIComponent(route.fullPath) }),
        ...(route.query.backgroundOverlay && { backgroundOverlay: route.query.backgroundOverlay })
      }
    }
  }

  /**
   *
   * Função para fechar o overlay, removendo as queries e redirecionando para a rota de background.
   */
  function closeOverlay () {
    if (!hasOverlay.value) return

    const query = { ...route.query }

    delete query.overlay
    delete query.backgroundOverlay

    router.push({ path: backgroundRoute.value.path, query })

    resetHistory()
  }

  /**
   * Função para expandir o overlay para tela cheia, removendo as queries e redirecionando para a rota atual.
   * Obs: Essa função não funciona se o componente atual não estiver em um overlay.
   */
  async function expandToFullPage () {
    if (!hasOverlay.value) return

    const query = { ...route.query }

    delete query.overlay
    delete query.backgroundOverlay

    await router.push({ ...route, query })

    resetHistory()
  }

  /**
   * Adiciona uma rota ao histórico de navegação.
   *
   * @param {import('vue-router').RouteLocationNormalized} to
   * @param {import('vue-router').RouteLocationNormalized} from
   */
  function addRouteToHistory (to, from) {
    if (to.fullPath === from.fullPath || to.query.overlay !== 'true') return

    const currentRoute = {
      name: to.name,
      params: to.params || {},
      fullPath: to.fullPath,
      path: to.path,
      query: to.query
    }

    // Se estamos navegando para uma rota que já existe no histórico
    const existsInHistoryList = historyRoute.value.history.findIndex(item => item.fullPath === to.fullPath)

    if (existsInHistoryList !== -1) {
      // Se a rota existe no histórico, apenas atualize o currentIndex
      historyRoute.value.currentIndex = existsInHistoryList
      return
    }

    // Verifica se estamos navegando "para frente" (clicando em uma rota do nextStack)
    const isNavigatingForward = (
      historyRoute.value.currentIndex < historyRoute.value.history.length - 1 &&
      historyRoute.value.history[historyRoute.value.currentIndex + 1]?.fullPath === to.fullPath
    )

    if (isNavigatingForward) {
      // Se estamos navegando para frente, apenas avance o índice
      historyRoute.value.currentIndex++
      return
    }

    // Se chegamos aqui, é uma nova navegação, então remove todas as rotas "futuras" (simula o comportamento do browser)
    if (historyRoute.value.currentIndex < historyRoute.value.history.length - 1) {
      historyRoute.value.history.splice(historyRoute.value.currentIndex + 1)
    }

    // Adiciona a nova rota ao histórico
    historyRoute.value.history.push(currentRoute)
    historyRoute.value.currentIndex = historyRoute.value.history.length - 1
  }

  /**
   * Reseta o histórico de navegação.
   */
  function resetHistory () {
    historyRoute.value.currentIndex = -1
    historyRoute.value.nextStack = []
    historyRoute.value.history = []
  }

  /**
   * Navega para a rota anterior no histórico de navegação, se não houver rota anterior, a função não faz nada.
   */
  function goBack () {
    if (!hasPreviousRoute.value) return

    historyRoute.value.currentIndex--
    const targetRoute = historyRoute.value.history[historyRoute.value.currentIndex]

    if (targetRoute) {
      router.push(targetRoute)
    }
  }

  /**
   * Navega para a próxima rota no histórico de navegação, se não houver próxima rota, a função não faz nada.
   */
  function goForward () {
    if (!hasNextRoute.value) return

    historyRoute.value.currentIndex++
    const targetRoute = historyRoute.value.history[historyRoute.value.currentIndex]

    if (targetRoute) {
      router.push(targetRoute)
    }
  }

  return {
    route: defaultRoute.value,
    isOverlay,
    historyRoute,
    hasNextRoute,
    hasPreviousRoute,
    addRouteToHistory,
    goBack,
    goForward,
    getRoute,
    backgroundRoute,
    isBackgroundOverlay,
    closeOverlay,
    expandToFullPage
  }
}
