export default {
  methods: {
    mx_dialogRouter (route) {
      this.$refs.dialogRouter.show(route)
    },

    mx_reload () {
      if (this.$refs.listView) {
        this.$refs.listView.refresh()
      }

      if (this.$refs.singleView) {
        this.$refs.singleView.fetchSingle()
      }
    }
  }
}
