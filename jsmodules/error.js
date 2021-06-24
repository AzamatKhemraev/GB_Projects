export default Vue.component('error', {
  props: ['is-error'],
  template: `<h1 v-show="isError">Не удалось выполнить запрос к серверу</h1>`,
})
