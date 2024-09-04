<template>
  <div :class="containerClasses">
    <div v-if="hasLabelSection" class="items-center justify-between no-wrap row" :class="labelSectionClasses">
      <div class="items-center q-col-gutter-sm row">
        <slot name="label">
          <qas-label v-if="hasLabel" v-bind="defaultLabelProps" />
        </slot>

        <div v-if="hasBadges" class="col-auto items-center q-col-gutter-sm row">
          <div v-for="(badge, badgeIndex) in props.badges" :key="badgeIndex">
            <qas-badge v-bind="badge" />
          </div>
        </div>
      </div>

      <slot name="actions">
        <div class="text-right">
          <qas-actions-menu v-if="hasDefaultActionsMenu" v-bind="props.actionsMenuProps" />

          <qas-btn v-if="hasDefaultButton" :use-label-on-small-screen="false" v-bind="props.buttonProps" />
        </div>
      </slot>
    </div>

    <div class="items-start no-wrap q-col-gutter-sm row" :class="descriptionSectionClasses">
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

  labelProps: {
    type: Object,
    default: () => ({})
  },

  spacing: {
    default: Spacing.Md,
    type: String,
    validator: gutterValidator
  }
})

const slots = useSlots()

// computed
const containerClasses = computed(() => `q-mb-${props.spacing}`)

const labelSectionClasses = computed(() => {
  return {
    'q-mb-xs': hasBadges.value
  }
})

const descriptionSectionClasses = computed(() => {
  return {
    'justify-between': hasDescriptionSection.value,
    'justify-end': hasActionsSection.value && !hasDescriptionSection.value
  }
})

const defaultLabelProps = computed(() => {
  return {
    margin: hasBadges.value ? 'none' : 'xs',
    ...props.labelProps
  }
})

const hasActionsSection = computed(() => !!slots.actions || hasDefaultButton.value || hasDefaultActionsMenu.value)
const hasBadges = computed(() => !!props.badges.length)
const hasLabel = computed(() => !!Object.keys(props.labelProps).length)
const hasDefaultButton = computed(() => !!Object.keys(props.buttonProps).length)
const hasDefaultActionsMenu = computed(() => !!Object.keys(props.actionsMenuProps).length)
const hasDescriptionSection = computed(() => props.description || slots.description)
const hasLabelSection = computed(() => hasLabel.value || slots.label || hasBadges.value)
</script>
