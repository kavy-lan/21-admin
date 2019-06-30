import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  username: ''
}
const mutations = {
  setName: (state, name) => {
    state.username = name
    localStorage.setItem('username', name)
  }
}
const actions = {}
const getters = {
  getterName: state => localStorage.getItem('username')
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions

})
