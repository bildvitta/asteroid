<template>
  <div class="bg-white q-px-md q-py-lg rounded-borders" :class="boxClass">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'QasBox',

  props: {
    outlined: {
      type: Boolean
    },

    unelevated: {
      type: Boolean
    }
  },

  computed: {
    boxClass () {
      return {
        'border-primary-contrast': this.outlined,
        'shadow-14': !this.unelevated
      }
    }
  }
}
</script>
