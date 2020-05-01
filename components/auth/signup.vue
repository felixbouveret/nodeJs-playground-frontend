<template>
  <form @submit.prevent="signUp">
    <h3>Sign up</h3>
    <TextForm
      v-model="name"
      class="form-cell"
      id="signup-name"
      placeholder="File in your name"
      label="Name :"
    />
    <TextFormEmail
      v-model="email"
      class="form-cell"
      id="signup-email"
      placeholder="File in your email"
      label="Email :"
    />
    <TextFormPassword
      v-model="password"
      class="form-cell"
      id="signup-password"
      placeholder="File in your password"
      label="Password :"
    />
    <div class="button-container">
      <Button type="submit" text="Signup" />
      <button @click="$emit('switchCase')" class="signInButton" type="button">
        Login
      </button>
      <span>
        {{ message }}
      </span>
    </div>
  </form>
</template>

<script>
import TextFormPassword from "~/components/commons/TextFormPassword";
import TextFormEmail from "~/components/commons/TextFormEmail";
import TextForm from "~/components/commons/TextForm";
import Button from "~/components/commons/Button";

export default {
  components: {
    TextFormPassword,
    TextFormEmail,
    TextForm,
    Button
  },
  data() {
    return {
      email: null,
      password: null,
      name: null,
      message: null
    };
  },
  methods: {
    async signUp() {
      await this.$axios
        .$post("users/signup/", {
          email: this.email,
          name: this.name,
          password: this.password
        })
        .then(res => {
          this.message = res.message;
        })
        .catch(error => {
          this.message = error.data.message;
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
