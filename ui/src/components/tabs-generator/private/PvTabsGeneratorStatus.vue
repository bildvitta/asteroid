<template>
  <div class="pv-tabs-generator-status" :class="backgroundClass" />
</template>

<script>
export default {
  name: 'PvTabsGeneratorStatus',

  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: ''
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
.pv-tabs-generator-status {
  border-radius: 100%;
  height: 16px;
  width: 16px;
}
</style>
