<template>
  <div class="justify-between no-wrap q-col-gutter-x-md row" :class="containerClass">
    <div :class="leftClass">
      <slot name="left">
        <div class="items-center q-col-gutter-sm row" :class="labelSectionClasses">
          <qas-label v-if="hasLabel" v-bind="defaultLabelProps" />

          <div class="col-auto items-center q-col-gutter-sm row">
            <div v-for="(badge, badgeIndex) in props.badges" :key="badgeIndex" class="col-auto">
              <qas-badge v-bind="badge" />
            </div>
          </div>
        </div>

        <span v-if="props.description" class="text-body1 text-grey-8">
          {{ props.description }}
        </span>
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

defineOptions({ name: 'QasHeader' })

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

  badges: {
    type: Array,
    default: () => []
  },

  buttonProps: {
    default: () => ({}),
    type: Object
  },

  description: {
    type: String,
    default: ''
  },

  spacing: {
    default: Spacing.Xl,
    type: String,
    validator: gutterValidator
  },

  labelProps: {
    type: Object,
    default: () => ({})
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

const labelSectionClasses = computed(() => {
  return {
    'q-mb-xs': hasBadges.value
  }
})

const defaultLabelProps = computed(() => {
  return {
    margin: hasBadges.value ? 'none' : 'xs',
    ...props.labelProps
  }
})

const hasBadges = computed(() => !!props.badges.length)
const hasLabel = computed(() => !!Object.keys(props.labelProps).length)
const hasDefaultButton = computed(() => !!Object.keys(props.buttonProps).length)
const hasDefaultActionsMenu = computed(() => !!Object.keys(props.actionsMenuProps).length)

const hasRightSide = computed(() => {
  const hasRightSlot = !!slots.right

  return hasRightSlot || hasDefaultActionsMenu.value || hasDefaultButton.value
})
</script>
