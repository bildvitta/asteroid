import { computed } from 'vue'

/**
 * @param {{
 *  props: { cancel: object },
 *  emits: (event: 'cancel') => void
 * }} config
 */
export default function useCancel (config = {}) {
  const {
    props,
    emits
  } = config

  const defaultCancel = computed(() => {
    return {
      label: 'Cancelar',
      outline: true,

      ...props.cancel,

      onClick: onCancel
    }
  })

  const hasCancel = computed(() => {
    return typeof props.cancel === 'boolean' ? props.cancel : !!Object.keys(props.cancel)
  })

  function onCancel () {
    props.cancel.onClick?.()
    emits('cancel')
  }

  return {
    defaultCancel,
    hasCancel
  }
}
