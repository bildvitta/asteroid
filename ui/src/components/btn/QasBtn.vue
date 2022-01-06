<template>
  <q-btn color="primary" no-caps unelevated v-bind="attributes">
    <slot v-if="showLabel">{{ $attrs.label }}</slot>
    <slot v-for="(slot, key) in slots" :slot="key" :name="key" />
  </q-btn>
</template>

<script>
import { screenMixin } from '../../mixins'

export default {
  mixins: [screenMixin],

  inheritAttrs: false,

  props: {
    hideLabelOnSmallScreen: {
      type: Boolean
    }
  },

  computed: {
    attributes () {
      const { label, ...attributes } = this.$attrs
      return attributes
    },

    slots () {
      const { default: _, ...slots } = this.$slots
      return slots
    },

    hasLabel () {
      return this.$attrs.label || this.$slots.default
    },

    showLabel () {
      return this.hasLabel && !(this.hideLabelOnSmallScreen && this.$_isSmall)
    }
  }
}
</script>
