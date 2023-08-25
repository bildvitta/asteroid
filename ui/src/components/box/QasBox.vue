<template>
  <div class="bg-white q-pa-lg" :class="boxClass">
    <slot />
  </div>
</template>

<script setup>
import { computed, inject, provide } from 'vue'

defineOptions({
  name: 'QasBox'
})

const props = defineProps({
  outlined: {
    type: Boolean
  },

  unelevated: {
    type: Boolean
  }
})

provide('hasParent', true)

const hasParent = inject('hasParent', false)

const boxClass = computed(() => ({
  'border-grey rounded-borders-lg': props.outlined || hasParent,
  'shadow-2 rounded-borders-xl': !props.unelevated && !hasParent
}))
</script>
