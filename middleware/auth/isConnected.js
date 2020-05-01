export default ({ store, redirect }) => {
  if (store.state.user.connected) {
    redirect("/");
  }
};
