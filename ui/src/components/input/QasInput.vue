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
      type: String,
      default: ''
    }
  },

  computed: {
    mask () {
      const { mask } = this.$attrs
      return Object.prototype.hasOwnProperty.call(this.masks, mask) ? this.masks[mask]() : mask
    },

    masks () {
      return {
        phone: () => this.maskLenght(10, '(##) ####-#####', '(##) #####-####'),
        'personal-document': () => '###.###.###-##',
        'company-document': () => '##.###.###/####-##',
        document: () => this.maskLenght(11, '###.###.###-###', '##.###.###/####-##'),
        'postal-code': () => '#####-###'
      }
    }
  },

  watch: {
    mask () {
      const input = this.$refs.mask.$refs.input
      requestAnimationFrame(() => (input.selectionStart = input.value ? input.value.length : ''))
    }
  },

  methods: {
    maskLenght (length, first, second) {
      return this.value.length > length ? second : first
    }
  }
}
</script>
