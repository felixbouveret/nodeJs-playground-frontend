import Vuex from "vuex";
import user from "./user";

export default () => {
  return new Vuex.Store({
    actions: {
      nuxtServerInit({ dispatch }) {
        let auth = this.$cookies.get("auth");
        if (auth) {
          this.$axios.setToken(auth.token, "Bearer");
          dispatch("user/connectUser", auth.userId);
        }
      }
    },
    modules: {
      user
    }
  });
};
