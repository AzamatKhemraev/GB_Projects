export default Vue.component('cart-item', {
  data() {
    return {
      API_URL: 'http://localhost:3000',
    }
  },

  props: ['cartList'],

  template: /* HTML */ `
    <div class="cart-item">
      <h3>{{cartList.product_name}}(<span class="quantity">{{cartList.quantity}}</span>)</h3>
      <p>{{cartList.price}}</p>
      <button class="add__btn" @click.prevent="removeProduct"><i class="far fa-trash-alt"></i></button>
    </div>
  `,

  methods: {
    async removeProduct() {
      const response = await fetch(`${this.API_URL}/removeFromCart`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(this.cartList),
      })
    },
  },
})
