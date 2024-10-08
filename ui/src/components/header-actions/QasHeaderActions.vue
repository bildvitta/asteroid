<template>
  <div class="justify-between no-wrap q-col-gutter-x-md row text-body1 text-grey-8" :class="containerClass">
    <div :class="leftClass">
      <slot name="left">
        {{ props.text }}
      </slot>
    </div>

    <div v-if="hasRightSide" class="justify-end row">
      <slot name="right">
        <qas-actions-menu v-if="hasDefaultActionsMenu" v-bind="props.actionsMenuProps" />

        <qas-btn v-if="hasDefaultButton" :use-label-on-small-screen="false" v-bind="props.buttonProps" />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { FlexAlign } from '../../enums/Align'
import { Spacing } from '../../enums/Spacing'
import { gutterValidator } from '../../helpers/private/gutter-validator'

import { computed, useSlots } from 'vue'

defineOptions({ name: 'QasHeaderActions' })

const props = defineProps({
  actionsMenuProps: {
    type: Object,
    default: () => ({})
  },

  alignColumns: {
    default: FlexAlign.Center,
    type: String,
    validator: value => Object.values(FlexAlign).includes(value)
  },

  buttonProps: {
    default: () => ({}),
    type: Object
  },

  text: {
    type: String,
    default: ''
  },

  spacing: {
    default: Spacing.Xl,
    type: String,
    validator: gutterValidator
  }
})

const slots = useSlots()

// computed
const containerClass = computed(() => `items-${props.alignColumns} q-mb-${props.spacing}`)

const leftClass = computed(() => {
  return {
    'col-12': !hasRightSide.value
  }
})

const hasDefaultButton = computed(() => !!Object.keys(props.buttonProps).length)
const hasDefaultActionsMenu = computed(() => !!Object.keys(props.actionsMenuProps).length)

const hasRightSide = computed(() => {
  const hasRightSlot = !!slots.right

  return hasRightSlot || hasDefaultActionsMenu.value || hasDefaultButton.value
})
</script>
