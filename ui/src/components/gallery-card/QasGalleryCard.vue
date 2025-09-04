<template>
  <qas-box class="bg-white qas-gallery-card" :class="classes" v-bind="boxProps">
    <qas-header v-if="hasHeader" v-bind="defaultHeaderProps" />

    <div v-if="props.useVideo" class="rounded-borders">
      <slot name="video">
        <q-video v-bind="defaultVideoProps" />
      </slot>
    </div>

    <div v-else class="qas-gallery-card__image">
      <slot name="image">
        <q-img class="rounded-borders" height="100%" :src="props.url" v-bind="props.imageProps">
          <template #error>
            <slot name="image-error-container">
              <div class="bg-grey-4 flex full-height full-width items-center justify-center text-grey-10 text-subtitle1">
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
            </slot>
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
import QasBox from '../box/QasBox.vue'
import QasGridGenerator from '../grid-generator/QasGridGenerator.vue'
import QasHeader from '../header/QasHeader.vue'

import { computed, useSlots, inject } from 'vue'

defineOptions({ name: 'QasGalleryCard' })

const props = defineProps({
  disable: {
    type: Boolean
  },

  errorIcon: {
    type: String,
    default: 'sym_r_error'
  },

  errorMessage: {
    type: String,
    default: 'Falha ao carregar imagem.'
  },

  headerProps: {
    type: Object,
    default: () => ({})
  },

  gridGeneratorProps: {
    type: Object,
    default: () => ({})
  },

  imageProps: {
    type: Object,
    default: () => ({})
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

// computeds
const classes = computed(() => {
  return {
    'text-grey-6': props.disable
  }
})

const hasHeader = computed(() => {
  return props.headerProps?.labelProps?.label || Object.keys(props.headerProps?.actionsMenuProps || {}).length
})

/**
 * Vai ser "bordered" quando:
 * - Estiver dentro de um QasBox (isInsideBox)
 * - Ou quando houver erro (hasError)
 * Se não, terá shadow.
 */
const boxProps = computed(() => {
  const hasPadding = !!(
    props.headerProps.labelProps?.label ||
    hasActions.value ||
    hasBottom.value ||
    hasGridGenerator.value
  )

  return {
    outlined: isInsideBox,
    unelevated: isInsideBox,
    useSpacing: hasPadding
  }
})

const defaultHeaderProps = computed(() => {
  const { labelProps, actionsMenuProps } = props.headerProps || {}

  return {
    useEllipsis: true,

    ...props.headerProps,

    labelProps: {
      ...labelProps,
      typography: 'h5'
    },

    actionsMenuProps: {
      useLabel: false,

      ...actionsMenuProps,

      buttonProps: {
        disable: props.disable,
        ...actionsMenuProps?.buttonProps
      }
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

const hasActions = computed(() => !!Object.keys(props.headerProps.actionsMenuProps || {}).length)
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
