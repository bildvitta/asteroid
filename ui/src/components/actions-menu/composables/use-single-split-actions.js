import { computed } from 'vue'

import getLabel from '../utils/get-label'

/**
 * Cenário onde vai ter mais de 2 itens na lista, então precisa ficar
 * o botão primário fora do dropdown e o restante dentro do dropdown.
 *
 * @param {{
 *  props: { useLabel: boolean },
 *  primaryKey: import('vue').ComputedRef<string>,
 *  buttonsPropsList: import('vue').ComputedRef<object>
 *  primaryButtonProps: import('vue').ComputedRef<primaryButtonProps>
 * }} config
 */
export default function useSingleSplitActions ({ buttonsPropsList, props, primaryKey, primaryButtonProps }) {
  delete buttonsPropsList[primaryKey.value]

  const list = computed(() => {
    return {
      buttonsList: {
        [primaryKey.value]: {
          ...primaryButtonProps.value,
          label: getLabel({ useLabel: props.useLabel, label: primaryButtonProps.value.label })
        }
      },

      dropdownList: buttonsPropsList
    }
  })

  return {
    list
  }
}
