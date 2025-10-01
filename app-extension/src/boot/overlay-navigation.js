import useOverlayNavigation from '@bildvitta/quasar-ui-asteroid/src/composables/use-overlay-navigation.js'

export default async function ({ router }) {
  router.beforeEach((to, from, next) => onBeforeEach(to, from, next, router))
}

async function onBeforeEach (to, from, next, router) {
  const useOverlay = to.matched.some(item => item.meta.useOverlay)

  if (!useOverlay) return next()

  const { addRouteToHistory } = useOverlayNavigation()

  addRouteToHistory(to, from)

  const lastToMatchedIndex = to.matched.length - 1

  const { overlay, default: defaultComponent } = to.matched[lastToMatchedIndex]?.components || {}

  const overlayComponent = await getResolvedComponent(overlay || defaultComponent)

  if (to.query.overlay === 'true') {
    const backgroundResult = await getBackgroundComponent()

    if (backgroundResult) {
      const { component: backgroundComponent, resolvedRoute } = backgroundResult

      to.meta.backgroundRoute = {
        name: resolvedRoute?.name,
        params: resolvedRoute?.params || {},
        fullPath: resolvedRoute?.fullPath,
        path: resolvedRoute?.path,
        query: resolvedRoute?.query || {}
      }

      to.matched[lastToMatchedIndex].components = {
        default: backgroundComponent,
        overlay: overlayComponent
      }
    }
  } else {
    to.matched[lastToMatchedIndex].components = {
      default: overlayComponent
    }
  }

  next()

  // functions
  function getComponentByRoute (route) {
    const lastIndex = route.matched.length - 1

    const component = route.matched[lastIndex]?.components?.default || route.matched[lastIndex]?.component

    return getResolvedComponent(component)
  }

  function getResolvedComponent (component) {
    return new Promise((resolve, reject) => {
      if (typeof component === 'function') {
        component().then(module => resolve(module.default)).catch(error => reject(error))
      } else {
        resolve(component)
      }
    })
  }

  async function getBackgroundComponent () {
    const backgroundPath = to.query.backgroundOverlay

    if (backgroundPath) {
      try {
        const resolvedRoute = router.resolve(decodeURIComponent(backgroundPath))

        const component = await getComponentByRoute(resolvedRoute)

        if (component) {
          return { component, resolvedRoute }
        }
      } catch {
        return null
      }
    }

    // 2. Fallback: meta da rota atual
    const backgroundOverlayName = to.meta?.backgroundOverlayName

    if (backgroundOverlayName) {
      try {
        const resolvedRoute = router.resolve({ name: backgroundOverlayName })

        const component = await getComponentByRoute(resolvedRoute)

        return {
          component,
          resolvedRoute: {
            ...resolvedRoute,
            query: to.query,
            params: {
              ...to.params,
              ...resolvedRoute.params
            }
          }
        }
      } catch {
        return null
      }
    }

    // 3. Fallback automático: rota base
    const segments = to.path.split('/').filter(Boolean)
    if (segments.length >= 2) {
      const basePath = `/${segments[0]}`

      try {
        const resolvedRoute = router.resolve(basePath)
        const component = await getComponentByRoute(resolvedRoute)

        if (component) {
          return {
            component,
            resolvedRoute: {
              ...resolvedRoute,
              query: to.query,
              params: {
                ...to.params,
                ...resolvedRoute.params
              }
            }
          }
        }
      } catch {
        return null
      }
    }

    // 4. Fallback final
    if (!from.name) return { component: overlayComponent, resolvedRoute: to }

    return null
  }
}
