import setClickHandler from '../utils/set-click-handler'
import getLabel from '../utils/get-label'

import { computed } from 'vue'

/**
 * Cenário onde ficará um botão ao lado do outro "Ação primaria | Ação secundaria".
 *
 * @param {{
 *  color: string,
 *  props: { useLabel: boolean },
 *  primaryKey: import('vue').ComputedRef<string>,
 *  buttonsPropsList: import('vue').ComputedRef<object>
 *  primaryButtonProps: import('vue').ComputedRef<primaryButtonProps>
 * }} config
 */
export default function useDoubleSplitActions (config = {}) {
  const { color, props, primaryKey, buttonsPropsList, primaryButtonProps } = config

  const buttonsList = computed(() => {
    const secondaryKey = Object.keys(buttonsPropsList).find(key => key !== primaryKey.value)
    const secondaryButton = buttonsPropsList[secondaryKey]

    return {
      [primaryKey.value]: {
        ...primaryButtonProps.value,
        label: getLabel({ useLabel: props.useLabel, label: primaryButtonProps.value.label })
      },

      [secondaryKey]: {
        ...secondaryButton,
        color,
        label: getLabel({ useLabel: props.useLabel, label: secondaryButton.label }),
        onClick: () => setClickHandler(secondaryButton)
      }
    }
  })

  return {
    buttonsList
  }
}
