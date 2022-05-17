import { reactive, computed } from 'vue'
import { findLastIndex } from 'lodash-es'

const history = reactive({ list: [] })

export default function () {
  const hasPreviousRoute = computed(() => history.list.length > 1)

  function getPreviousRoute (currentRoute) {
    const index = findLastIndex(history.list, item => item.name === currentRoute.name)

    if (~index) {
      history.list.splice(index, 1)
    }

    return history.list[history.list.length - 1]
  }

  function addRoute (route) {
    const routeExistsInList = history.list?.[history.list?.length - 1]?.name === route.name

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
