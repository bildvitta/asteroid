<template>
  <div class="bg-white q-pa-lg rounded-borders-lg" :class="boxClass">
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
  'border-grey': props.outlined || hasParent,
  'shadow-2': !props.unelevated && !hasParent
}))
</script>
