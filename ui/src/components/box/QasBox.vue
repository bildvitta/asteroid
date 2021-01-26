<template>
  <div v-bind="$attrs" class="q-px-md q-py-lg qas-box rounded-borders" :class="boxClass" v-on="$listeners">
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
      return this.formMode ? 'qas-box__outlined bg-white' : 'qas-box__elevated'
    }
  }
}
</script>

<style lang="scss">
.qas-box {
  $shadow-color: rgba($primary, 0.15);

  &__outlined {
    border: 1px solid $secondary;
  }

  &__elevated {
    box-shadow: 0px 9px 27px $shadow-color;
  }
}
</style>
