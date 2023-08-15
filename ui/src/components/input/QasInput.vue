<template>
  <q-input ref="input" v-model="model" v-bind="$attrs" bottom-slots :counter="showCounter" :dense="dense" :error="errorData" :error-message="errorMessage" :inputmode="defaultInputmode" :mask="mask" :outlined="outlined" :placeholder="placeholder" :unmasked-value="unmaskedValue" @paste="onPaste">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-input>
</template>

<script>
import { getPlaceholder } from '../../helpers'

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
    error: {
      type: Boolean
    },

    errorMessage: {
      type: String,
      default: ''
    },

    dense: {
      default: true,
      type: Boolean
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
      currentMask: ''
    }
  },

  computed: {
    hasError () {
      return this.inputReference.hasError
    },

    inputReference () {
      return this.$refs.input
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

    placeholder () {
      const { placeholder, type } = this.$attrs

      return placeholder || getPlaceholder(this.mask || type)
    },

    showCounter () {
      const { counter, maxlength, type } = this.$attrs

      return counter ?? (maxlength && type === 'textarea')
    }
  },

  watch: {
    mask (value) {
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
