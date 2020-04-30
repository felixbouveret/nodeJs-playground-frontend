export default ({ store, redirect }) => {
  if (store.state.connected) {
    redirect("/todo_list");
  }
};
