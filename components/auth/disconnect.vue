<template>
  <div>
    <Button @click="disconnect" text="Disconnect" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Button from "~/components/commons/Button";

export default {
  components: {
    Button
  },
  methods: {
    ...mapActions({
      disconnectUser: "disconnectUser"
    }),
    disconnect() {
      this.$axios.setToken(false);
      this.disconnectUser();
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
