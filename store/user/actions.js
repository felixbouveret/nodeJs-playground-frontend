export default {
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
    this.$router.push("/login");
  }
};
