export default Vue.component('cart-list', {
  props: ['cart'],
  template: /*HTML*/ `
    <div class="cart-list">
      <cart-item v-for="product in cart" :cartList="product"></cart-item>
    </div>
  `,
})
