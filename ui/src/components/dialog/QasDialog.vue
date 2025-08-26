<template>
  <q-dialog ref="dialogRef" class="qas-dialog" :class="classes" data-cy="dialog" v-bind="dialogProps" :persistent="true" @update:model-value="updateModelValue">
    <div class="bg-white q-pa-md full-width qas-dialog__container" :style="style">
      <header v-if="hasHeader" class="q-mb-md">
        <slot name="header">
          <div class="items-center justify-between row">
            <qas-label data-cy="dialog-title" :label="props.title" margin="none" />

            <qas-btn v-close-popup color="grey-10" data-cy="dialog-close-btn" icon="sym_r_close" variant="tertiary" />
          </div>
        </slot>
      </header>

      <section class="text-body1 text-grey-8">
        <component :is="mainComponent.is" ref="form" v-bind="mainComponent.props">
          <slot name="description">
            <component :is="descriptionComponent" data-cy="dialog-description">
              {{ props.description }}
            </component>
          </slot>

          <div v-if="!isInfoDialog">
            <slot name="actions">
              <qas-actions v-bind="defaultActionsProps">
                <template v-if="hasOk" #primary>
                  <qas-btn class="qas-dialog__btn" v-close-popup="!props.useForm" data-cy="dialog-ok-btn" variant="primary" v-bind="defaultOk" />
                </template>

                <template v-if="hasCancel" #secondary>
                  <qas-btn class="qas-dialog__btn" v-close-popup data-cy="dialog-cancel-btn" v-bind="defaultCancel" variant="secondary" />
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
import QasLabel from '../label/QasLabel.vue'

import useCancel from './composables/use-cancel'
import useDynamicComponents from './composables/use-dynamic-components'
import useOk from './composables/use-ok'
import { useScreen } from '../../composables'

import { computed, ref, useAttrs, useSlots, provide } from 'vue'
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

  description: {
    type: String,
    default: ''
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

  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },

  title: {
    type: String,
    default: ''
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

const emit = defineEmits([
  // model
  'update:modelValue',

  // actions
  'cancel',
  'ok',
  'validate',

  // eventos do plugin
  ...useDialogPluginComponent.emits
])

provide('isDialog', true)

const attrs = useAttrs()
const screen = useScreen()
const slots = useSlots()

// usado para o plugin
const { dialogRef, onDialogHide } = useDialogPluginComponent()

// QForm template
const form = ref(null)

const composablesParams = { emit, form, props, screen, slots }

const { defaultCancel, hasCancel } = useCancel(composablesParams)
const { defaultOk, hasOk, onOk } = useOk(composablesParams)
const { descriptionComponent, mainComponent } = useDynamicComponents({ ...composablesParams, onOk, hasOk })

// composables
/**
 * Classes criadas para serem utilizadas quando usado com a prop "position", pois
 * o comportamento do dialog muda, e não é possível usar em conjunto com a prop
 * "useFullMaxWidth", então foi necessário uma trativa.
 */
const classes = computed(() => {
  const isRightPosition = attrs.position === 'right'
  const isLeftPosition = attrs.position === 'left'

  const sizes = {
    sm: 'qas-dialog--sm',
    md: 'qas-dialog--md',
    lg: 'qas-dialog--lg',
    xl: 'qas-dialog--xl'
  }

  return [
    sizes[props.size],
    {
      'qas-dialog--right': isRightPosition,
      'qas-dialog--left': isLeftPosition
    }
  ]
})

const dialogProps = computed(() => {
  const { title, ...attributes } = attrs

  return {
    ...(!props.usePlugin && { modelValue: props.modelValue }),
    ...attributes,

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

const hasHeader = computed(() => !!slots.header || props.title)
const isInfoDialog = computed(() => !hasOk.value && !hasCancel.value)

const defaultActionsProps = computed(() => {
  return {
    ...props.actionsProps,
    gutter: 'md'
  }
  // const { useFullWidth, useEqualWidth } = props.actionsProps

  // if (useFullWidth || useEqualWidth) return props.actionsProps

  // const hasAllActions = hasOk.value && hasCancel.value
  // const hasSingleAction = (hasOk.value && !hasCancel.value) || (!hasOk.value && hasCancel.value)

  // return {
  //   useFullWidth: hasSingleAction,
  //   // useEqualWidth: hasAllActions,

  //   ...props.actionsProps
  // }
})

function updateModelValue (value) {
  emit('update:modelValue', value)
}
</script>

<style lang="scss">
.qas-dialog {
  .q-dialog__inner > div {
    box-shadow: $shadow-2;
  }

  .q-dialog__inner--minimized {
    padding: var(--qas-spacing-md);
  }

  &--right {
    .q-dialog__inner {
      width: 100%;
      justify-content: end;
    }
  }

  &--left {
    .q-dialog__inner {
      width: 100%;
    }
  }

  &__container {

  }

  &__btn {
    min-width: 120px;
    width: 100%;
  }
}
</style>
