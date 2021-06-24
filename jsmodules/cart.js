export default Vue.component('cart', {
  data() {
    return {
      cartList: [],
    }
  },

  template: /*HTML*/ `
    <button class="cart-button" type="button" @click="getcartlist">Корзина</button>
  `,

  methods: {
    getcartlist() {
      this.$emit('getcartlist', this.cartList)
    },
  },
})
