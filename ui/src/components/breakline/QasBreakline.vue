<template>
  <component :is="tag" v-for="(line, index) in lines" :key="index" v-bind="$attrs">
    {{ line }}
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { getSlotChildrenText } from '../../helpers'

defineOptions({
  name: 'QasBreakline'
})

const props = defineProps({
  split: {
    default: '\n',
    type: String
  },

  tag: {
    default: 'div',
    type: String
  },

  text: {
    default: '',
    type: String
  }
})

const slots = defineSlots()

const lines = computed(() => {
  const text = props.text || getSlotChildrenText(slots.default())

  return text.split(props.split)
})
</script>
