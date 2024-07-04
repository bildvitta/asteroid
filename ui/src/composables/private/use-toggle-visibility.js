import { ref, computed } from 'vue'

const visibleState = ref({})

/**
 * @param {{
 *  group?: string,
 *  uuid: string
 * }}
 */
export default function useToggleVisibility ({ group, uuid }) {
  group = group || 'default'

  visibleState.value[group] = {
    ...visibleState.value[group],
    [uuid]: false
  }

  const isVisible = computed(() => visibleState.value[group]?.[uuid] || false)

  function toggleVisibility () {
    const item = visibleState.value[group]
    const lastVisibleItemKey = Object.keys(item).find(key => !!item[key])

    /**
     * cenário onde esta visível e clicou no mesmo item
     */
    if (visibleState.value[group][uuid]) {
      visibleState.value[group][uuid] = false
      return
    }

    /**
     * cenário onde tem um item visível e clicou em outro item
     */
    if (lastVisibleItemKey) {
      visibleState.value[group][lastVisibleItemKey] = false
    }

    visibleState.value[group][uuid] = true
  }

  return {
    isVisible,

    toggleVisibility
  }
}
