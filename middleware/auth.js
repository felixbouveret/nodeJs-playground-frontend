export default ({ store, $axios, redirect }) => {
  if (store.state.connected) {
    $axios
      .$post("http://localhost:8080/users/verify")
      .then(() => {
        return redirect("/todo_list");
      })
      .catch(e => {
        store.dispatch("disconnectUser");
        return redirect("/");
      });
  } else {
    return redirect("/");
  }
};
