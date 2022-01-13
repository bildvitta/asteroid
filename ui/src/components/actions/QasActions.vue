<template>
  <div :class="classes">
    <div class="col-12 col-sm-auto">
      <slot name="secondary" />
    </div>

    <div class="col-12 col-sm-auto">
      <slot name="primary" />
    </div>
  </div>
</template>

<script>
import { screenMixin } from '../../mixins'

export default {
  mixins: [screenMixin],

  props: {
    align: {
      type: String,
      default: 'end',
      validator: value => ['start', 'around', 'between', 'center', 'end'].includes(value)
    },

    gutter: {
      type: String,
      default: 'md',
      validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    }
  },

  computed: {
    classes () {
      return [
        `justify-${this.align}`,
        `q-col-gutter-${this.gutter}`,
        this.$_isSmall ? 'column reverse' : 'row'
      ]
    }
  }
}
</script>
