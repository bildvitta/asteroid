<template>
  <!-- "data-table-ignore-tr-hover" é para desabilitar o hover do tr no QasTableGenerator -->
  <q-btn ref="button" class="qas-btn" data-table-ignore-tr-hover v-bind="attributes">
    <template v-for="(_, name) in nonDefaultSlots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>

    <q-spinner v-if="hasLeftSpinner" :class="iconClasses" size="sm" />

    <q-icon v-if="hasIcon" :class="iconClasses" :name="props.icon" />

    <div v-if="showLabel" :class="labelClasses">
      {{ props.label }}
    </div>

    <q-spinner v-if="hasRightSpinner" :class="iconRightClasses" size="sm" />

    <q-icon v-if="hasIconRight" :class="iconRightClasses" :name="props.iconRight" />

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

const iconClasses = computed(() => ({ 'on-left': !hasIconOnly.value }))
const iconRightClasses = computed(() => ({ 'on-right': !hasIconOnly.value }))

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
    align,
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
    disable: disable || props.loading,
    class: [classes.value, externalClass],

    /**
     * Alinhamento do conteúdo do botão será sempre sobrescrito caso seja passado via prop
     * ou caso ele seja ellipsis e do tipo tertiary, deverá ser alinhado a esquerda
     * ou padrão ser alinhado ao centro.
     */
    align: align || (props.useEllipsis && isTertiary.value && 'left') || 'center'
  }
})

const nonDefaultSlots = computed(() => {
  const { default: _, ...nonDefaults } = slots

  return nonDefaults
})
</script>
