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
        <q-img class="rounded-borders" height="100%" :src="props.url" v-bind="defaultImgProps">
          <template #error>
            <div :class="errorClasses">
              <div class="text-center">
                <slot name="image-error-icon">
                  <div v-if="props.errorIcon">
                    <q-icon class="text-negative" :name="props.errorIcon" size="md" />
                  </div>
                </slot>

                <slot name="image-error">
                  <div class="q-mt-xs">
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
import QasActionsMenu from '../actions-menu/QasActionsMenu.vue'
import QasBox from '../box/QasBox.vue'
import QasGridGenerator from '../grid-generator/QasGridGenerator.vue'

import { computed, useSlots, inject, ref } from 'vue'

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

// globals
const isInsideBox = inject('isBox', false)

// composables
const slots = useSlots()

// refs
const hasError = ref(false)

// consts
const errorClasses = [
  'bg-grey-4',
  'flex',
  'full-height',
  'full-width',
  'items-center',
  'justify-center',
  'text-grey-10',
  'text-subtitle1'
]

// computeds
const classes = computed(() => {
  return {
    'text-grey-6': props.disable
  }
})

/**
 * Vai ser "bordered" quando:
 * - Estiver dentro de um QasBox (isInsideBox)
 * - Ou quando houver erro (hasError)
 * Se não, terá shadow.
 */
const boxProps = computed(() => {
  const hasPadding = !!(props.name || hasActions.value)
  const isBordered = (isInsideBox || hasError.value)

  return {
    outlined: isBordered,
    unelevated: isBordered,
    useSpacing: hasPadding
  }
})

const headerClasses = computed(() => {
  return {
    'justify-between': props.name,
    'justify-right': !props.name,
    'text-grey-10': !props.disable && !hasError.value,
    'text-negative': hasError.value,
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
      ...buttonProps,
      ...(hasError.value && { color: 'negative' })
    }
  }
})

const defaultImgProps = computed(() => {
  return {
    ...props.imageProps,

    onError: () => {
      setHasError()
      props.imageProps?.onError?.() // repassa o evento onError se existir
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

// functions
function setHasError () {
  hasError.value = true
}
</script>

<style lang="scss">
.qas-gallery-card {
  &__image {
    height: 180px;
  }
}
</style>
