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
    }

    &__calendar-weekdays {
      color: $grey-8;

      > div {
        opacity: 1;
      }
    }

    &__calendar-days-container {
      color: $grey-9;

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
