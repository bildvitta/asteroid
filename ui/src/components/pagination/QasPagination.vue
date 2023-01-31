<template>
  <q-pagination v-bind="defaultProps" />
</template>

<script>
export default {
  name: 'QasPagination',

  computed: {
    defaultProps () {
      const { modelValue, ...attributes } = this.$attrs

      return {
        activeColor: 'primary',
        activeDesign: 'flat',
        boundaryNumbers: true,
        class: 'qas-pagination',
        color: 'grey-8',
        directionLinks: true,
        iconNext: 'sym_r_chevron_right',
        iconPrev: 'sym_r_chevron_left',
        maxPages: modelValue < 3 ? 3 : 6,
        modelValue,

        ...attributes
      }
    }
  }
}
</script>

<style lang="scss">
.qas-pagination {
  .q-icon {
    color: $grey-9;
  }
}
</style>
