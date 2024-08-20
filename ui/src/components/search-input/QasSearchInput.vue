<template>
  <component :is="component" class="qas-search-input" :class="containerClasses" :use-spacing="false">
    <qas-input ref="input" v-model="model" class="qas-search-input__input" v-bind="$attrs" data-cy="search-input" :debounce="debounce" dense hide-bottom-space input-class="ellipsis text-grey-8" inputmode="search" outlined type="search">
      <template #prepend>
        <q-icon v-if="useSearchOnType" color="grey-8" name="sym_r_search" />

        <qas-btn v-else color="grey-10" icon="sym_r_search" variant="tertiary" @click="$emit('filter')" />
      </template>

      <template #append>
        <qas-btn v-if="hasSearch" color="grey-10" icon="sym_r_clear" variant="tertiary" @click="clear" />

        <slot name="after-clear" />
      </template>
    </qas-input>
  </component>
</template>

<script>
export default {
  name: 'QasSearchInput',

  inject: {
    isBox: { default: false },
    isDialog: { default: false }
  },

  inheritAttrs: false,

  props: {
    modelValue: {
      default: '',
      type: String
    },

    useDebounce: {
      default: true,
      type: Boolean
    },

    useSearchOnType: {
      default: true,
      type: Boolean
    }
  },

  emits: [
    'clear',
    'filter',
    'update:modelValue'
  ],

  computed: {
    component () {
      return this.isBoxOrDialog ? 'div' : 'qas-box'
    },

    containerClasses () {
      return {
        'qas-search-input--bordered': this.isBoxOrDialog
      }
    },

    isBoxOrDialog () {
      return this.isBox || this.isDialog
    },

    debounce () {
      return this.useDebounce ? '1200' : ''
    },

    hasSearch () {
      return !!this.model.length
    },

    input () {
      return this.$refs.input
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  },

  methods: {
    clear () {
      this.$emit('clear', this.modelValue)
      this.$emit('update:modelValue', '')
    }
  }
}
</script>

<style lang="scss">
.qas-search-input {
  .qas-search-input__input .q-field__control:before {
    border: 0;
  }

  &--bordered {
    border: 1px solid $grey-4;
    border-radius: $generic-border-radius;
  }
}
</style>
