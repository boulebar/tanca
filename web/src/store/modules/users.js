import axios from 'axios'

const state = {
  all: [],
  loaded: false
}

// getters
const getters = {}

// actions
const actions = {
  // init(store) {
  //   const categories = JSON.parse(localStorage.getItem('categories/all') || [])
  //   console.log('init categories store', categories)
  //   if(categories.length > 0) {
  //     store.commit('SET_USERS', categories)
  //   }
  // },
  async load ({ commit }) {
    const response = await axios.get('/users')
    commit('SET_USERS', response.data)
  },
  async create ({ commit }, user) {
    const response = await axios.post('/users', user)
    commit('ADD_USER', response.data)
  }
}

// mutations
const mutations = {
  SET_USERS (state, users) {
    // Just copy the current ranking, for testing purposes.
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      user.baseRanking = user.ranking
    }
    state.all = users
    state.loaded = true
    // localStorage.setItem("users/all", JSON.stringify(state.all))
  },
  ADD_USER (stae, user) {
    user.baseRanking = user.ranking
    state.all.push(user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

