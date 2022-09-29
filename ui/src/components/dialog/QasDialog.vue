<template>
  <q-dialog ref="dialog" :persistent="persistent" v-bind="dialogProps" @update:model-value="updateModelValue">
    <q-card v-bind="cardProps" class="q-pa-sm" :style="style">
      <q-card-section>
        <slot name="header">
          <div class="justify-between row">
            <div class="text-bold text-h6" data-cy="dialog-card-title">{{ card.title }}</div>
            <qas-btn v-if="useCloseButton" v-close-popup data-cy="dialog-close-btn" dense flat icon="o_close" rounded />
          </div>
        </slot>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <component :is="componentTag" ref="form">
          <slot name="description">
            <div v-if="card.description" data-cy="dialog-card-description">{{ card.description }}</div>
          </slot>
        </component>
      </q-card-section>

      <q-card-section>
        <slot name="actions">
          <qas-actions v-bind="actionsProps">
            <template #primary>
              <qas-btn v-if="ok" v-close-popup="!useForm" class="full-width" data-cy="dialog-card-ok-btn" v-bind="defaultOk" @click="submitHandler" />
            </template>

            <template #secondary>
              <qas-btn v-if="cancel" v-close-popup class="full-width" data-cy="dialog-card-cancel-btn" v-bind="defaultCancel" />
            </template>
          </qas-actions>
        </slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import QasActions from '../actions/QasActions.vue'

export default {
  name: 'QasDialog',

  components: {
    QasBtn,
    QasActions
  },

  props: {
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

    cardProps: {
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

    useCloseButton: {
      type: Boolean
    },

    useValidationAllAtOnce: {
      type: Boolean
    }
  },

  emits: [
    'update:modelValue',
    'validate'
  ],

  computed: {
    defaultCancel () {
      return {
        label: 'Cancelar',
        outline: true,
        ...this.cancel
      }
    },

    defaultOk () {
      return {
        label: 'Ok',
        type: this.ok?.type || this.useForm ? 'submit' : 'button',
        ...this.ok
      }
    },

    style () {
      return {
        maxWidth: this.maxWidth || (this.$qas.screen.isSmall ? '' : '600px'),
        minWidth: this.minWidth || (this.$qas.screen.isSmall ? '' : '400px')
      }
    },

    componentTag () {
      return this.useForm ? 'q-form' : 'div'
    },

    dialogProps () {
      return {
        ...(!this.usePlugin && { modelValue: this.modelValue }),
        ...this.$attrs
      }
    }
  },

  methods: {
    async submitHandler () {
      if (!this.useForm) return

      if (this.useValidationAllAtOnce) {
        let isAllComponentValid = true
        const components = this.$refs.form.getValidationComponents() || []

        for (const component of components) {
          const isValid = component?.validate?.()

          if (!isValid) {
            isAllComponentValid = false
          }
        }

        this.$emit('validate', isAllComponentValid)

        return
      }

      this.$emit('validate', await this.$refs.form.validate())
    },

    // método para funcionar como plugin
    show () {
      this.$refs.dialog.show()
    },

    // método para funcionar como plugin
    hide () {
      this.$refs.dialog.hide()
    },

    updateModelValue (value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
