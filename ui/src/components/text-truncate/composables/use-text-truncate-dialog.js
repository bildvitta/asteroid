import { computed, ref } from 'vue'

export function useTextTruncateDialog ({ props, textContent }) {
  const showDialog = ref(false)
  const description = computed(() => props.text || textContent.value)

  const defaultDialogProps = computed(() => {
    return {
      cancel: false,
      ok: false,

      ...props.dialogProps,

      card: {
        title: props.dialogTitle,
        description: description.value
      }
    }
  })

  function toggleDialog () {
    showDialog.value = !showDialog.value
  }

  return {
    defaultDialogProps,
    showDialog,

    // methods
    toggleDialog
  }
}
