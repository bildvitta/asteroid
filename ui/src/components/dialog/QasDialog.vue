<template>
  <q-dialog ref="dialogRef" class="qas-dialog" data-cy="dialog" :persistent="persistent" v-bind="dialogProps" @update:model-value="updateModelValue">
    <div class="bg-white q-pa-lg" :style="style">
      <header v-if="hasHeader" class="q-mb-lg">
        <slot name="header">
          <div class="items-center justify-between row">
            <h5 class="text-h5" data-cy="dialog-title">{{ card.title }}</h5>

            <qas-btn v-if="isInfoDialog" v-close-popup color="grey-10" data-cy="dialog-close-btn" icon="sym_r_close" variant="tertiary" />
          </div>
        </slot>
      </header>

      <section class="text-body1 text-grey-8">
        <component :is="mainComponent.is" ref="form" v-bind="mainComponent.props">
          <slot name="description">
            <component :is="descriptionComponent" data-cy="dialog-description">{{ card.description }}</component>
          </slot>

          <div v-if="!isInfoDialog">
            <slot name="actions">
              <qas-actions v-bind="defaultActionsProps">
                <template v-if="hasOk" #primary>
                  <qas-btn v-close-popup="!useForm" class="full-width" data-cy="dialog-ok-btn" variant="primary" v-bind="defaultOk" />
                </template>

                <template v-if="hasCancel" #secondary>
                  <qas-btn v-close-popup class="full-width" data-cy="dialog-cancel-btn" v-bind="defaultCancel" variant="secondary" />
                </template>
              </qas-actions>
            </slot>
          </div>
        </component>
      </section>
    </div>
  </q-dialog>
</template>

<script setup>
import QasActions from '../actions/QasActions.vue'
import QasBtn from '../btn/QasBtn.vue'

import useCancel from './composables/use-cancel'
import useDynamicComponents from './composables/use-dynamic-components'
import useOk from './composables/use-ok'
import { useScreen } from '../../composables'

import { computed, ref, useAttrs, useSlots } from 'vue'
import { useDialogPluginComponent } from 'quasar'

defineOptions({ name: 'QasDialog' })

const props = defineProps({
  actionsProps: {
    default: () => ({}),
    type: Object
  },

  cancel: {
    default: () => ({}),
    type: [Object, Boolean]
  },

  card: {
    default: () => ({}),
    type: Object
  },

  maxWidth: {
    default: '',
    type: String
  },

  minWidth: {
    default: '',
    type: String
  },

  ok: {
    default: () => ({}),
    type: [Object, Boolean]
  },

  persistent: {
    default: true,
    type: Boolean
  },

  useForm: {
    type: Boolean
  },

  modelValue: {
    type: Boolean
  },

  usePlugin: {
    type: Boolean
  },

  useFullMaxWidth: {
    type: Boolean
  },

  useValidationAllAtOnce: {
    type: Boolean
  }
})

const emits = defineEmits([
  // model
  'update:modelValue',

  // actions
  'cancel',
  'ok',
  'validate',

  // eventos do plugin
  ...useDialogPluginComponent.emits
])

const attrs = useAttrs()
const screen = useScreen()
const slots = useSlots()

// usado para o plugin
const { dialogRef, onDialogHide } = useDialogPluginComponent()

// QForm template
const form = ref(null)

const composablesParams = { emits, form, props, screen, slots }

const { defaultCancel, hasCancel } = useCancel(composablesParams)
const { defaultOk, hasOk, onOk } = useOk(composablesParams)
const { descriptionComponent, mainComponent } = useDynamicComponents({ ...composablesParams, onOk, hasOk })

const dialogProps = computed(() => {
  return {
    ...(!props.usePlugin && { modelValue: props.modelValue }),
    ...attrs,

    onHide: onDialogHide
  }
})

const style = computed(() => {
  return {
    ...(props.useFullMaxWidth && { width: '100%' }),

    maxWidth: props.maxWidth || '470px',
    minWidth: props.minWidth || (screen.isSmall ? '' : '366px')
  }
})

const hasHeader = computed(() => !!slots.header || props.card.title)
const isInfoDialog = computed(() => !hasOk.value && !hasCancel.value)

const defaultActionsProps = computed(() => {
  const { useFullWidth, useEqualWidth } = props.actionsProps

  if (useFullWidth || useEqualWidth) return props.actionsProps

  const hasAllActions = hasOk.value && hasCancel.value
  const hasSingleAction = (hasOk.value && !hasCancel.value) || (!hasOk.value && hasCancel.value)

  return {
    useFullWidth: hasSingleAction,
    useEqualWidth: hasAllActions,

    ...props.actionsProps
  }
})

function updateModelValue (value) {
  emits('update:modelValue', value)
}
</script>

<style lang="scss">
.qas-dialog {
  .q-dialog__inner > div {
    box-shadow: $shadow-2;
  }
}
</style>
