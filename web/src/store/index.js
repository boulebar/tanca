import Vue from 'vue'
import Vuex from 'vuex'
import games from './modules/games'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    games,
    users
  },
  state: {

  },
  mutations: {

  },
  actions: {
    async load({ dispatch }) {
      console.log("loading data")
      dispatch('users/load')
      dispatch('games/load')
    }
  }
})
