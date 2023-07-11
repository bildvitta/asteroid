<template>
  <div class="qas-filter-input">
    <qas-input ref="input" v-model="model" v-bind="$attrs" class="bg-white rounded-borders-sm" data-cy="search-input" :debounce="debounce" dense hide-bottom-space input-class="ellipsis text-grey-8" type="search">
      <template #prepend>
        <q-icon v-if="useSearchOnType" color="grey-8" name="sym_r_search" />
        <qas-btn v-else color="grey-9" icon="sym_r_search" variant="tertiary" @click="$emit('filter')" />
      </template>

      <template #append>
        <qas-btn v-if="hasSearch" color="grey-9" icon="sym_r_clear" variant="tertiary" @click="clear" />

        <slot name="after-clear" />
      </template>
    </qas-input>
  </div>
</template>

<script>
export default {
  name: 'QasSearchInput',

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
.qas-filter-input {
  position: relative;

  .q-field {
    &--dense .q-field__prepend {
      padding-right: var(--qas-spacing-xs);
    }

    &--dense .q-field__append {
      padding-left: var(--qas-spacing-sm);
    }

    &__native {
      padding-bottom: var(--qas-spacing-sm);
      padding-top: var(--qas-spacing-sm);
    }
  }
}
</style>
