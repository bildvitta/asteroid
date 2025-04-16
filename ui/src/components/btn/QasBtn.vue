<template>
  <q-btn ref="button" class="qas-btn" v-bind="attributes">
    <template v-for="(_, name) in nonDefaultSlots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>

    <span class="items-center justify-center row text-center">
      <q-spinner v-if="props.loading" :class="loadingClasses" size="sm" />
      <q-icon v-if="hasIcon" :class="iconClasses" :name="props.icon" size="xs" />
      <span v-if="showLabel">{{ props.label }}</span>
      <q-icon v-if="hasIconRight" :class="iconRightClasses" :name="props.iconRight" size="xs" />
    </span>

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
    validator: value => ['grey-10', 'primary', 'white'].includes(value)
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

  loading: {
    default: false,
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

const hasIconRight = computed(() => props.iconRight && !props.loading)
const hasIcon = computed(() => props.icon && !props.loading)

const iconClasses = computed(() => ({ 'q-mr-xs': showLabel.value && props.label }))
const iconRightClasses = computed(() => ({ 'q-ml-xs': showLabel.value && props.label }))
const loadingClasses = computed(() => ({ 'q-mr-xs': showLabel.value && props.label }))

const classes = computed(() => {
  console.log(props.label, '<--- props.label')
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
    class: externalClass,
    dense,
    fab,
    fabMini,
    flat,
    glossy,
    loading,
    // label,
    // icon,
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
    // ...(showLabel.value && { label: props.label }),

    ...attributesPayload,
    // icon: props.icon,
    // iconRight: props.iconRight,
    class: [classes.value, externalClass]
  }
})

const nonDefaultSlots = computed(() => {
  const { default: _, ...nonDefaults } = slots

  return nonDefaults
})
</script>
