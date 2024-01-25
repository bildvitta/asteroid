<template>
  <qas-dialog class="qas-drawer" v-bind="attributes" @update:model-value="onUpdateModelValue">
    <template #header>
      <div class="items-center justify-between row">
        <span data-cy="drawer-title">
          <slot name="title">
            <h3 v-if="props.title" class="text-h3">
              {{ props.title }}
            </h3>
          </slot>
        </span>

        <qas-btn v-close-popup class="z-max" color="grey-10" data-cy="drawer-close-btn" icon="sym_r_close" variant="tertiary" @click="emit('update:modelValue', false)" />
      </div>
    </template>

    <template #description>
      <div class="">
        <div class="relative-position" data-cy="drawer-default">
          <slot />
        </div>

        <div v-if="props.loading" class="qas-drawer__loading" :style="loadingStyle">
          <div class="full-height relative-position">
            <q-inner-loading :showing="props.loading">
              <q-spinner color="grey" size="2em" />
            </q-inner-loading>
          </div>
        </div>
      </div>
    </template>
  </qas-dialog>
</template>

<script setup>
import useScreen from '../../composables/use-screen.js'

import { computed, useAttrs } from 'vue'

defineOptions({
  name: 'QasDrawer',
  inheritAttrs: false
})

const props = defineProps({
  dialogProps: {
    type: Object,
    default: () => ({})
  },

  maxWidth: {
    type: String,
    default: ''
  },

  position: {
    type: String,
    default: 'left',
    validator: value => ['left', 'right'].includes(value)
  },

  title: {
    type: String,
    default: ''
  },

  loading: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()
const screen = useScreen()

const loadingStyle = computed(() => {
  return {
    right: `calc(100% - ${props.maxWidth})`
  }
})

const attributes = computed(() => {
  const maxWidth = screen.isSmall ? '100%' : props.maxWidth

  const { modelValue } = attrs

  return {
    persistent: false,
    modelValue,

    ...props.dialogProps,

    cancel: false,
    maxWidth,
    maximized: true,
    ok: false,
    position: props.position,
    useFullMaxWidth: true
  }
})

function onUpdateModelValue (value) {
  emit('update:modelValue', value)
}
</script>

<style lang="scss">
.qas-drawer {
  &__loading {
    height: 100vh;
    left: 0;
    position: absolute;
    top: 0;
  }
}
</style>
