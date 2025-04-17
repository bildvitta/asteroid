<template>
  <span>
    <span data-table-hover>
      <slot v-if="props.useText">
        {{ props.text }}
      </slot>
    </span>

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
  },

  useText: {
    type: Boolean,
    default: true
  },

  rawText: {
    default: '',
    type: String
  }
})

const isLoading = ref(false)

function copy () {
  copyToClipboard(props.rawText || props.text, value => {
    isLoading.value = value
  })
}
</script>
