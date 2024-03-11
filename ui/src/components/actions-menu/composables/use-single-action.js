import { computed } from 'vue'

/**
 * Cenário para quando existir apenas 1 item na lista.
 *
 * @param {{
 *  primaryKey: import('vue').ComputedRef<string>,
 *  primaryButtonProps: import('vue').ComputedRef<primaryButtonProps>
 * }}
 */
export default function useSingleAction ({ primaryKey, primaryButtonProps }) {
  const buttonsList = computed(() => ({ [primaryKey.value]: { ...primaryButtonProps.value } }))

  return {
    buttonsList
  }
}
