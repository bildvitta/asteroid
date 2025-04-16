<template>
  <qas-box class="bg-white qas-gallery-card" :class="classes" v-bind="boxProps">
    <header class="flat items-center no-wrap row" :class="headerClasses">
      <slot name="header">
        <div class="ellipsis q-mr-xs qas-gallery__name text-subtitle1">
          <slot v-if="props.name" name="name">
            {{ name }}
          </slot>
        </div>

        <div v-if="hasActions">
          <slot name="actions">
            <qas-actions-menu v-bind="defaultActionsMenuProps" />
          </slot>
        </div>
      </slot>
    </header>

    <div v-if="props.useVideo">
      <slot name="video">
        <q-video v-bind="defaultVideoProps" />
      </slot>
    </div>

    <div v-else class="qas-gallery-card__image">
      <slot name="image">
        <q-img class="rounded-borders" height="100%" :src="props.url" v-bind="props.imageProps">
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
  </qas-box>
</template>

<script setup>
import { computed, useSlots, inject } from 'vue'

defineOptions({ name: 'QasGalleryCard' })

const props = defineProps({
  actionsMenuProps: {
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
  },

  name: {
    type: String,
    default: ''
  },

  url: {
    type: String,
    default: ''
  },

  useVideo: {
    type: Boolean
  },

  videoProps: {
    type: Object,
    default: () => ({})
  }
})

const slots = useSlots()

const isInsideBox = inject('isBox', false)

const boxProps = {
  outlined: isInsideBox,
  unelevated: isInsideBox
}

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

// computeds
const classes = computed(() => {
  return {
    'text-grey-6': props.disable
  }
})

const headerClasses = computed(() => {
  return {
    'justify-between': props.name,
    'justify-right': !props.name,
    'text-grey-10': !props.disable,
    'q-mb-md': hasActions.value || props.name
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

const defaultVideoProps = computed(() => {
  return {
    ratio: 16 / 9,

    ...props.videoProps,

    src: props.url
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
