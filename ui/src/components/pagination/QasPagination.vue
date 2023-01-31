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
        maxPages: 3,
        modelValue,

        ...attributes
      }
    }
  }
}
</script>

<style lang="scss">
.qas-pagination {
  // https://quasar.dev/style/sass-scss-variables#caveat: $

  .q-pagination__content .q-btn {
    @include set-button(
      tertiary,
      true,
      false,
      grey-9
    );

    min-width: max-content !important;

    &.text-primary {
      color: var(--q-primary) !important;
    }
  }

  .q-pagination__middle + .q-btn,
  .q-btn + .q-pagination__middle,
  .q-btn + .q-btn {
    margin-left: var(--qas-spacing-md) !important;
  }

  .q-pagination__content > .q-btn,
  .q-pagination__middle > .q-btn {
    margin-left: 0;
    margin-top: 0;
  }

  @media (max-width: $breakpoint-xs) {
    .q-pagination__middle + .q-btn,
    .q-btn + .q-pagination__middle,
    .q-btn + .q-btn {
      margin-left: var(--qas-spacing-sm) !important;
    }
  }
}
</style>
