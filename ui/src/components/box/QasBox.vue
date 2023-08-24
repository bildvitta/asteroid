<template>
  <div class="bg-white q-pa-lg" :class="boxClass">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'QasBox',

  provide: {
    hasParent: true
  },

  inject: {
    hasParent: {
      default: false
    }
  },

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
        'border-grey rounded-borders-lg': this.outlined || this.hasParent,
        'shadow-2 rounded-borders-xl': !this.unelevated && !this.hasParent
      }
    }
  }
}
</script>
