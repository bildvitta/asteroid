<template>
  <q-input ref="input" v-model="model" bottom-slots v-bind="$attrs" :dense="dense" :error="errorData" :error-message="errorMessage" :mask="mask" :outlined="outlined" :unmasked-value="unmaskedValue" @paste="onPaste">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-input>
</template>

<script>
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
      mask: ''
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
        this.handleErrors()

        return this.$emit('update:modelValue', value)
      }
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
      if (!this.mask) return

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

      const { mask } = this.$attrs
      const hasDefaultMask = Object.prototype.hasOwnProperty.call(this.masks, mask)

      this.$nextTick(() => {
        this.mask = hasDefaultMask ? this.masks[mask]() : mask
      })
    }
  }
}
</script>
