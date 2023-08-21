<template>
  <div class="text-h4" :class="classes">
    <slot :label-with-suffix="normalizedLabel">{{ normalizedLabel }}</slot>
  </div>
</template>

<script>
import { addCounterSuffix, getRequiredLabel } from '../../helpers'
import { Spacing } from '../../enums/Spacing'

export default {
  name: 'QasLabel',

  props: {
    color: {
      type: String,
      default: 'grey-9'
    },

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

    required: {
      type: Boolean
    }
  },

  computed: {
    labelWithSuffix () {
      return addCounterSuffix(this.label, parseFloat(this.count))
    },

    normalizedLabel () {
      return getRequiredLabel({ label: this.labelWithSuffix, required: this.required })
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
