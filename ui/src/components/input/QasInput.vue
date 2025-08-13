<template>
  <q-input ref="input" v-model="model" :autogrow="isTextarea" bottom-slots :class="classes" :counter="hasCounter" :dense="dense" :error="errorData" v-bind="$attrs" :error-message="errorMessage" :inputmode="defaultInputmode" :label="formattedLabel" :mask="currentMask" no-error-icon :outlined="outlined" :placeholder="placeholder" :readonly :unmasked-value="unmaskedValue" @paste="onPaste">
    <template v-if="icon" #prepend>
      <q-icon :name="icon" size="xs" />
    </template>

    <template v-if="hasAppendComponent" #append>
      <component
        :is="appendComponent.is"
        v-bind="appendComponent.props"
      />
    </template>

    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-input>
</template>

<script>
import { getRequiredLabel, getPlaceholder } from '../../helpers'

import { defineAsyncComponent } from 'vue'

const Masks = {
  CompanyDocument: 'company-document',
  Document: 'document',
  PersonalDocument: 'personal-document',
  Phone: 'phone',
  PostalCode: 'postal-code'
}

export default {
  name: 'QasInput',

  components: {
    QasCopy: defineAsyncComponent(() => import('../copy/QasCopy.vue'))
  },

  inheritAttrs: false,

  props: {
    dense: {
      default: true,
      type: Boolean
    },

    error: {
      type: Boolean
    },

    errorMessage: {
      type: String,
      default: ''
    },

    mask: {
      type: String,
      default: ''
    },

    modelValue: {
      default: '',
      type: [String, Number]
    },

    outlined: {
      type: Boolean
    },

    readonly: {
      type: Boolean
    },

    required: {
      type: Boolean
    },

    unmaskedValue: {
      default: true,
      type: Boolean
    },

    useRemoveErrorOnType: {
      type: Boolean
    },

    icon: {
      type: String,
      default: ''
    },

    iconRight: {
      type: String,
      default: ''
    },

    useCopy: {
      type: Boolean
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      errorData: false,
      currentMask: '',
      inputReference: null
    }
  },

  computed: {
    hasError () {
      return this.inputReference.hasError
    },

    masks () {
      return {
        [Masks.CompanyDocument]: () => '##.###.###/####-##',
        [Masks.Document]: () => this.toggleMask('###.###.###-###', '##.###.###/####-##'),
        [Masks.PersonalDocument]: () => '###.###.###-##',
        [Masks.Phone]: () => this.toggleMask('(##) ####-#####', '(##) #####-####'),
        [Masks.PostalCode]: () => '#####-###'
      }
    },

    defaultInputmode () {
      const { inputmode, type } = this.$attrs

      const defaults = {
        [Masks.CompanyDocument]: 'numeric',
        [Masks.Document]: 'numeric',
        [Masks.PersonalDocument]: 'numeric',
        [Masks.Phone]: 'tel',
        [Masks.PostalCode]: 'numeric',

        // types
        email: 'email'
      }

      return inputmode || defaults[this.mask || type]
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.handleErrors()

        return this.$emit('update:modelValue', value)
      }
    },

    formattedLabel () {
      const { label } = this.$attrs

      return getRequiredLabel({ label, required: this.required })
    },

    // redesign
    classes () {
      return {
        'qas-input--has-icon': this.hasPrepend
      }
    },

    isTextarea () {
      return this.$attrs.type === 'textarea'
    },

    placeholder () {
      return this.$attrs.placeholder || getPlaceholder(this.mask || this.$attrs.type)
    },

    hasCounter () {
      return this.$attrs.counter ?? (this.$attrs.maxlength && this.isTextarea)
    },

    hasPrepend () {
      return !!this.$slots.prepend || this.icon
    },

    /**
     * Só existe o componente QasCopy quando utilizado em conjunto com a prop readonly.
     */
    hasCopy () {
      return this.useCopy && this.readonly
    },

    hasAppendComponent () {
      return this.hasCopy || !!this.iconRight
    },

    /**
     * Importa o dinamicamente os componentes para ser usado no append.
     *
     * a propriedade "useCopy" tem prioridade sobre a propriedade "iconRight".
     */
    appendComponent () {
      return {
        is: this.hasCopy ? 'qas-copy' : 'q-icon',
        props: {
          ...(this.hasCopy && {
            text: this.model,
            useText: false,
            disable: true
          }),

          ...(this.iconRight && {
            name: this.iconRight,
            size: 'xs'
          })
        }
      }
    }
  },

  watch: {
    currentMask (value) {
      if (!value) return

      const input = this.getInput()

      requestAnimationFrame(() => {
        input.selectionStart = input.value ? input.value.length : ''
      })
    },

    modelValue: {
      handler () {
        this.handleMask()
      },
      immediate: true
    },

    error: {
      handler (value) {
        this.errorData = value
      },

      immediate: true
    }
  },

  mounted () {
    this.inputReference = this.$refs.input
  },

  methods: {
    focus () {
      return this.inputReference.focus()
    },

    resetValidation () {
      return this.inputReference.resetValidation()
    },

    toggleMask (first, second) {
      const length = first.split('#').length - 2
      return this.modelValue?.length > length ? second : first
    },

    validate (value) {
      return this.inputReference.validate(value)
    },

    onPaste (event) {
      if (!this.currentMask) return

      const value = event.clipboardData.getData('text')
      const input = this.getInput()

      requestAnimationFrame(() => {
        this.$emit('update:modelValue', value)
        input.selectionStart = input.value ? input.value.length : ''
      })
    },

    getInput () {
      return this.inputReference?.$el?.querySelector('input')
    },

    handleErrors () {
      if (this.useRemoveErrorOnType && this.error) {
        this.errorData = false
      }
    },

    handleMask () {
      if (!this.modelValue?.length) return

      const hasDefaultMask = Object.prototype.hasOwnProperty.call(this.masks, this.mask)

      this.$nextTick(() => {
        this.currentMask = hasDefaultMask ? this.masks[this.mask]() : this.mask
      })
    }
  }
}
</script>
