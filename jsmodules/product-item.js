export default Vue.component('product-item', {
  data() {
    return {
      API_URL: 'http://localhost:3000',
    }
  },

  props: ['productsList'],

  template: /* HTML */ `
    <div class="products-item">
      <h3>{{productsList.product_name}}</h3>
      <p>{{productsList.price}}</p>
      <button class="add__btn" @click.prevent="addToCart"><i class="far fa-plus-square"></i></button>
    </div>
  `,

  methods: {
    async addToCart() {
      const response = await fetch(`${this.API_URL}/addToCart`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(this.productsList),
      })
    },
  },
})
