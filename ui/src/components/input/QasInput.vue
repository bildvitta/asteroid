<template>
  <div>
    <q-input ref="input" v-model="model" bottom-slots v-bind="$attrs" :mask="mask" :outlined="outlined" :unmasked-value="unmaskedValue">
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
      type: String
    },

    unmaskedValue: {
      default: true,
      type: Boolean
    },

    outlined: {
      default: true,
      type: Boolean
    }
  },

  emits: ['update:modelValue'],

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
