<template>
  <q-select v-model="model" v-bind="attributes" v-on="listeners">
    <slot v-for="(slot, key) in $slots" :slot="key" :name="key" />

    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope" />
    </template>

    <template #append>
      <slot name="append">
        <q-icon v-if="isSearchable" name="o_search" />
      </slot>
    </template>

    <template #no-option>
      <slot name="no-option">
        <q-item>
          <q-item-section class="text-grey">
            <template v-if="isLoading">
              Buscando opções de {{ label }}...
            </template>
            <template v-else>
              {{ noOptionLabel }}
            </template>
          </q-item-section>
        </q-item>
      </slot>
    </template>

    <template #after-options>
      <slot v-if="isLoading" name="after-options">
        <div class="flex justify-center q-pb-sm">
          <q-spinner-dots color="primary" size="20px" />
        </div>
      </slot>
    </template>
  </q-select>
</template>

<script>
import lazyLoadingFilterMixin from '../../mixins/lazy-loading-filter'

export default {
  name: 'QasSelect',

  mixins: [lazyLoadingFilterMixin],

  props: {
    fuseOptions: {
      default: () => ({}),
      type: Object
    },

    labelKey: {
      default: '',
      type: String
    },

    noOptionLabel: {
      default: 'Nenhum resultado foi encontrado.',
      type: String
    },

    options: {
      default: () => [],
      type: Array
    },

    searchable: {
      type: Boolean
    },

    value: {
      default: () => [],
      type: [Array, Object, String, Number]
    },

    valueKey: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      fuse: null
    }
  },

  computed: {
    model: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    },

    label () {
      return this.$attrs.label || ''
    },

    listeners () {
      const { input, ...events } = this.$listeners

      return {
        ...events,
        ...(this.useLazyLoading && { 'virtual-scroll': this.$_onVirtualScroll }),
        ...((this.useLazyLoading || this.searchable) && { filter: this.onFilter })
      }
    },

    defaultFuseOptions () {
      return {
        distance: 100,
        includeScore: true,
        keys: ['label', 'value'],
        location: 0,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.1,
        tokenize: true,

        ...this.fuseOptions
      }
    },

    defaultOptions () {
      if (!this.labelKey && !this.valueKey) {
        return this.options
      }

      return this.options.map(item => this.renameKey(item))
    },

    isMultiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    },

    isSearchable () {
      return this.searchable || this.useLazyLoading
    },

    hasError () {
      return this.hasFetchError || this.$attrs.error
    },

    attributes () {
      return {
        emitValue: true,
        mapOptions: true,
        outlined: true,
        clearable: this.isSearchable,
        loading: this.isLoading,
        inputDebounce: this.useLazyLoading ? 500 : 0,
        popupContentClass: this.$_virtualScrollClassName,
        ...this.$attrs,
        options: this.filteredOptions,
        useInput: this.isSearchable,
        error: this.hasError
      }
    }
  },

  watch: {
    defaultFuseOptions (value) {
      this.fuse.options = { ...this.fuse.options, ...value }
    },

    options: {
      handler () {
        if (this.useLazyLoading && this.$_hasFilteredOptions) return

        if (this.fuse) {
          this.fuse.list = this.defaultOptions
        }

        this.filteredOptions = this.defaultOptions
      },
      immediate: true
    }
  },

  async created () {
    if (this.searchable && !this.useLazyLoading) {
      const Fuse = (await import('fuse.js')).default
      this.fuse = new Fuse(this.defaultOptions, this.defaultFuseOptions)
    }
  },

  methods: {
    onFilter (value, update) {
      update(() => {
        if (this.useLazyLoading && value !== this.search) return this.$_filterOptionsByStore(value)

        if (!this.useLazyLoading && this.searchable) this.filterOptionsByFuse(value)
      })
    },

    filterOptionsByFuse (value) {
      if (value === '') {
        this.filteredOptions = this.defaultOptions
        return
      }

      const results = this.fuse.search(value)
      this.filteredOptions = results.map(({ item }) => item)
    },

    renameKey (item) {
      const mapKeys = { label: this.labelKey, value: this.valueKey }

      for (const newKey in mapKeys) {
        if (!item.hasOwnProperty.call(newKey)) {
          item[newKey] = item[mapKeys[newKey]]
          delete item[mapKeys[newKey]]
        }
      }

      return item
    }
  }
}
</script>
