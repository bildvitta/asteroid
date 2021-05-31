export default {
  beforeRouteLeave (to, from, next) {
    if (!this.$refs.formView) {
      throw new Error(
        `Please provide a ref called "formView"
        to access the method "beforeRouteLeave" inside qas-form-view`
      )
    }

    this.$refs.formView.beforeRouteLeave(to, from, next)
  }
}
