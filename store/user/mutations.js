export default {
  SET_USER_ID(state, userId) {
    state.userId = userId;
  },
  SET_CONNECTION(state, isConnected) {
    state.connected = isConnected;
  }
};
