import { computed } from 'vue'

export const baseErrorProps = {
  errorMessage: {
    type: String,
    default: ''
  },

  error: {
    type: Boolean
  }
}

/**
 * Composable para lidar com mensagens de erro
 *
 * @param {baseErrorProps} props
 */
export default function useErrorMessage (props) {
  const labelClasses = computed(() => ({ 'text-negative': props.error }))

  return {
    labelClasses
  }
}
