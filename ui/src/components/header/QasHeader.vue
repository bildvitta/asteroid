<template>
  <div :class="containerClass">
    <div v-if="hasLabelSection" class="items-center justify-between no-wrap row" :class="labelSectionClasses">
      <div class="items-center q-col-gutter-sm row">
        <slot name="label">
          <qas-label v-bind="defaultLabelProps" />
        </slot>

        <div v-if="hasBadges" class="col-auto items-center q-col-gutter-sm row">
          <div v-for="(badge, badgeIndex) in props.badges" :key="badgeIndex">
            <qas-badge v-bind="badge" />
          </div>
        </div>
      </div>

      <slot name="actions">
        <qas-actions-menu v-if="hasDefaultActionsMenu" v-bind="props.actionsMenuProps" />

        <qas-btn v-if="hasDefaultButton" :use-label-on-small-screen="false" v-bind="props.buttonProps" />
      </slot>
    </div>

    <div class="items-start justify-between no-wrap q-col-gutter-sm row">
      <div v-if="hasDescriptionSection" class="text-body1 text-grey-8">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>

      <div v-if="!hasLabelSection" class="justify-end row">
        <slot name="actions">
          <qas-actions-menu v-if="hasDefaultActionsMenu" v-bind="props.actionsMenuProps" />

          <qas-btn v-if="hasDefaultButton" :use-label-on-small-screen="false" v-bind="props.buttonProps" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Spacing } from '../../enums/Spacing'
import { gutterValidator } from '../../helpers/private/gutter-validator'

import { computed, useSlots } from 'vue'

defineOptions({ name: 'QasHeader' })

const props = defineProps({
  actionsMenuProps: {
    type: Object,
    default: () => ({})
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
const containerClass = computed(() => `q-mb-${props.spacing}`)

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
const hasDescriptionSection = computed(() => props.description || slots.description)
const hasLabelSection = computed(() => hasLabel.value || slots.label)
</script>
