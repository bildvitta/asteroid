<template>
  <q-input ref="mask" :value="value" v-bind="$attrs" :unmasked-value="unmaskedValue" v-on="$listeners" :mask="mask" bottom-slots>
    <slot v-for="(slot, key) in $slots" :name="key" :slot="key" />
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope"/>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'QasInput',

  props: {
    value: {
      type: String,
      default: ''
    },

    unmaskedValue: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    mask () {
      const input = this.$refs.mask.$refs.input
      requestAnimationFrame(() => input.selectionStart = input.value ? input.value.length : '')
    }
  },

  computed: {
    mask () {
      const { mask } = this.$attrs
      return this.masks.hasOwnProperty(mask) ? this.masks[mask]() : mask
    },

    masks () {
      return {
        'phone': () => this.maskLenght(10, '(##) ####-#####', '(##) #####-####'),
        'personal-document': () => '###.###.###-##',
        'company-document': () => '##.###.###/####-##',
        'document': () => this.maskLenght(11, '###.###.###-###', '##.###.###/####-##'),
        'postal-code': () => '#####-###'
      }
    }
  },

  methods: {
    maskLenght (length, first, second) {
      return this.value.length > length ? second : first
    }
  }
}
</script>
