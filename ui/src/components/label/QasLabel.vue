<template>
  <div class="text-h4" :class="classes">
    <slot :label-with-suffix="labelWithSuffix">{{ labelWithSuffix }}</slot>
  </div>
</template>

<script>
import { addCounterSuffix } from '../../helpers'
import { Spacing } from '../../enums/Spacing'

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
      default: Spacing.Md,
      type: String,
      validator: value => {
        const availableSpacings = Object.values(Spacing)

        return availableSpacings.includes(value)
      }
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
