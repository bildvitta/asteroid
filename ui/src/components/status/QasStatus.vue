<template>
  <div aria-live="polite" class="qas-status" :class="backgroundClass" role="status" />
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'QasStatus',
  inheritAttrs: false
})

const props = defineProps({
  color: {
    type: String,
    default: 'light-blue-2'
  }
})

const backgroundClass = computed(() => `bg-${props.color}`)
</script>

<style lang="scss">
.qas-status {
  background-color: red;
  border-radius: 100%;
  height: 16px;
  width: 16px;
}
</style>
