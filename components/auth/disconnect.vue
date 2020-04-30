<template>
  <section class="disconnect">
    <div class="inner">
      <Button @click="disconnectUser" text="Disconnect" />
    </div>
  </section>
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
    })
  }
};
</script>

<style></style>
