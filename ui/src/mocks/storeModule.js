import user from './json/user.json'
import usersNew from './json/users-new.json'

export default {
  namespaced: true,

  state: {
    list: []
  },

  getters: {
    list: state => state.list,
    byId: state => id => state.list.find(item => item.uuid === id)
  },

  mutations: {
    setList (state, list) {
      state.list = list
    }
  },

  actions: {
    fetchSingle ({ commit }, { url }) {
      if (url.endsWith('new')) {
        return { data: { ...usersNew } }
      }

      const single = { data: { ...user } }

      return single
    },

    create () {
      return {
        data: { status: 200 }
      }
    },

    replace () {
      return {
        data: { status: 200 }
      }
    }
  }
}
