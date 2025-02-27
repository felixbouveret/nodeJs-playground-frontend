import getInitialState from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state: getInitialState,
  mutations,
  actions,
  getters
};
