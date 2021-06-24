const app = new Vue({
  el: '#app',
  data: {
    products: [],
    filteredProducts: [],
    cart: [],
    isVisibleCart: true,
    isError: false,
    API_URL: 'http://localhost:3000',
  },

  methods: {
    async getProducts() {
      const responce = await fetch(`${this.API_URL}/catalog`)
      if (responce.ok) {
        const catalogItems = await responce.json()
        this.products = catalogItems
        this.filteredProducts = catalogItems
      } else {
        this.isError = true
        alert('Ошибка при соединении с сервером')
      }
    },

    async getCart() {
      const responce = await fetch(`${this.API_URL}/cart`)
      if (responce.ok) {
        const cartJSON = await responce.json()
        this.cart = cartJSON
      }
    },

    filterProducts(search) {
      if (search == '') {
        this.filteredProducts = this.products
      } else {
        this.filteredProducts = this.products.filter((elem) => elem.product_name == search)
      }
    },

    getCartList(cart) {
      if (cart.length == 0) {
        return alert('Корзина пуста')
      }
    },
  },

  async mounted() {
    await this.getProducts()
    await this.getCart()
  },
})

export default {
  app: app,
}
