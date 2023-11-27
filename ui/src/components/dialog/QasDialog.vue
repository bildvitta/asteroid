<template>
  <q-dialog ref="dialogRef" class="qas-dialog" data-cy="dialog" :persistent="persistent" v-bind="dialogProps" @hide="onDialogHide" @update:model-value="updateModelValue">
    <div class="bg-white q-pa-lg" :style="style">
      <header v-if="hasHeader" class="q-mb-lg">
        <slot name="header">
          <div class="items-center justify-between row">
            <h5 class="text-grey-9 text-h5" data-cy="dialog-title">{{ card.title }}</h5>

            <qas-btn v-if="isInfoDialog" v-close-popup color="grey-9" data-cy="dialog-close-btn" icon="sym_r_close" variant="tertiary" />
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
              <qas-actions v-bind="formattedActionsProps">
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
import QasBtn from '../btn/QasBtn.vue'
import QasActions from '../actions/QasActions.vue'

import useDynamicComponents from './composables/use-dynamic-components'
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
  'validate',
  'ok',
  'cancel',

  // eventos do plugin
  ...useDialogPluginComponent.emits
])

const screen = useScreen()
const attrs = useAttrs()
const slots = useSlots()

const { dialogRef, onDialogHide } = useDialogPluginComponent()

const form = ref(null)

const { defaultOk, hasOk, onOk } = useOk()
const { defaultCancel, hasCancel } = useCancel()
const { formattedActionsProps } = useActions({ hasOk, hasCancel })
const { descriptionComponent, mainComponent } = useDynamicComponents({ form, props, hasOk, onOk, emits })

const dialogProps = computed(() => {
  return {
    ...(!props.usePlugin && { modelValue: props.modelValue }),
    ...attrs
  }
})

const style = computed(() => {
  return {
    ...(props.useFullMaxWidth && { width: '100%' }),
    maxWidth: props.maxWidth || '470px',
    minWidth: props.minWidth || (screen.isSmall ? '' : '366px')
  }
})

const hasHeaderSlot = computed(() => !!slots.header)
const hasHeader = computed(() => hasHeaderSlot.value || props.card.title)

const isInfoDialog = computed(() => !hasOk.value && !hasCancel.value)

function updateModelValue (value) {
  emits('update:modelValue', value)
}

// composables
function useCancel () {
  const defaultCancel = computed(() => {
    return {
      label: 'Cancelar',
      outline: true,

      ...props.cancel,

      onClick: onCancel
    }
  })

  const hasCancel = computed(() => {
    return typeof props.cancel === 'boolean' ? props.cancel : !!Object.keys(props.cancel)
  })

  function onCancel () {
    props.cancel.onClick?.()
    emits('cancel')
  }

  return {
    defaultCancel,
    hasCancel
  }
}

function useOk () {
  const defaultOk = computed(() => {
    const { onClick, ...attrs } = props.ok

    return {
      label: 'Ok',
      type: (props.ok?.type || props.useForm) ? 'submit' : 'button',

      ...attrs,

      // adiciona somente se não estiver usando useForm pois o controle ficará no submit.
      ...(!props.useForm && { onClick: onOk })
    }
  })

  const hasOk = computed(() => typeof props.ok === 'boolean' ? props.ok : !!Object.keys(props.ok))

  function onOk () {
    props.ok.onClick?.()
    emits('ok')
  }

  return {
    defaultOk,
    hasOk,

    onOk
  }
}

function useActions ({ hasOk, hasCancel }) {
  const hasAllActions = computed(() => hasOk.value && hasCancel.value)

  const hasSingleAction = computed(() => {
    return (hasOk.value && !hasCancel.value) || (!hasOk.value && hasCancel.value)
  })

  const formattedActionsProps = computed(() => {
    const { useFullWidth, useEqualWidth } = props.actionsProps

    if (useFullWidth || useEqualWidth) {
      return props.actionsProps
    }

    return {
      useFullWidth: hasSingleAction.value,
      useEqualWidth: hasAllActions.value,
      ...props.actionsProps
    }
  })

  return {
    formattedActionsProps
  }
}
</script>

<style lang="scss">
.qas-dialog {
  .q-dialog__inner > div {
    box-shadow: $shadow-2;
  }
}
</style>
