import { computed } from 'vue'

/**
 * @param {{
 *  color: string,
 *  props: { deleteIcon: string, deleteLabel: string, deleteProps: object },
 *  qas: { delete: function(object) }
 * }}
 */
export default function useDelete ({ color, props, qas }) {
  const hasDelete = computed(() => !!Object.keys(props.deleteProps).length)

  const deleteBtnProps = computed(() => {
    return {
      ...(hasDelete.value && {
        delete: {
          color,
          icon: props.deleteIcon,
          label: props.deleteLabel,
          handler: () => qas.delete(props.deleteProps)
        }
      })
    }
  })

  return {
    deleteBtnProps,
    hasDelete
  }
}
