import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default function () {
  const route = useRoute()

  const context = computed(() => {
    const { limit, ordering, page, search, ...filters } = route.query
    return { filters, limit, ordering, page: page ? parseInt(page) : 1, search }
  })

  return {
    context
  }
}
