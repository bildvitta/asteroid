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
export default {
  props: {
    btnCol: {
      type: String,
      default: ''
    },

    align: {
      type: String,
      default: 'end',
      validator: value => [
        'end',
        'start',
        'center',
        'between',
        'around'
      ].includes(value)
    },

    gutter: {
      type: String,
      default: 'md',
      validator: value => [
        'xs',
        'sm',
        'md',
        'lg',
        'xl'
      ].includes(value)
    }
  },

  computed: {
    isSmallScreen () {
      return this.$q.screen.xs
    },

    btnActionsClass () {
      return `q-col-gutter-${this.gutter} justify-${this.align}`
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
