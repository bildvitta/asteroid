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
        color: 'grey-8',
        directionLinks: true,
        maxPages: modelValue < 3 ? 3 : 6,
        modelValue,

        ...attributes
      }
    }
  }
}
</script>
