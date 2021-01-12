import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import jwtUtils from '../utils'


export default new Vuex.Store({
  state: {
    currentJwt: null
  },
  mutations: {
    SET_JWT(state, jwt) {
      state.currentJwt = jwt;
    },
    DESTROY_JWT(state) {
      state.currentJwt = null;
    }
  },
  actions: {
  },
  getters: {
    currentJwt(state) {
      return state.currentJwt;
    },
    isAdmin(state) {
      if(state.currentJwt == null) {
        return false;
      }
      return jwtUtils.getUserType(state.currentJwt) == "ADMIN";
    }
  },
  modules: {
  }
})
