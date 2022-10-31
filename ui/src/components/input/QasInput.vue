<template>
  <!-- <div> -->
  <q-input ref="input" bottom-slots :error="errorData" :error-message="errorMessageData" v-bind="$attrs" :mask="mask" :model-value="model2" :outlined="outlined" :unmasked-value="unmaskedValue" @update:model-value="onUpdateModelValue">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-input>
  <!-- </div> -->
</template>

<script>
import { extend } from 'quasar'

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
      messageErrorData: '',
      model2: ''
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
      const { mask } = extend(true, {}, this.$attrs)
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
        // if (this.useRemoveErrorOnType && this.error) {
        //   this.errorData = false
        //   this.errorMessageData = ''
        // }

        this.$emit('update:modelValue', value)
      }
    },

    attributes () {
      const { 'onUpdate:modelValue': event, ...rest } = this.$attrs
      console.log(event, 'KRL')

      return rest
    }
  },

  watch: {
    mask () {
      const input = this.getInput()

      requestAnimationFrame(() => {
        input.selectionStart = input.value ? input.value.length : ''
      })
    },

    modelValue: {
      handler (value, oldValue) {
        this.model2 = value
      },
      immediate: true
    },

    // model2: {
    //   handler (value) {
    //     this.$emit('update:modelValue', value)
    //   }
    // },

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
    },

    onUpdateModelValue (value) {
      console.log(value, 'fui chamado quantas vezes?')
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
