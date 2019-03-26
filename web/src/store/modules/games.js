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
  //     store.commit('SET_GAMES', categories)
  //   }
  // },
  async load ({ commit }) {
    const response = await axios.get('/games')
    commit('SET_GAMES', response.data)
  },
  async create ({ commit }, game) {
    await axios.post('/games', game)
    // commit('SET_GAMES', game)
  }
}

// mutations
const mutations = {
  SET_GAMES (state, games) {
    state.all = games
    state.loaded = true
    // localStorage.setItem("games/all", JSON.stringify(state.all))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

