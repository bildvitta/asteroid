<template>
  <q-btn ref="button" class="qas-btn" v-bind="attributes">
    <slot />

    <template v-for="(_, name) in nonDefaultSlots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
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
    validator: value => ['grey-9', 'primary', 'white'].includes(value)
  },

  icon: {
    default: undefined,
    type: String
  },

  iconRight: {
    default: undefined,
    type: String
  },

  useLabelOnSmallScreen: {
    default: true,
    type: Boolean
  },

  label: {
    default: '',
    type: String
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

const classes = computed(() => {
  return {
    'qas-btn--primary': isPrimary.value,
    'qas-btn--secondary': isSecondary.value,
    'qas-btn--tertiary': isTertiary.value,

    // color
    [`qas-btn--tertiary-${props.color}`]: isTertiary.value,

    // icon
    'qas-btn--icon-only': hasIconOnly.value,

    'qas-btn--primary-icon-only': hasIconOnly.value && isPrimary.value,
    'qas-btn--secondary-icon-only': hasIconOnly.value && isSecondary.value,
    'qas-btn--tertiary-icon-only': hasIconOnly.value && isTertiary.value,

    // hover
    'qas-btn--no-hover-on-white': !props.useHoverOnWhiteColor,

    // ellipsis
    'qas-btn--ellipsis': props.useEllipsis
  }
})

const attributes = computed(() => {
  const {
    dense,
    fab,
    fabMini,
    flat,
    glossy,
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
    class: externalClass,
    ...attributesPayload
  } = attrs

  return {
    ...(showLabel.value && { label: props.label }),

    ...attributesPayload,
    icon: props.icon,
    iconRight: props.iconRight,
    class: [classes.value, externalClass]
  }
})

const nonDefaultSlots = computed(() => {
  const { default: _, ...nonDefaults } = slots

  return nonDefaults
})
</script>
