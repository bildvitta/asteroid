import user from './json/user.json'
import users from './json/users.json'
import usersNew from './json/users-new.json'

export default {
  namespaced: true,

  state: {
    list: []
  },

  getters: {
    byId: state => id => state.list.find(item => item.uuid === id),
    list: state => state.list
  },

  mutations: {
    setList (state, list) {
      state.list = list
    },

    setSingle (state, single) {
      const index = state.list.findIndex(item => item.uuid === single.uuid)
      ~index ? state.list.splice(index, 1, single) : state.list.push(single)
    }
  },

  actions: {
    create () {
      return {
        data: { status: 200 }
      }
    },

    fetchList ({ commit }) {
      const list = { data: { ...users } }

      commit('setList', list.data.results)
      return list
    },

    fetchSingle ({ commit }, { url }) {
      if (url.endsWith('new')) {
        return { data: { ...usersNew } }
      }

      const single = { data: { ...user } }

      commit('setSingle', user.result)
      return single
    },

    replace () {
      return {
        data: { status: 200 }
      }
    }
  }
}
