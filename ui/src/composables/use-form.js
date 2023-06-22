import { computed } from 'vue'
import { useRoute } from 'vue-router'

const VALID_EDIT_MODES = ['replace', 'update']

/**
 * @function
 * @name useForm
 * @param {{ editMode: 'replace' | 'update' }}
 * @returns {{
 *  isEditMode: isEditMode,
 *  mode: mode
 * }}
*/
export default function useForm ({ editMode = 'replace' } = {}) {
  const route = useRoute()

  /**
   * @type {{ value: boolean }}
   */
  const isEditMode = computed(() => VALID_EDIT_MODES.includes(mode.value))

  /**
   * @type {{ value: 'replace' | 'update' | 'create' }}
   */
  const mode = computed(() => route.name?.endsWith('Edit') ? editMode : 'create')

  return {
    isEditMode,
    mode
  }
}
