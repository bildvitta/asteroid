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
export default {
  name: 'QasActions',

  props: {
    align: {
      default: 'end',
      type: String,
      validator: value => ['start', 'around', 'between', 'center', 'end'].includes(value)
    },

    gutter: {
      default: 'md',
      type: String,
      validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    }
  },

  computed: {
    classes () {
      return [
        `justify-${this.align}`,
        `q-col-gutter-${this.gutter}`,
        this.$qas.screen.isSmall ? 'column reverse' : 'row'
      ]
    }
  }
}
</script>
