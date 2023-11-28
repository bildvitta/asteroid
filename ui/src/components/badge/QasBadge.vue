<template>
  <q-badge v-bind="props" :aria-multiline="props.multiLine" class="q-px-sm q-py-xs qas-badge text-caption">
    <slot />
  </q-badge>
</template>

<script setup>
defineOptions({
  name: 'QasBadge',
  inheritAttrs: false
})

const props = defineProps({
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
})
</script>

<style lang="scss">
.qas-badge {
  min-height: 24px;
}
</style>
