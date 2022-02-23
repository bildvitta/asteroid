export default {
  computed: {
    mx_isEditMode () {
      return ['replace', 'update'].includes(this.mx_mode)
    },

    mx_mode () {
      return this.mx_resolvedRoute.name.endsWith('Edit') ? 'replace' : 'create'
    },

    mx_resolvedRoute () {
      // this.route é uma prop do QasFormView
      if (this.route && Object.keys(this.route).length) {
        return this.route
      }

      return this.$route
    }
  }
}
