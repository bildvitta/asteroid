<template>
  <component :is="parentTag">
    <component :is="tag" v-for="(item, index) in items" :key="index" :class="tagClass" :style="tagStyle">
      {{ item }}
    </component>
  </component>
</template>

<script>
export default {
  props: {
    parentTag: {
      default: 'div',
      type: String
    },

    tag: {
      default: 'div',
      type: String
    },

    tagClass: {
      default: null,
      type: [Array, Object, String]
    },

    tagStyle: {
      default: null,
      type: [Array, Object, String]
    },

    text: {
      default: '',
      type: String
    },

    split: {
      default: '\n',
      type: String
    }
  },

  computed: {
    items () {
      const slot = this.$slots.default
      const text = this.text || (slot ? slot[0].text : '')

      return text.split(this.split)
    }
  }
}
</script>
