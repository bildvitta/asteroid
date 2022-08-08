<template>
  <q-input ref="input" v-model="model" bottom-slots :error="errorData" v-bind="$attrs" :error-message="errorMessageData" :mask="mask" :outlined="outlined" :unmasked-value="unmaskedValue" @paste="onPaste">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'QasInput',

  props: {
    error: {
      type: Boolean
    },

    errorMessage: {
      type: String,
      default: ''
    },

    modelValue: {
      default: '',
      type: [String, Number]
    },

    outlined: {
      default: true,
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
      messageErrorData: ''
    }
  },

  computed: {
    hasError () {
      return this.inputReference.hasError
    },

    inputReference () {
      return this.$refs.input
    },

    mask () {
      const { mask } = this.$attrs
      const hasDefaultMask = Object.prototype.hasOwnProperty.call(this.masks, mask)

      return hasDefaultMask ? this.masks[mask]() : mask
    },

    masks () {
      return {
        'company-document': () => '##.###.###/####-##',
        document: () => this.toggleMask('###.###.###-###', '##.###.###/####-##'),
        'personal-document': () => '###.###.###-##',
        phone: () => this.toggleMask('(##) ####-#####', '(##) #####-####'),
        'postal-code': () => '#####-###'
      }
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        if (this.useRemoveErrorOnType && this.error) {
          this.errorData = false
          this.errorMessageData = ''
        }

        return this.$emit('update:modelValue', value)
      }
    }
  },

  watch: {
    mask () {
      const input = this.getInput()

      requestAnimationFrame(() => {
        input.selectionStart = input.value ? input.value.length : ''
      })
    },

    error: {
      handler (value) {
        this.errorData = value
      },

      immediate: true
    },

    errorMessage: {
      handler (value) {
        this.errorMessageData = value
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
      if (!this.modelValue?.length) return

      const length = first.split('#').length - 2
      return this.modelValue?.length > length ? second : first
    },

    validate (value) {
      return this.inputReference.validate(value)
    },

    onPaste (event) {
      if (!this.mask) return

      const value = event.clipboardData.getData('text')
      const input = this.getInput()

      requestAnimationFrame(() => {
        this.$emit('update:modelValue', value)
        input.selectionStart = input.value ? input.value.length : ''
      })
    },

    getInput () {
      return this.inputReference.$el?.querySelector('input')
    }
  }
}
</script>
