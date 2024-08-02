<template>
  <div class="bg-white rounded-borders" :class="boxClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ name: 'QasBox' })

const props = defineProps({
  outlined: {
    type: Boolean
  },

  unelevated: {
    type: Boolean
  },

  useSpacing: {
    type: Boolean,
    default: true
  }
})

const boxClasses = computed(() => {
  return {
    'border-grey': props.outlined,
    'shadow-2': !props.unelevated,
    'q-pa-md': props.useSpacing
  }
})
</script>
