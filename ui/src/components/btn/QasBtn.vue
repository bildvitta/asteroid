<template>
  <q-btn color="primary" no-caps unelevated v-bind="attributes">
    <slot v-if="showLabel" />

    <template v-for="(_, name) in slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-btn>
</template>

<script>
export default {
  name: 'QasBtn',

  props: {
    hideLabelOnSmallScreen: {
      type: Boolean
    },

    label: {
      type: String,
      default: ''
    }
  },

  computed: {
    attributes () {
      return {
        ...(this.showLabel && { label: this.label }),
        ...this.$attrs
      }
    },

    hasLabel () {
      return !!(this.label || this.$slots.default)
    },

    showLabel () {
      return this.hasLabel && !(this.hideLabelOnSmallScreen && this.$qas.screen.isSmall)
    },

    slots () {
      const { default: _, ...slots } = this.$slots
      return slots
    }
  }
}
</script>
