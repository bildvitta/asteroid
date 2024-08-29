<template>
  <div class="bg-white rounded-borders" :class="boxClasses">
    <slot />
  </div>
</template>

<script setup>
import { Spacing } from '../../enums/Spacing'

import { computed, provide } from 'vue'

defineOptions({ name: 'QasBox' })

const props = defineProps({
  outlined: {
    type: Boolean
  },

  unelevated: {
    type: Boolean
  },

  spacingX: {
    default: Spacing.Md,
    type: String,
    validator: value => Object.values(Spacing).includes(value)
  },

  spacingY: {
    default: Spacing.Md,
    type: String,
    validator: value => Object.values(Spacing).includes(value)
  },

  useSpacing: {
    type: Boolean,
    default: true
  }
})

provide('isBox', true)

const boxClasses = computed(() => {
  return {
    'border-grey': props.outlined,
    'shadow-2': !props.unelevated,
    [`q-px-${props.spacingX}`]: props.useSpacing,
    [`q-py-${props.spacingY}`]: props.useSpacing
  }
})
</script>
