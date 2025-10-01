import { computed, inject, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const historyRoute = ref({
  history: [],
  nextStack: [],
  currentIndex: -1
})

export default function useOverlayNavigation () {
  const route = useRoute()
  const router = useRouter()

  const backgroundRoute = computed(() => route.meta.backgroundRoute || {})

  const isOverlay = inject('isOverlay', false)
  const isBackgroundOverlay = computed(() => !isOverlay && route.query.overlay === 'true')
  const hasOverlay = computed(() => route.query.overlay === 'true')

  const defaultRoute = computed(() => isBackgroundOverlay.value ? backgroundRoute.value : route)

  const hasPreviousRoute = computed(() => historyRoute.value.currentIndex > 0)
  const hasNextRoute = computed(() => historyRoute.value.currentIndex < historyRoute.value.history.length - 1)

  // functions
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

  function closeOverlay () {
    if (!hasOverlay.value) return

    const query = { ...route.query }

    delete query.overlay
    delete query.backgroundOverlay

    router.push({ path: backgroundRoute.value.path, query })

    resetHistory()
  }

  async function expandToFullPage () {
    if (!hasOverlay.value) return

    const query = { ...route.query }

    delete query.overlay
    delete query.backgroundOverlay

    await router.push({ ...route, query })

    resetHistory()
  }

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
    console.log('TCL: addRouteToHistory -> existsInHistoryList', existsInHistoryList)

    if (existsInHistoryList !== -1) {
      // Se a rota existe no histórico, apenas atualize o currentIndex
      historyRoute.value.currentIndex = existsInHistoryList
      return
    }

    // Verifica se estamos navegando "para frente" (clicando em uma rota do nextStack)
    const isNavigatingForward = historyRoute.value.currentIndex < historyRoute.value.history.length - 1 &&
      historyRoute.value.history[historyRoute.value.currentIndex + 1]?.fullPath === to.fullPath

    if (isNavigatingForward) {
      // Se estamos navegando para frente, apenas avance o índice
      historyRoute.value.currentIndex++
      return
    }

    // Se chegamos aqui, é uma nova navegação
    // Remove todas as rotas "futuras" (simula o comportamento do browser)
    if (historyRoute.value.currentIndex < historyRoute.value.history.length - 1) {
      historyRoute.value.history.splice(historyRoute.value.currentIndex + 1)
    }

    // Adiciona a nova rota ao histórico
    historyRoute.value.history.push(currentRoute)
    historyRoute.value.currentIndex = historyRoute.value.history.length - 1
  }

  function resetHistory () {
    historyRoute.value.currentIndex = -1
    historyRoute.value.nextStack = []
    historyRoute.value.history = []
  }

  function goBack () {
    if (!hasPreviousRoute.value) return

    historyRoute.value.currentIndex--
    const targetRoute = historyRoute.value.history[historyRoute.value.currentIndex]

    if (targetRoute) {
      router.push(targetRoute)
    }
  }

  function goForward () {
    if (!hasNextRoute.value) return

    historyRoute.value.currentIndex++
    const targetRoute = historyRoute.value.history[historyRoute.value.currentIndex]

    if (targetRoute) {
      router.push(targetRoute)
    }
  }

  return {
    route: defaultRoute,
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
