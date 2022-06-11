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
            <template v-if="isFiltering">
              Buscando por {{ label }}...
            </template>
            <template v-else>
              {{ noOptionLabel }}
            </template>
          </q-item-section>
        </q-item>
      </slot>
    </template>

    <template #after-options>
      <slot v-if="isFiltering" name="after-options">
        <div class="flex justify-center q-pb-sm">
          <q-spinner-dots color="primary" size="20px" />
        </div>
      </slot>
    </template>
  </q-select>
</template>

<script>
import lazyLoadingMixin from '../../mixins/lazy-loading'

export default {
  name: 'QasSelect',

  mixins: [lazyLoadingMixin],

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
      const listeners = { ...events }

      if (this.useLazyLoading) {
        listeners['virtual-scroll'] = this.onVirtualScroll
      }

      if (this.useLazyLoading || this.searchable) {
        listeners.filter = this.onFilter
      }

      return listeners
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

    formattedResult () {
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
        loading: this.isFiltering,
        inputDebounce: this.useLazyLoading ? 500 : 0,
        popupContentClass: this.virtualScrollClassName,
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
        if (this.fuse) {
          this.fuse.list = this.formattedResult
        }

        if (this.useLazyLoading) {
          this.filteredOptions = this.filteredOptions.length ? this.filteredOptions : this.formattedResult
          return
        }

        this.filteredOptions = this.formattedResult
      },
      immediate: true
    }
  },

  async created () {
    if (this.searchable && !this.useLazyLoading) {
      const Fuse = (await import('fuse.js')).default
      this.fuse = new Fuse(this.options, this.defaultFuseOptions)
    }
  },

  methods: {
    onFilter (value, update) {
      update(() => {
        if (this.useLazyLoading) {
          if (value === this.filterSearch) return

          this.filterOptionsByStore(value)
          return
        }

        if (this.searchable) {
          this.filterOptionsByFuse(value)
        }
      })
    },

    filterOptionsByFuse (value) {
      if (value === '') {
        this.filteredOptions = this.formattedResult
      } else {
        const results = this.fuse.search(value)
        this.filteredOptions = results.map(item => item.item)
      }
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
