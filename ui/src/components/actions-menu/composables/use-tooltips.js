import { computed } from 'vue'

/**
 * Composable responsável pelo tooltip
 *
 * @param {{
 *  props: { useTooltip: boolean, useLabel: boolean },
 *  formattedList: import('vue').ComputedRef<object>
 *  fullList: import('vue').ComputedRef<object>
 * }}
 */
export default function useTooltip ({ props, formattedList, fullList }) {
  const hasTooltip = computed(() => !props.useLabel && props.useTooltip)

  /**
  * Precisa existir um tooltip para item de "formattedList.value.buttonsList",
  * então é preciso fazer um tratamento, uma vez que dentro de "formattedList.value.buttonsList"
  * não existe mais "labels", então recuperamos elas de "fullList".
  */
  const tooltipLabels = computed(() => {
    if (!hasTooltip.value) return {}

    const formattedProps = {}

    for (const key in formattedList.value.buttonsList) {
      formattedProps[key] = {
        label: fullList.value[key]?.label
      }
    }

    return formattedProps
  })

  function showTooltip ({ label }) {
    return hasTooltip.value && label
  }

  return {
    tooltipLabels,

    showTooltip
  }
}
