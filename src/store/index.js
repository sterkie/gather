import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import event from "./event";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user: user,
    event: event
  },
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    clearError({ commit }) {
      commit("clearError");
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  }
});
