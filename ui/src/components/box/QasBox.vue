<template>
  <div class="bg-white q-pa-md rounded-borders" :class="boxClass">
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
        'border-grey': this.outlined,
        'shadow-2': !this.unelevated
      }
    }
  }
}
</script>
