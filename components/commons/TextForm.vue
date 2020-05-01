<template>
  <div class="DsTextFormContainer">
    <label :for="id">{{ label }}</label>
    <input
      v-model.trim="computedValue"
      type="text"
      :id="id"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    }
  }
};
</script>

<style></style>
