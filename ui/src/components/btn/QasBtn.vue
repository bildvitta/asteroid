<template>
  <q-btn color="primary" no-caps unelevated v-bind="attributes">
    <slot />

    <template v-for="(_, name) in slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-btn>
</template>

<script>
export default {
  name: 'QasBtn',

  props: {
    useLabelOnSmallScreen: {
      default: true,
      type: Boolean
    },

    label: {
      default: '',
      type: String
    }
  },

  computed: {
    attributes () {
      return {
        ...(this.showLabel && { label: this.label }),
        ...this.$attrs
      }
    },

    showLabel () {
      return this.useLabelOnSmallScreen || !this.$qas.screen.isSmall
    },

    slots () {
      const { default: _, ...slots } = this.$slots
      return slots
    }
  }
}
</script>
