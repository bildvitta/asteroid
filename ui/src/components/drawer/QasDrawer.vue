<template>
  <qas-dialog v-model="model" class="qas-drawer" v-bind="attributes">
    <template #header>
      <div class="items-center justify-between row">
        <span data-cy="drawer-title">
          <slot name="title">
            <h3 v-if="props.title" class="text-h3">
              {{ props.title }}
            </h3>
          </slot>
        </span>

        <qas-btn v-if="useCloseButton" v-close-popup color="grey-10" data-cy="drawer-close-btn" icon="sym_r_close" variant="tertiary" @click="emit('update:modelValue', false)" />
      </div>
    </template>

    <template #description>
      <div>
        <slot />
      </div>
    </template>
  </qas-dialog>
</template>

<script setup>
import useScreen from '../../composables/use-screen.js'

import { computed } from 'vue'

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
    default: '680px'
  },

  modelValue: {
    type: Boolean
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

  useCloseButton: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const screen = useScreen()

const attributes = computed(() => {
  const maxWidth = screen.isSmall ? '100%' : props.maxWidth

  return {
    ...props.dialogProps,

    cancel: false,
    maxWidth,
    maximized: true,
    ok: false,
    position: props.position,
    useFullMaxWidth: true
  }
})

const model = computed({
  get () {
    return props.modelValue
  },

  set () {
    emit('update:modelValue', props.modelValue)
  }
})
</script>

<style lang="scss">
.qas-drawer {
  .q-dialog__inner {
    // width: 100%;
    // justify-content: end;
  }

  &--right {

  }
}
</style>
