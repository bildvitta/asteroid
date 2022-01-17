<template>
  <component :is="tag" v-for="(item, index) in items" :key="index" v-bind="$attrs">
    {{ item }}
  </component>
</template>

<script>
import { getSlotChildrenText } from '../../helpers'

export default {
  name: 'QasBreakline',

  props: {
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
  },

  computed: {
    items () {
      const text = this.text || getSlotChildrenText(this.$slots.default())
      return text.split(this.split)
    }
  }
}
</script>
