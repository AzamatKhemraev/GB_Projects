const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const app = new Vue({
    el: '#app',
    data: {
        products: [],
        filteredProducts: [],
        cartList: [],
        searchLine: '',
        isVisibleCart: false,
    },

    methods: {
        async getProducts() {
            const responce = await fetch(`${API_URL}/catalogData.json`)
            if (responce.ok) {
                const catalogItems = await responce.json()
                this.products = catalogItems
                this.filteredProducts = catalogItems
            } else {
                alert('Ошибка при соединении с сервером')
            }
        },

        filterProducts() {
            if (!this.searchLine) {
                this.filteredProducts = this.products
            } else {
                this.filteredProducts = this.products.filter((elem) => elem.product_name == this.searchLine)
            }
        },

        getCartList() {
            if (this.cartList.length == 0) {
                return alert('Корзина пуста')
            }
        },
    },

    async mounted() {
        await this.getProducts()
    },
})
