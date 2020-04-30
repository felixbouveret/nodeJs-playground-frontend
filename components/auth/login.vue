<template>
  <form @submit.prevent="login">
    <h3>Login</h3>
    <TextFormEmail
      v-model="email"
      class="form-cell"
      id="login-email"
      placeholder="File in your email"
      label="Email :"
    />
    <TextFormPassword
      v-model="password"
      class="form-cell"
      id="login-password"
      placeholder="File in your password"
      label="Password :"
    />
    <div class="button-container">
      <Button type="submit" text="Login" />
      <button @click="$emit('switchCase')" class="signInButton" type="button">
        Sign In
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import TextFormPassword from "~/components/commons/TextFormPassword";
import TextFormEmail from "~/components/commons/TextFormEmail";
import Button from "~/components/commons/Button";

export default {
  components: {
    TextFormPassword,
    TextFormEmail,
    Button
  },
  data() {
    return {
      email: null,
      password: null,
      message: null
    };
  },
  methods: {
    ...mapActions({
      connectUser: "connectUser"
    }),
    async login() {
      await this.$axios
        .$post("http://localhost:8080/users/login/", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.$axios.setToken(res.token, "Bearer");
          this.$cookies.set("auth", res.token, {
            path: "/",
            maxAge: 60 * 60 * 24
          });
          this.$cookies.set("userId", res.userId, {
            path: "/",
            maxAge: 60 * 60 * 24
          });
          this.connectUser(res.userId);
          this.$router.push("/todo_list");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  border: 2px solid white;
  padding: 24px;
  width: 95%;
  max-width: 400px;
  margin: 8px;
}

.form-cell {
  margin-top: 16px;
}

.button-container {
  margin-top: 24px;

  .signInButton {
    background-color: transparent;
    text-decoration: underline;
    color: white;
    border: 0;
    font-size: 1rem;

    &:focus {
      outline: none;
      text-decoration: none;
    }
  }
}
</style>
