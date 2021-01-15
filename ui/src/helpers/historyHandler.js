import Vue from 'vue'

const history = Vue.observable({
  hasPreviousRoute: false,
  list: []
})

function pushHandler (route) {
  const routeExistsInList = history.list.find(item => item.name === route.name)

  if (routeExistsInList) { return null }

  history.list.push(route)

  history.hasPreviousRoute = history.list.length > 1
}

function handleHistory () {
  return {
    push (route) {
      pushHandler(route)
    },

    getPreviousRoute (currentRoute) {
      const index = history.list.findIndex(item => item.name === currentRoute.name)

      if (~index) {
        history.list.splice(index, 1)
      }

      history.hasPreviousRoute = history.list.length > 1

      return history.list[history.list.length - 1]
    }
  }
}

export {
  history,
  handleHistory
}
