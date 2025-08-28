<template>
  <!-- "data-table-ignore-tr-hover" é para desabilitar o hover do tr no QasTableGenerator -->
  <q-btn ref="button" class="qas-btn" data-table-ignore-tr-hover v-bind="attributes">
    <template v-for="(_, name) in nonDefaultSlots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>

    <div class="items-center justify-between no-wrap row text-center" :class="containerClasses">
      <q-spinner v-if="hasLeftSpinner" :class="iconClasses" :size="spinnerSize" />

      <q-icon v-if="hasIcon" :class="iconClasses" :name="props.icon" />

      <div v-if="showLabel" :class="labelClasses">
        {{ props.label }}
      </div>

      <q-spinner v-if="hasRightSpinner" :class="iconRightClasses" :size="spinnerSize" />

      <q-icon v-if="hasIconRight" :class="iconRightClasses" :name="props.iconRight" />
    </div>

    <slot />
  </q-btn>
</template>

<script setup>
import { useScreen } from '../../composables'

import { computed, useAttrs, useSlots } from 'vue'

defineOptions({
  name: 'QasBtn',
  inheritAttrs: false
})

const props = defineProps({
  color: {
    default: 'primary',
    type: String,
    validator: value => ['grey-10', 'primary', 'white', 'negative'].includes(value)
  },

  disable: {
    type: Boolean
  },

  icon: {
    default: undefined,
    type: String
  },

  iconRight: {
    default: undefined,
    type: String
  },

  size: {
    default: 'lg',
    type: String,
    validator: value => ['sm', 'md', 'lg'].includes(value)
  },

  useLabelOnSmallScreen: {
    default: true,
    type: Boolean
  },

  label: {
    default: '',
    type: String
  },

  loading: {
    type: Boolean
  },

  variant: {
    default: 'tertiary',
    type: String,
    validator: value => {
      const variants = ['primary', 'secondary', 'tertiary']

      return variants.includes(value)
    }
  },

  useEllipsis: {
    type: Boolean
  },

  useHoverOnWhiteColor: {
    default: true,
    type: Boolean
  }
})

const attrs = useAttrs()
const slots = useSlots()
const screen = useScreen()

// variantes
const isPrimary = computed(() => props.variant === 'primary')
const isSecondary = computed(() => props.variant === 'secondary')
const isTertiary = computed(() => props.variant === 'tertiary')

const showLabel = computed(() => props.useLabelOnSmallScreen || !screen.isSmall)

const hasIconOnly = computed(() => {
  return (
    (!props.label || !showLabel.value) &&
    ((props.icon && !props.iconRight) || (props.iconRight && !props.icon))
  )
})

const hasLeftSpinner = computed(() => props.loading && !props.iconRight)
const hasRightSpinner = computed(() => props.loading && props.iconRight)

const hasIconRight = computed(() => props.iconRight && !props.loading)
const hasIcon = computed(() => props.icon && !props.loading)

const labelClasses = computed(() => ({ ellipsis: props.useEllipsis }))
const containerClasses = computed(() => ({ 'full-width': props.useEllipsis }))

const iconClasses = computed(() => ({ 'on-left': !hasIconOnly.value }))
const iconRightClasses = computed(() => ({ 'on-right': !hasIconOnly.value }))

const classes = computed(() => {
  return [
    `qas-btn--${props.size}`,
    {
      'qas-btn--primary': isPrimary.value,
      'qas-btn--secondary': isSecondary.value,
      'qas-btn--tertiary': isTertiary.value,

      // color
      [`qas-btn--tertiary-${props.color}`]: isTertiary.value,
      [`qas-btn--primary-${props.color}`]: isPrimary.value,
      [`qas-btn--secondary-${props.color}`]: isSecondary.value,

      // icon
      'qas-btn--icon-only': hasIconOnly.value,

      'qas-btn--primary-icon-only': hasIconOnly.value && isPrimary.value,
      'qas-btn--secondary-icon-only': hasIconOnly.value && isSecondary.value,
      'qas-btn--tertiary-icon-only': hasIconOnly.value && isTertiary.value,

      // hover
      'qas-btn--no-hover-on-white': !props.useHoverOnWhiteColor,

      // loading
      'qas-btn--loading': props.loading,

      // ellipsis
      'full-width': props.useEllipsis
    }
  ]
})

const attributes = computed(() => {
  const {
    class: externalClass,
    dense,
    disable,
    fab,
    fabMini,
    flat,
    glossy,
    loading,
    noWrap,
    outline,
    padding,
    push,
    ripple,
    round,
    size,
    square,
    stack,
    stretch,
    textColor,
    unelevated,
    ...attributesPayload
  } = attrs

  return {
    ...attributesPayload,
    disable: props.disable || props.loading,
    class: [classes.value, externalClass]
  }
})

const nonDefaultSlots = computed(() => {
  const { default: _, ...nonDefaults } = slots

  return nonDefaults
})

const spinnerSize = computed(() => props.size === 'sm' ? 'xs' : 'sm')
</script>
