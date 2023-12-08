import { reactive, computed } from 'vue'

const history = reactive({ list: [] })

export default function () {
  const hasPreviousRoute = computed(() => history.list.length > 1)

  function getPreviousRoute (currentRoute) {
    const index = history.list.findLastIndex(item => item.name === currentRoute.name)

    if (~index) {
      history.list.splice(index, 1)
    }

    return history.list.at(-1)
  }

  function addRoute (route) {
    const lastRoute = history.list?.at(-1)
    const routeExistsInList = lastRoute?.fullPath === route.fullPath

    if (routeExistsInList) return

    history.list.push(route)
  }

  function destroyRoutes (routes) {
    if (!history.list.length) return null

    routes.forEach(route => {
      const index = history.list.findIndex(item => item.name === route.name)

      if (~index) {
        history.list.splice(index, 1)
      }
    })
  }

  return {
    history,
    hasPreviousRoute,
    getPreviousRoute,
    addRoute,
    destroyRoutes
  }
}
