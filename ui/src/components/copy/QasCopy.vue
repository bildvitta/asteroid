<template>
  <span>
    <slot>{{ props.text }}</slot>

    EU FUI COPIADO 2
    <qas-btn class="q-ml-xs" color="primary" :icon="props.icon" :loading="isLoading" variant="tertiary" @click.stop.prevent="copy">
      <q-tooltip>Copiar</q-tooltip>
    </qas-btn>
  </span>
</template>

<script setup>
import { copyToClipboard } from '../../helpers'
import { ref } from 'vue'

defineOptions({ name: 'QasCopy' })

const props = defineProps({
  icon: {
    default: 'sym_r_file_copy',
    type: String
  },

  text: {
    required: true,
    type: String
  }
})

const isLoading = ref(false)
console.log('TCL: isLoading', isLoading)

function copy () {
  copyToClipboard(props.text, value => {
    isLoading.value = value
  })
}
</script>
