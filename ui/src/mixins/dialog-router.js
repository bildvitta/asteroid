export default {
  methods: {
    $_dialogRouter (route) {
      this.$refs.dialogRouter.show(route)
    },

    $_reload () {
      if (this.$refs.listView) {
        this.$refs.listView.refresh()
      }

      if (this.$refs.singleView) {
        this.$refs.singleView.fetchSingle()
      }
    }
  }
}
