export default {
  data () {
    return {
      mx_fromDelete: false
    }
  },

  beforeRouteLeave (to, from, next) {
    if (!this.$refs.formView) {
      throw new Error(
        'Forneça um ref "formView" para acessar o método "beforeRouteLeave" dentro de qas-form-view'
      )
    }

    this.$refs.formView.beforeRouteLeave(to, from, next, this.mx_fromDelete)
  },

  methods: {
    mx_deleteSuccess () {
      this.mx_fromDelete = true
    }
  }
}
