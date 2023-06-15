import { computed } from 'vue'
import { useRoute } from 'vue-router'

/**
 * @function
 * @name useForm
 * @returns {{
 *  isEditMode: isEditMode,
 *  mode: mode
 * }}
*/
export default function useForm () {
  const route = useRoute()

  /**
   * @constant
   * @type {{ value: boolean }}
   */
  const isEditMode = computed(() => {
    return ['replace', 'update'].includes(mode.value)
  })

  /**
   * @constant
   * @type {{ value: 'replace' | 'create' }}
   */
  const mode = computed(() => {
    return route.name?.endsWith('Edit') ? 'replace' : 'create'
  })

  return {
    isEditMode,
    mode
  }
}
