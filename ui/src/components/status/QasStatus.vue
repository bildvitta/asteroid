<template>
  <div aria-live="polite" class="qas-status" :class="backgroundClass" role="status" />
</template>

<script>
export default {
  name: 'QasStatus',

  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: 'light-blue-2'
    }
  },

  computed: {
    backgroundClass () {
      return `bg-${this.color}`
    }
  }
}
</script>

<style lang="scss">
.qas-status {
  border-radius: 100%;
  height: 16px;
  width: 16px;
}
</style>
