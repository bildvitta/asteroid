import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default function () {
  const route = useRoute()

  console.log(useRoute)

  const isEditMode = computed(() => {
    return ['replace', 'update'].includes(mode.value)
  })

  const mode = computed(() => {
    return route.name.endsWith('Edit') ? 'replace' : 'create'
  })

  return {
    isEditMode,
    mode
  }
}
