<template>
  <div :class="boxClass">
    <slot />
  </div>
</template>

<script setup>
import { computed, inject, provide } from 'vue'
import { Spacing } from '../../enums/Spacing'

defineOptions({
  name: 'QasBox'
})

const props = defineProps({
  outlined: {
    type: Boolean
  },

  paddingHorizontal: {
    default: Spacing.Lg,
    type: String,
    validator: value => Object.values(Spacing).includes(value)
  },

  paddingVertical: {
    default: Spacing.Lg,
    type: String,
    validator: value => Object.values(Spacing).includes(value)
  },

  unelevated: {
    type: Boolean
  },

  usePadding: {
    default: true,
    type: Boolean
  }
})

provide('hasParent', true)

const hasParent = inject('hasParent', false)

const boxClass = computed(() => {
  return [
    'bg-white rounded-borders',
    {
      [`q-px-${props.paddingHorizontal}`]: props.usePadding,
      [`q-py-${props.paddingVertical}`]: props.usePadding,
      'border-grey': props.outlined || hasParent,
      'shadow-2': !props.unelevated && !hasParent
    }
  ]
})
</script>
