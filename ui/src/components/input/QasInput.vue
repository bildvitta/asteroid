<template>
  <q-input ref="mask" v-bind="$attrs" bottom-slots :mask="mask" unmasked-value :value="value" v-on="$listeners">
    <slot v-for="(slot, key) in $slots" :slot="key" :name="key" />
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    value: {
      default: '',
      type: String
    }
  },

  computed: {
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
      const input = this.$refs.mask.$refs.input

      requestAnimationFrame(() => {
        input.selectionStart = input.value ? input.value.length : ''
      })
    }
  },

  methods: {
    toggleMask (first, second) {
      const length = first.split('#').length - 2
      return this.value.length > length ? second : first
    }
  }
}
</script>
