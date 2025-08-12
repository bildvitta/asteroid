<template>
  <q-tooltip v-bind="tooltipProps" class="bg-grey-10">
    {{ props.text }}
  </q-tooltip>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ name: 'QasTooltip' })

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

// computeds
const tooltipProps = computed(() => {
  return {
    anchor: 'center right',
    self: 'center left',
    offset: [5, 5]
  }
})
</script>
