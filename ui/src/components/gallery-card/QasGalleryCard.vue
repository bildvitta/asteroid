<template>
  <div class="bg-white q-pa-md qas-gallery-card rounded-borders shadow-2" :class="classes">
    <header class="flat items-center no-wrap row" :class="headerClasses">
      <slot name="header">
        <div class="ellipsis q-mr-xs qas-gallery__name text-subtitle1">
          <slot v-if="props.card.name" name="name">
            {{ props.card.name }}
          </slot>
        </div>

        <div v-if="hasActions">
          <slot name="actions">
            <qas-actions-menu v-bind="defaultActionsMenuProps" />
          </slot>
        </div>
      </slot>
    </header>

    <div class="qas-gallery-card__image">
      <slot name="image">
        <q-img class="rounded-borders" height="100%" :src="props.card.url" v-bind="props.imageProps">
          <template #error>
            <div :class="errorClasses">
              <div class="text-center">
                <slot name="image-error-icon">
                  <div v-if="props.errorIcon">
                    <q-icon :name="props.errorIcon" size="sm" />
                  </div>
                </slot>

                <slot name="image-error">
                  <div>
                    {{ props.errorMessage }}
                  </div>
                </slot>
              </div>
            </div>
          </template>
        </q-img>
      </slot>
    </div>

    <div v-if="hasBottom" class="q-mt-md">
      <slot name="bottom">
        <qas-grid-generator v-if="hasGridGenerator" v-bind="props.gridGeneratorProps" />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

defineOptions({ name: 'QasGalleryCard' })

const props = defineProps({
  actionsMenuProps: {
    type: Object,
    default: () => ({})
  },

  card: {
    type: Object,
    default: () => ({})
  },

  disable: {
    type: Boolean
  },

  errorIcon: {
    type: String,
    default: ''
  },

  errorMessage: {
    type: String,
    default: ''
  },

  gridGeneratorProps: {
    type: Object,
    default: () => ({})
  },

  imageProps: {
    type: Object,
    default: () => ({})
  }
})

const slots = useSlots()

const errorClasses = [
  'bg-grey-4',
  'flex',
  'full-height',
  'full-width',
  'items-center',
  'justify-center',
  'text-grey-10',
  'text-subtitle2'
]

const classes = computed(() => {
  return {
    'text-grey-6': props.disable
  }
})

const headerClasses = computed(() => {
  return {
    'justify-between': props.card.name,
    'justify-right': !props.card.name,
    'text-grey-10': !props.disable,
    'q-mb-md': hasActions.value || props.card.name
  }
})

const defaultActionsMenuProps = computed(() => {
  const { buttonProps } = props.actionsMenuProps

  return {
    useLabel: false,
    ...props.actionsMenuProps,

    buttonProps: {
      disable: props.disable,
      ...buttonProps
    }
  }
})

const hasActionsSlot = computed(() => !!slots.actions)
const hasActions = computed(() => !!Object.keys(props.actionsMenuProps).length || hasActionsSlot.value)
const hasGridGenerator = computed(() => !!Object.keys(props.gridGeneratorProps).length)
const hasBottom = computed(() => !!slots.bottom || hasGridGenerator.value)
</script>

<style lang="scss">
.qas-gallery-card {
  &__image {
    height: 180px;
  }
}
</style>
