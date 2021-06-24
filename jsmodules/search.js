export default Vue.component('search', {
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
