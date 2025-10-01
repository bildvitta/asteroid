import { computed, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useHistory from './use-history'

export default function useOverlayNavigation () {
  const route = useRoute()
  const router = useRouter()

  const { hasPreviousRoute } = useHistory()

  const backgroundRoute = computed(() => route.meta.backgroundRoute || {})

  const isOverlay = inject('isOverlay', false)
  const isBackgroundOverlay = computed(() => !isOverlay && route.query.overlay === 'true')
  const hasOverlay = computed(() => route.query.overlay === 'true')

  const defaultRoute = computed(() => isBackgroundOverlay.value ? backgroundRoute.value : route)

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
  }

  async function expandToFullPage () {
    if (!hasOverlay.value) return

    const query = { ...route.query }

    delete query.overlay
    delete query.backgroundOverlay

    await router.push({ ...route, query })
  }

  return {
    route: defaultRoute,
    isOverlay,
    getRoute,
    hasPreviousRoute,
    backgroundRoute,
    isBackgroundOverlay,
    closeOverlay,
    expandToFullPage
  }
}
