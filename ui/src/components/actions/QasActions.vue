<template>
  <div class="q-mt-sm" :class="classes">
    <div v-if="hasTertiaryButton" :class="columnClasses">
      <slot name="tertiary">
        <qas-btn v-bind="formattedButtonsProps.tertiary" />
      </slot>
    </div>

    <div v-if="hasSecondaryButton" :class="columnClasses">
      <slot name="secondary">
        <qas-btn v-bind="formattedButtonsProps.secondary" />
      </slot>
    </div>

    <div v-if="hasPrimaryButton" :class="columnClasses">
      <slot name="primary">
        <qas-btn v-bind="formattedButtonsProps.primary" />
      </slot>
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

  buttonsProps: {
    type: Object,
    default: () => ({})
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
    !screen.isSmall && 'items-center',

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

  return props.useFullWidth ? 'full-width' : 'col-12 col-sm-auto'
})

const hasPrimarySlot = computed(() => !!slots.primary)
const hasSecondarySlot = computed(() => !!slots.secondary)
const hasTertiarySlot = computed(() => !!slots.tertiary)

const hasPrimaryButton = computed(() => hasPrimarySlot.value || props.buttonsProps.primary)
const hasSecondaryButton = computed(() => hasSecondarySlot.value || props.buttonsProps.secondary)
const hasTertiaryButton = computed(() => hasTertiarySlot.value || props.buttonsProps.tertiary)

const formattedButtonsProps = computed(() => {
  return {
    primary: { ...props.buttonsProps.primary, variant: 'primary' },
    secondary: { ...props.buttonsProps.secondary, variant: 'secondary' },
    tertiary: { ...props.buttonsProps.tertiary, variant: 'tertiary' }
  }
})
</script>
