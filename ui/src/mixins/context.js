export default {
  computed: {
    mx_context () {
      const { limit, ordering, page, search, ...filters } = this.$route.query
      return { filters, limit, ordering, page: page ? parseInt(page) : 1, search }
    }
  }
}
