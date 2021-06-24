// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
const API_URL = 'http://localhost:3000'

Vue.component('products-list', {
  props: ['products'],
  template: /*HTML*/ `
    <div class="products-list">
      <product-item v-for="product in products" :productsList="product"></product-item>
    </div>
  `,
})

Vue.component('product-item', {
  data() {
    return {}
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
      const response = await fetch(`${API_URL}/addToCart`, {
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

Vue.component('cart-list', {
  props: ['cart'],
  template: /*HTML*/ `
    <div class="cart-list">
      <cart-item v-for="product in cart" :cartList="product"></cart-item>
    </div>
  `,
})

Vue.component('cart-item', {
  data() {
    return {}
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
      const response = await fetch(`${API_URL}/removeFromCart`, {
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

Vue.component('search', {
  data() {
    return {
      search: '',
    }
  },
  template: /*HTML*/ `
    <div>
        <input type="text" class="products-search"  v-model="search"/>
        <button class="search-button" type="button" @click="searching">Искать</button>
    </div>
    `,

  methods: {
    searching() {
      this.$emit('searching', this.search)
    },

    getcartlist() {
      this.$emit('getcartlist', this.cartList)
    },
  },
})

Vue.component('cart', {
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

Vue.component('error', {
  props: ['is-error'],
  template: `<h1 v-show="isError">Не удалось выполнить запрос к серверу</h1>`,
})

const app = new Vue({
  el: '#app',
  data: {
    products: [],
    filteredProducts: [],
    cart: [],
    isVisibleCart: true,
    isError: false,
  },

  methods: {
    async getProducts() {
      const responce = await fetch(`${API_URL}/catalog`)
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
      const responce = await fetch(`${API_URL}/cart`)
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
