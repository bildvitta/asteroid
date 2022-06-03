<template>
  <div>
    <q-input ref="mask" v-model="model" v-bind="$attrs" bottom-slots :mask="mask" unmasked-value v-on="listeners" @paste="onPaste">
      <slot v-for="(slot, key) in $slots" :slot="key" :name="key" />
      <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
        <slot :name="key" v-bind="scope" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'QasInput',

  props: {
    value: {
      default: '',
      type: String
    }
  },

  computed: {
    model: {
      get () {
        return this.value
      },

      set (value) {
        return this.$emit('input', value)
      }
    },

    listeners () {
      const { input, ...listeners } = this.$listeners
      return listeners
    },

    inputReference () {
      return this.$refs.mask
    },

    hasError () {
      return this.inputReference.hasError
    },

    mask () {
      const { mask } = this.$attrs

      return Object.prototype.hasOwnProperty.call(this.masks, mask)
        ? this.masks[mask]()
        : mask
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
      const input = this.getInput()

      requestAnimationFrame(() => {
        input.selectionStart = input.value ? input.value.length : ''
      })
    }
  },

  methods: {
    toggleMask (first, second) {
      if (!this.value.length) return

      const length = first.split('#').length - 2
      return this.value?.length > length ? second : first
    },

    validate (value) {
      return this.inputReference.validate(value)
    },

    focus () {
      return this.inputReference.focus()
    },

    resetValidation () {
      return this.inputReference.resetValidation()
    },

    onPaste (event) {
      if (!this.mask) return

      const value = event.clipboardData.getData('text')
      const input = this.getInput()

      requestAnimationFrame(() => {
        this.$emit('input', value)
        input.selectionStart = input.value ? input.value.length : ''
      })
    },

    getInput () {
      return this.inputReference.$el?.querySelector('input')
    }
  }
}
</script>
