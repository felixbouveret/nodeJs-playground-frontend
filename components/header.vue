<template>
  <header>
    <div class="inner">
      <h1>{{ title }}</h1>
      <Button
        v-if="isConnected"
        type="button"
        @click="this.disconnectUser"
        text="Disconnect"
      />
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Button from "~/components/commons/Button";
export default {
  components: {
    Button
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      disconnectUser: "disconnectUser"
    })
  },
  computed: {
    ...mapState({
      isConnected: state => state.connected
    })
  }
};
</script>

<style lang="scss" scoped>
header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
  }
}
</style>
