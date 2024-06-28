<template>
  <q-input ref="input" v-model="model" :autogrow="isTextarea" bottom-slots :counter="hasCounter" :dense="dense" :error="errorData" v-bind="$attrs" :error-message="errorMessage" :inputmode="defaultInputmode" :label="formattedLabel" :mask="currentMask" :outlined="outlined" :placeholder="placeholder" :unmasked-value="unmaskedValue" @paste="onPaste">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-input>
</template>

<script>
import { getRequiredLabel, getPlaceholder } from '../../helpers'

const Masks = {
  CompanyDocument: 'company-document',
  Document: 'document',
  PersonalDocument: 'personal-document',
  Phone: 'phone',
  PostalCode: 'postal-code'
}

export default {
  name: 'QasInput',

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

    required: {
      type: Boolean
    },

    unmaskedValue: {
      default: true,
      type: Boolean
    },

    useRemoveErrorOnType: {
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
    isTextarea () {
      return this.$attrs.type === 'textarea'
    },

    placeholder () {
      return this.$attrs.placeholder || getPlaceholder(this.mask || this.$attrs.type)
    },

    hasCounter () {
      return this.$attrs.counter ?? (this.$attrs.maxlength && this.isTextarea)
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
