<template>
  <q-select v-model="model" v-bind="attributes">
    <template #append>
      <slot name="append">
        <q-icon v-if="isSearchable" name="o_search" />
      </slot>
    </template>

    <template #no-option>
      <slot v-if="!mx_isFetching" name="no-option">
        <q-item>
          <q-item-section class="text-grey">
            {{ noOptionLabel }}
          </q-item-section>
        </q-item>
      </slot>
    </template>

    <template #after-options>
      <slot v-if="mx_isFetching" name="after-options">
        <div class="flex justify-center q-pb-sm">
          <q-spinner-dots color="primary" size="20px" />
        </div>
      </slot>
    </template>

    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-select>
</template>

<script>
import { searchFilterMixin } from '../../mixins'
import Fuse from 'fuse.js'

export default {
  name: 'QasSelect',

  mixins: [searchFilterMixin],

  props: {
    fuseOptions: {
      default: () => ({}),
      type: Object
    },

    labelKey: {
      default: '',
      type: String
    },

    modelValue: {
      default: () => [],
      type: [Array, Object, String, Number, Boolean]
    },

    noOptionLabel: {
      default: 'Nenhum resultado foi encontrado.',
      type: String
    },

    options: {
      default: () => [],
      type: Array
    },

    valueKey: {
      default: '',
      type: String
    },

    useSearch: {
      type: Boolean
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      fuse: null
    }
  },

  computed: {
    attributes () {
      return {
        bottomSlots: true,
        clearable: this.isSearchable,
        emitValue: true,
        mapOptions: true,
        outlined: true,
        ...this.$attrs,

        options: this.mx_filteredOptions,
        useInput: this.isSearchable,
        error: this.hasError,
        loading: this.hasLoading,
        ...(this.useLazyLoading && { onVirtualScroll: this.mx_onVirtualScroll }),
        ...(this.isSearchable && { onFilter: this.onFilter })
      }
    },

    defaultFuseOptions () {
      return {
        ignoreLocation: true,
        keys: ['label', 'value'],
        threshold: 0.1,

        ...this.fuseOptions
      }
    },

    isSearchable () {
      return this.useSearch || this.useLazyLoading
    },

    defaultOptions () {
      return this.mx_handleOptions(this.options)
    },

    hasError () {
      return this.mx_hasFetchError || this.$attrs.error
    },

    hasLoading () {
      return this.mx_isFetching || this.$attrs.loading
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

  watch: {
    defaultFuseOptions () {
      this.setFuse()
    },

    options: {
      handler () {
        if (this.useLazyLoading && this.mx_hasFilteredOptions) return

        if (this.fuse) this.setFuse()

        this.mx_filteredOptions = this.defaultOptions
      },

      immediate: true
    }
  },

  created () {
    this.setFuse()
    this.useLazyLoading && this.mx_setFetchOptions('')
  },

  methods: {
    setFuse () {
      if (this.useSearch) {
        this.fuse = new Fuse(this.defaultOptions, this.defaultFuseOptions)
      }
    },

    async onFilter (value, update) {
      if (this.useLazyLoading && value !== this.mx_search) {
        await this.mx_filterOptionsByStore(value)
      }

      if (!this.useLazyLoading && this.useSearch) {
        this.filterOptionsByFuse(value)
      }

      update()
    },

    filterOptionsByFuse (value) {
      if (value === '') {
        this.mx_filteredOptions = this.defaultOptions
        return
      }

      const results = this.fuse.search(value)

      this.mx_filteredOptions = this.mx_getNormalizedFuseResults(results)
    }
  }
}
</script>
