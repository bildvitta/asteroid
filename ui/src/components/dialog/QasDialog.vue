<template>
  <q-dialog ref="dialog" class="qas-dialog" :persistent="persistent" v-bind="dialogProps" @update:model-value="updateModelValue">
    <div class="bg-white q-pa-lg" :style="style">
      <header v-if="hasHeader" class="q-mb-lg">
        <slot name="header">
          <div class="items-center justify-between row">
            <h5 class="text-grey-9 text-h5">{{ card.title }}</h5>

            <qas-btn v-if="isInfoDialog" v-close-popup color="grey-9" icon="sym_r_close" variant="tertiary" />
          </div>
        </slot>
      </header>

      <section class="text-body1 text-grey-8">
        <component :is="componentTag" ref="form" v-bind="componentProps">
          <slot name="description">
            <component :is="descriptionComponentTag">{{ card.description }}</component>
          </slot>

          <div v-if="!isInfoDialog">
            <slot name="actions">
              <qas-actions v-bind="formattedActionsProps">
                <template v-if="hasOk" #primary>
                  <qas-btn v-close-popup="!useForm" class="full-width" variant="primary" v-bind="defaultOk" />
                </template>

                <template v-if="hasCancel" #secondary>
                  <qas-btn v-close-popup class="full-width" v-bind="defaultCancel" variant="secondary" />
                </template>
              </qas-actions>
            </slot>
          </div>
        </component>
      </section>
    </div>
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
  },

  emits: [
    // model
    'update:modelValue',

    // actions
    'validate',
    'ok',
    'cancel'
  ],

  computed: {
    defaultCancel () {
      return {
        label: 'Cancelar',
        outline: true,

        ...this.cancel,

        onClick: this.onCancel
      }
    },

    defaultOk () {
      return {
        label: 'Ok',
        type: this.ok?.type || this.useForm ? 'submit' : 'button',

        ...this.ok,

        // adiciona somente se não estiver usando useForm pois o controle ficará no submit.
        ...(!this.useForm && { onClick: this.onOk })
      }
    },

    style () {
      return {
        ...(this.useFullMaxWidth && { width: '100%' }),
        maxWidth: this.maxWidth || '470px',
        minWidth: this.minWidth || (this.$qas.screen.isSmall ? '' : '366px')
      }
    },

    componentTag () {
      return this.useForm ? 'q-form' : 'div'
    },

    componentProps () {
      /**
       * adiciona evento de submit caso useForm seja true,
       * uma vez que somente o q-form possui este evento.
      */
      return {
        ...(this.useForm && { onSubmit: this.onSubmit })
      }
    },

    dialogProps () {
      return {
        ...(!this.usePlugin && { modelValue: this.modelValue }),
        ...this.$attrs
      }
    },

    hasOk () {
      return typeof this.ok === 'boolean' ? this.ok : !!Object.keys(this.ok)
    },

    hasCancel () {
      return typeof this.cancel === 'boolean' ? this.cancel : !!Object.keys(this.cancel)
    },

    hasAllActions () {
      return this.hasOk && this.hasCancel
    },

    hasSingleAction () {
      return (this.hasOk && !this.hasCancel) || (!this.hasOk && this.hasCancel)
    },

    hasHeaderSlot () {
      return !!this.$slots.header
    },

    hasHeader () {
      return this.hasHeaderSlot || this.card.title
    },

    isInfoDialog () {
      return !this.hasOk && !this.hasCancel
    },

    formattedActionsProps () {
      const { useFullWidth, useEqualWidth } = this.actionsProps

      if (useFullWidth || useEqualWidth) {
        return this.actionsProps
      }

      return {
        useFullWidth: this.hasSingleAction,
        useEqualWidth: this.hasAllActions,
        ...this.actionsProps
      }
    },

    hasRenderFunction () {
      const description = this.card.description

      return typeof description === 'object' && description !== null && !Array.isArray(description)
    },

    descriptionComponentTag () {
      return this.hasRenderFunction ? this.card.description : 'div'
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
    },

    onOk () {
      this.ok?.onClick?.()
      this.$emit('ok')
    },

    onCancel () {
      this.cancel?.onClick?.()
      this.$emit('cancel')
    },

    /**
     * Sem este método, ao clicar enter com a prop useForm ativada a tela era recarregada,
     * e a ação de click do botão não era chamada pois ele não esta dentro do form.
    */
    onSubmit (event) {
      event.preventDefault()

      if (this.hasOk) {
        this.onOk()
        this.submitHandler()
      }
    }
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
