<template>
  <q-date
    v-model="model"
    class="qas-date shadow-2"
    color="white"
    minimal
    text-color="primary"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: 'QasDate',

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  computed: {
    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style lang="scss">
.qas-date {
  // $

  .q-date__calendar-item + .q-date__calendar-item {
    // margin-left: 20px;
    // margin-left: var(--qas-spacing-sm);
  }

  .q-date {
    &__navigation {
      .q-btn {
        @include set-button(
          tertiary,
          false,
          false,
          grey-9
        );
      }

      display: grid;
      grid-gap: 4px;
      /* stylelint-disable-next-line string-quotes */
      grid-template-areas: "month-arrow-left month month-arrow-right spacing year-arrow-left year year-arrow-right";
      grid-template-columns: 24px 80px 24px 30px 24px 40px 24px;

      > div {
        column-gap: 10px;
        text-align: center;
      }

      div:nth-child(1) {
        grid-area: month-arrow-left;
      }

      div:nth-child(2) {
        grid-area: month;
      }

      div:nth-child(3) {
        grid-area: month-arrow-right;
      }

      div:nth-child(4) {
        grid-area: year-arrow-left;
      }

      div:nth-child(5) {
        grid-area: year;
      }

      div:nth-child(6) {
        grid-area: year-arrow-right;
      }
    }

    &__calendar-weekdays {
      color: $grey-8;

      > div {
        @include set-typography($subtitle2);

        opacity: 1;
      }
    }

    &__months,
    &__years {
      .q-btn {
        @include set-button(
          tertiary,
          true,
          false,
          grey-9
        );
      }
    }

    &__view {
      min-height: auto;
    }

    &__calendar-days {
      > div {
        // width: 24px !important;
      }

      & + & {
        margin-left: var(--qas-spacing-md);
      }
    }

    &__calendar-days-container {
      color: $grey-9;
      min-height: auto;

      .q-btn {
        @include set-button(
          tertiary,
          true,
          false
        );
      }
    }
  }
}
</style>
