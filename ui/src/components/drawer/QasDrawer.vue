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

        <div>
          <qas-btn class="z-max" color="grey-10" data-cy="drawer-close-btn" icon="sym_r_close" variant="tertiary" @click="close" />
        </div>
      </div>
    </template>

    <template #description>
      <div>
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
import QasDialog from '../dialog/QasDialog.vue'
import QasBtn from '../btn/QasBtn.vue'

import useScreen from '../../composables/use-screen.js'

import { computed, provide } from 'vue'

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
    default: '60%'
  },

  persistent: {
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

  loading: {
    type: Boolean
  }
})

// emits
const model = defineModel({ type: Boolean })

// composables
const screen = useScreen()

// computed
const normalizedMaxWidth = computed(() => screen.isSmall ? '95%' : props.maxWidth)

const loadingStyle = computed(() => {
  return {
    right: `calc(100% - ${normalizedMaxWidth.value})`
  }
})

const attributes = computed(() => {
  return {
    ...props.dialogProps,

    title: props.title,
    cancel: false,
    maximized: true,
    ok: false,
    position: props.position
  }
})

// globals
/**
 * Manter dessa forma até issue #1431 ser resolvida.
 */
provide('dialogDefaultProps', computed(() => {
  return {
    maxWidth: normalizedMaxWidth.value,
    persistent: props.persistent
  }
}))

// functions
function close () {
  model.value = false
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
