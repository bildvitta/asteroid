<template>
  <div class="text-bold text-subtitle2" :class="labelClasses" v-bind="$attrs" v-on="$listeners">
    <!-- TODO: Remover camelCase. -->
    <slot :formattedLabel="formattedLabel">
      {{ formattedLabel }}
    </slot>
  </div>
</template>

<script>
import formatLabel from '../../helpers/label'

export default {
  props: {
    label: {
      default: '',
      type: String
    },

    margin: {
      default: 'sm',
      type: String
    },

    quantity: {
      default: 0,
      type: Number
    }
  },

  computed: {
    formattedLabel () {
      return formatLabel(this.quantity, this.label)
    },

    labelClasses () {
      return `q-mb-${this.margin}`
    }
  }
}
</script>
