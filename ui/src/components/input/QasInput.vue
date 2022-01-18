<template>
  <div>
    <q-input ref="input" v-model="model" bottom-slots unmasked-value v-bind="$attrs" :mask="mask">
      <template v-for="(_, name) in $slots" v-slot:[name]="context">
        <slot :name="name" v-bind="context || {}" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'QasInput',

  props: {
    modelValue: {
      default: '',
      type: String
    }
  },

  emits: ['update:modelValue'],

  computed: {
    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
    },

    inputReference () {
      return this.$refs.input
    },

    hasError () {
      return this.inputReference.hasError
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
    toggleMask (first, second) {
      const length = first.split('#').length - 2
      return this.modelValue?.length > length ? second : first
    },

    validate (value) {
      return this.inputReference.validate(value)
    },

    focus () {
      return this.inputReference.focus()
    },

    resetValidation () {
      return this.inputReference.resetValidation()
    }
  }
}
</script>
