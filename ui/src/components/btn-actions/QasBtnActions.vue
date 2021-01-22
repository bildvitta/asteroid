<template>
  <div class="row" :class="btnActionsClass">
    <div class="col-sm-auto" :class="secondaryClass">
      <slot name="secondary" />
    </div>

    <div class="col-sm-auto" :class="primaryClass">
      <slot name="primary" />
    </div>
  </div>
</template>

<script>
// TODO: Renomear componente.
export default {
  props: {
    align: {
      type: String,
      default: 'end',
      validator:
        value => ['start', 'around', 'between', 'center', 'end'].includes(value)
    },

    btnCol: {
      type: String,
      default: ''
    },

    gutter: {
      type: String,
      default: 'md',
      validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    }
  },

  computed: {
    btnActionsClass () {
      return `justify-${this.align} q-col-gutter-${this.gutter}`
    },

    isSmallScreen () {
      return this.$q.screen.xs
    },

    primaryClass () {
      return this.btnCol || (this.isSmallScreen && 'col-12 order-first')
    },

    secondaryClass () {
      return this.btnCol || (this.isSmallScreen && 'col-12 order-last')
    }
  }
}
</script>
