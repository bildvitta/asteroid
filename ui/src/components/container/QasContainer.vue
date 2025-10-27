<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup>
import { useOverlayNavigation } from '../../composables'

import { computed } from 'vue'

defineOptions({ name: 'QasContainer' })

const props = defineProps({
  useSpaced: {
    type: Boolean,
    default: true
  }
})

// composables
const { isOverlay } = useOverlayNavigation()

const classes = computed(() => {
  return {
    container: !isOverlay,
    spaced: props.useSpaced && !isOverlay
  }
})
</script>
