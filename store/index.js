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
      nuxtServerInit({ dispatch }) {
        let auth = this.$cookies.get("auth");
        let userId = this.$cookies.get("userId");
        if (auth) {
          this.$axios.setToken(auth.token, "Bearer");
          dispatch("connectUser", userId);
        }
      },

      connectUser({ commit }, userId) {
        commit("SET_USER_ID", userId);
        commit("SET_CONNECTION", true);
      },

      disconnectUser({ commit }) {
        this.$cookies.remove("auth");
        this.$cookies.remove("userId");
        this.$axios.setToken(false);
        commit("SET_USER_ID", null);
        commit("SET_CONNECTION", false);
        this.$router.push("/");
      }
    }
  });
};
