const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

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

Vue.component('cart-body', {
  data() {
    return {}
  },

  props: ['show'],

  template: /* HTML */ ` <div class="cart-body" v-show="show"></div> `,
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
    // cartList: [],
    // searchLine: '',
    isVisibleCart: false,
    isError: false,
  },

  methods: {
    async getProducts() {
      const responce = await fetch(`${API_URL}/catalogData.json`)
      if (responce.ok) {
        const catalogItems = await responce.json()
        this.products = catalogItems
        this.filteredProducts = catalogItems
      } else {
        this.isError = true
        alert('Ошибка при соединении с сервером')
      }
    },

    filterProducts(search) {
      if (search == '') {
        this.filteredProducts = this.products
      } else {
        this.filteredProducts = this.products.filter((elem) => elem.product_name == search)
      }
    },

    getCartList(cartList) {
      if (cartList.length == 0) {
        return alert('Корзина пуста')
      }
    },
  },

  async mounted() {
    await this.getProducts()
  },
})
