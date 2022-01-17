<template>
  <q-btn color="primary" no-caps unelevated v-bind="attributes">
    <slot v-if="showLabel">{{ $attrs.label }}</slot>

    <template v-for="(_, name) in slots" v-slot:[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-btn>
</template>

<script>
import { screenMixin } from '../../mixins'

export default {
  name: 'QasBtn',

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

      return this.showLabel ? this.$attrs : attributes
    },

    slots () {
      const { default: _, ...slots } = this.$slots
      return slots
    },

    hasLabel () {
      return !!(this.$attrs.label || this.$slots.default)
    },

    showLabel () {
      return this.hasLabel && !(this.hideLabelOnSmallScreen && this.$_isSmall)
    }
  }
}
</script>
