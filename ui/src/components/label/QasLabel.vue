<template>
  <div class="q-mb-sm text-bold text-subtitle2" v-bind="$attrs" v-on="$listeners">
    <slot :formatted-label="formattedLabel">
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
      required: true,
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
    }
  }
}
</script>
