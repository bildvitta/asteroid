export default {
  computed: {
    $_isEditMode () {
      return ['replace', 'update'].includes(this.$_mode)
    },

    $_mode () {
      return this.$_resolvedRoute.name.endsWith('Edit') ? 'replace' : 'create'
    },

    $_resolvedRoute () {
      if (this.route && Object.keys(this.route).length) {
        return this.route
      }

      return this.$route
    }
  }
}
