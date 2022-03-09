import { reactive } from 'vue'
import { findLastIndex } from 'lodash-es'

const history = reactive({ hasPreviousRoute: false, list: [] })

function getPreviousRoute (currentRoute) {
  const index = findLastIndex(history.list, item => item.name === currentRoute.name)

  if (~index) {
    history.list.splice(index, 1)
  }

  history.hasPreviousRoute = history.list.length > 1
  return history.list[history.list.length - 1]
}

function addRoute (route) {
  const routeExistsInList = history.list?.[history.list?.length - 1]?.name === route.name

  if (routeExistsInList) return

  history.list.push(route)
  history.hasPreviousRoute = history.list.length > 1
}

function destroyRoutes (routes) {
  if (!history.list.length) return null

  routes.forEach(route => {
    const index = history.list.findIndex(item => item.name === route)

    if (~index) {
      history.list.splice(index, 1)
    }
  })
}

export {
  history,
  getPreviousRoute,
  addRoute,
  destroyRoutes
}
