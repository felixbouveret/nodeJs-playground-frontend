<template>
  <button
    @click="$emit('click')"
    class="DsButton"
    :type="type"
    :disabled="isDisabled"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button"
    },
    text: {
      type: String,
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style></style>
