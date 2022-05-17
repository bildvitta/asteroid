<template>
  <div>
    <q-input ref="input" v-model="model" bottom-slots :error="errorData" v-bind="$attrs" :error-message="errorMessageData" :mask="mask" :outlined="outlined" :unmasked-value="unmaskedValue">
      <template v-for="(_, name) in $slots" #[name]="context">
        <slot :name="name" v-bind="context || {}" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'QasInput',

  inheritAttrs: false,

  props: {
    modelValue: {
      default: '',
      type: [String, Number]
    },

    unmaskedValue: {
      default: true,
      type: Boolean
    },

    outlined: {
      default: true,
      type: Boolean
    },

    removeErrorOnType: {
      type: Boolean
    },

    error: {
      type: Boolean
    },

    errorMessage: {
      type: String,
      default: ''
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
        if (this.removeErrorOnType && this.error) {
          this.errorData = false
          this.errorMessageData = ''
        }

        return this.$emit('update:modelValue', value)
      }
    }
  },

  watch: {
    mask () {
      const input = this.inputReference.$el?.querySelector('input')

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
      const length = first.split('#').length - 2
      return this.modelValue?.length > length ? second : first
    },

    validate (value) {
      return this.inputReference.validate(value)
    }
  }
}
</script>
