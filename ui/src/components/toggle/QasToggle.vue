<template>
  <q-toggle v-bind="attrs" dense />
</template>

<script setup>
import { useAttrs } from 'vue'

defineOptions({
  name: 'QasToggle',
  inheritAttrs: false
})

const attrs = useAttrs()
</script>
