<template>
  <div v-if="!isConnected" class="container">
    <login
      v-if="isLoginDisplayed"
      @switchCase="isLoginDisplayed = !isLoginDisplayed"
    />
    <signup v-else @switchCase="isLoginDisplayed = !isLoginDisplayed" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import login from "~/components/auth/login";
import signup from "~/components/auth/signup";

export default {
  middleware: "auth/isConnected",
  components: {
    login,
    signup
  },
  data() {
    return {
      isLoginDisplayed: true
    };
  },
  computed: {
    ...mapState({
      isConnected: state => state.connected
    })
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}
span {
  width: 100%;
  text-align: center;
}
</style>
