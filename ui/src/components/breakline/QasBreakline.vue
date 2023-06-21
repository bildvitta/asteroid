<template>
  <component :is="tag" v-for="(line, index) in lines" :key="index" v-bind="$attrs">
    {{ line }}
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
    lines () {
      const text = this.text || getSlotChildrenText(this.$slots.default())
      return text.split(this.split)
    }
  }
}
</script>
