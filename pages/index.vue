<template>
  <div class="todo-list">
    <Header title="Welcome" />
    <profile :user="user" />
  </div>
</template>

<script>
import profile from "~/components/profile";
import Header from "~/components/header";

export default {
  middleware: "auth/isNotConnected",
  components: {
    profile,
    Header
  },
  async asyncData({ store, $axios }) {
    const userId = store.state.userId;
    let user;
    await $axios
      .$get("users/basic-infos")
      .then(res => {
        user = res.userBasic;
      })
      .catch(e => console.log(e));
    return { user };
  }
};
</script>

<style lang="scss" scoped>
.todo-list {
  padding: 64px 0;
  h1 {
    font-size: 32px;
  }
}
</style>
