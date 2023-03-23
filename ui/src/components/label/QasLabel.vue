<template>
  <div class="text-subtitle2" :class="classes">
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
    },

    color: {
      type: String,
      default: 'grey-9'
    }
  },

  computed: {
    labelWithSuffix () {
      return addCounterSuffix(this.label, parseFloat(this.count))
    },

    classes () {
      return [
        `q-mb-${this.margin}`,
        `text-${this.color}`
      ]
    }
  }
}
</script>
