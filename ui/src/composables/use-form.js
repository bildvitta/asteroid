import { computed } from 'vue'
import { useRoute } from 'vue-router'

/**
 * @function
 * @name useForm
 * @returns {{
 *  isEditMode: { value: boolean },
 *  mode: { value: string }
 * }}
*/
export default function () {
  const route = useRoute()

  const isEditMode = computed(() => {
    return ['replace', 'update'].includes(mode.value)
  })

  const mode = computed(() => {
    return route.name?.endsWith('Edit') ? 'replace' : 'create'
  })

  return {
    isEditMode,
    mode
  }
}
