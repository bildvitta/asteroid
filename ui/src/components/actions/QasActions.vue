<template>
  <div class="q-mt-sm" :class="classes">
    <div v-if="hasTertiarySlot" :class="columnClasses">
      <slot name="tertiary" />
    </div>

    <div v-if="hasSecondarySlot" :class="columnClasses">
      <slot name="secondary" />
    </div>

    <div v-if="hasPrimarySlot" :class="columnClasses">
      <slot name="primary" />
    </div>
  </div>
</template>

<script setup>
import useScreen from '../../composables/use-screen'
import { FlexAlign } from '../../enums/Align'
import { Spacing } from '../../enums/Spacing'

import { computed, useSlots } from 'vue'

defineOptions({ name: 'QasActions' })

const props = defineProps({
  align: {
    default: FlexAlign.End,
    type: String,
    validator: value => Object.values(FlexAlign).includes(value)
  },

  gutter: {
    default: '',
    type: String,
    validator: value => !value || Object.values(Spacing).includes(value)
  },

  useFullWidth: {
    type: Boolean
  },

  useEqualWidth: {
    type: Boolean
  }
})

const slots = useSlots()
const screen = useScreen()

const defaultGutter = computed(() => {
  return props.gutter || (screen.isSmall ? 'md' : 'lg')
})

const classes = computed(() => {
  const isSmallOrFullWidth = screen.isSmall || props.useFullWidth

  return [
    'items-center',

    // alinhamento
    `justify-${props.align}`,

    // espaçamento
    `q-col-gutter-${defaultGutter.value}`,

    // disposição
    isSmallOrFullWidth ? 'column reverse' : 'row'
  ]
})

const columnClasses = computed(() => {
  if (props.useEqualWidth) return 'col-12 col-sm-6'

  return props.useFullWidth ? 'col-12' : 'col-12 col-sm-auto'
})

const hasPrimarySlot = computed(() => !!slots.primary)
const hasSecondarySlot = computed(() => !!slots.secondary)
const hasTertiarySlot = computed(() => !!slots.tertiary)
</script>
