export default {
  computed: {
    mx_isEditMode () {
      return ['replace', 'update'].includes(this.mx_mode)
    },

    mx_mode () {
      return this.$route.name.endsWith('Edit') ? 'replace' : 'create'
    }
  }
}
