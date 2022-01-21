<template>
  <div class="text-bold text-subtitle2" :class="labelClass">
    <slot :label-with-suffix="labelWithSuffix">{{ labelWithSuffix }}</slot>
  </div>
</template>

<script>
import { addCounterSuffix } from '../../helpers'

export default {
  name: 'QasLabel',

  props: {
    count: {
      default: 0,
      type: [Number, String]
    },

    label: {
      default: '',
      type: String
    },

    margin: {
      default: 'sm',
      type: String
    }
  },

  computed: {
    labelClass () {
      return `q-mb-${this.margin}`
    },

    labelWithSuffix () {
      return addCounterSuffix(this.label, parseFloat(this.count))
    }
  }
}
</script>
