<template>
  <div class="container">
    <Header title="Connect or register" />
    <login
      v-if="isLoginDisplayed"
      @switchCase="isLoginDisplayed = !isLoginDisplayed"
    />
    <signup v-else @switchCase="isLoginDisplayed = !isLoginDisplayed" />
  </div>
</template>

<script>
import login from "~/components/auth/login";
import signup from "~/components/auth/signup";
import Header from "~/components/header";

export default {
  middleware: "auth/isConnected",
  components: {
    login,
    signup,
    Header
  },
  data() {
    return {
      isLoginDisplayed: true
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 700px;
}
</style>
