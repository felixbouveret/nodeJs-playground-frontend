<template>
  <section>
    <h1>Todo List</h1>
    <disconnect />
  </section>
</template>

<script>
import disconnect from "~/components/auth/disconnect";
export default {
  middleware: "auth",
  components: {
    disconnect
  }
};
</script>

<style></style>
