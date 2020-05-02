<template>
  <div class="products-container">
    <div class="product-list">
      <div
        v-for="(product, productIndex) in productList"
        :key="productIndex"
        class="product"
      >
        {{ product.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productList: null
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const response = await this.$axios.$get("/products/");
      this.productList = response.products.data;
    }
  }
};
</script>

<style></style>
