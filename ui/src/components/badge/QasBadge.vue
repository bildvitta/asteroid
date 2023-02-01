<template>
  <q-badge v-bind="$props" :aria-multiline="multiLine" class="q-px-sm q-py-xs qas-badge text-caption">
    <slot />
  </q-badge>
</template>

<script>
export default {
  name: 'QasBadge',

  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: 'light-blue-2'
    },

    label: {
      type: String,
      default: ''
    },

    multiLine: {
      type: Boolean
    },

    textColor: {
      type: String,
      default: 'grey-9'
    }
  }
}
</script>

<style lang="scss">
.qas-badge {
  min-height: 24px;
}
</style>
