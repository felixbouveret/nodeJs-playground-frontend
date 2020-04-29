import Vuex from "vuex";

export default () => {
  return new Vuex.Store({
    state: {
      userId: null,
      connected: false
    },

    mutations: {
      SET_USER_ID(state, userId) {
        state.userId = userId;
      },
      SET_CONNECTION(state, isConnected) {
        state.connected = isConnected;
      }
    },
    actions: {
      nuxtServerInit({ commit }) {
        let auth = this.$cookies.get("auth");
        if (auth) {
          this.$axios.setToken(auth, "Bearer");
          commit("SET_CONNECTION", true);
        }
      },

      connectUser({ commit }, userId) {
        commit("SET_USER_ID", userId);
        commit("SET_CONNECTION", true);
      },

      disconnectUser({ commit }) {
        this.$cookies.remove("auth");
        commit("SET_USER_ID", null);
        commit("SET_CONNECTION", false);
      }
    }
  });
};
