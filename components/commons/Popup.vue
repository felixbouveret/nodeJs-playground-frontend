<template>
  <div class="popup-container">
    <div class="popup-frame">
      <slot />
    </div>
    <div @click="$emit('close')" class="backdrop"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.popup-container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .popup-frame {
    border: 2px solid white;
    background-color: black;
    padding: 24px;
    width: 95%;
    max-width: 400px;
    margin: 8px;
  }

  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: rgba($color: #000000, $alpha: 0.6);
  }
}
</style>
