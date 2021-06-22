<template>
  <div v-bind="$attrs" class="bg-white q-px-md q-py-lg rounded-borders" :class="boxClass" v-on="$listeners">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    // TODO: Alterar para o outlined e unelevated.
    formMode: {
      type: Boolean
    }
  },

  computed: {
    boxClass () {
      return this.formMode ? 'border-primary-contrast' : 'shadow-primary'
    }
  }
}
</script>
