<template>
  <PopupContainer @close="$emit('close')">
    <form @submit.prevent="modify">
      <h3>Modify</h3>
      <TextForm
        v-model="name"
        class="form-cell"
        id="modify-name"
        placeholder="File in your name"
        label="Name :"
      />
      <TextFormEmail
        v-model="email"
        class="form-cell"
        id="modify-email"
        placeholder="File in your email"
        label="Email :"
      />
      <div class="button-container">
        <Button type="submit" text="Modify" />
        <span>
          {{ message }}
        </span>
      </div>
    </form>
  </PopupContainer>
</template>

<script>
import { mapState } from "vuex";
import PopupContainer from "~/components/commons/Popup";
import TextFormPassword from "~/components/commons/TextFormPassword";
import TextFormEmail from "~/components/commons/TextFormEmail";
import TextForm from "~/components/commons/TextForm";
import Button from "~/components/commons/Button";

export default {
  components: {
    TextFormPassword,
    TextFormEmail,
    TextForm,
    Button,
    PopupContainer
  },
  data() {
    return {
      email: null,
      name: null,
      message: null
    };
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  methods: {
    async modify() {
      await this.$axios
        .$put("users/modify/", {
          userId: this.userId,
          email: this.email,
          name: this.name
        })
        .then(res => {
          this.message = res.message;
          this.$emit("close");
        })
        .catch(error => {
          this.message = error.data.message;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
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
