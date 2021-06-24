export default Vue.component('products-list', {
  props: ['products'],
  template: /*HTML*/ `
    <div class="products-list">
      <product-item v-for="product in products" :productsList="product"></product-item>
    </div>
  `,
})
