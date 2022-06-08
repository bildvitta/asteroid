<template>
  <q-select v-model="model" v-bind="attributes" v-on="listeners" @filter="onFilter" @virtual-scroll="onScroll">
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
              Buscando por {{ $attrs.label }}...
            </template>
            <template v-else-if="isSearchable && !hasSearch">
              Digite para pesquisar por {{ $attrs.label }}
            </template>
            <template v-else>
              {{ noOptionLabel }}
            </template>
          </q-item-section>
        </q-item>
      </slot>
    </template>
  </q-select>
</template>

<script>
import api from 'axios'

export default {
  name: 'QasSelect',

  props: {
    entity: {
      default: '',
      type: String
    },

    fuseOptions: {
      default: () => ({}),
      type: Object
    },

    labelKey: {
      default: '',
      type: String
    },

    limit: {
      default: 24,
      type: Number
    },

    name: {
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

    useLazyLoading: {
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
      isFiltering: false,
      filteredOptions: [],
      filterPagination: {
        nextPage: 1,
        lastPage: null
      },
      filterSearch: '',
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

    listeners () {
      const { input, ...events } = this.$listeners

      return events
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

    hasSearch () {
      return !!this.filterSearch
    },

    attributes () {
      return {
        emitValue: true,
        mapOptions: true,
        outlined: true,
        clearable: this.isSearchable,
        loading: this.isFiltering,
        ...this.$attrs,
        options: this.filteredOptions,
        useInput: this.isSearchable
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

        if (!this.useLazyLoading) {
          this.filteredOptions = this.formattedResult
        }
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
        if (this.useLazyLoading) return this.filterOptionsByStore(value)
        if (this.searchable) return this.filterOptionsByFuse(value)
      })
    },

    async onScroll ({ to, ref }) {
      if (!this.useLazyLoading) return

      const { lastPage, nextPage } = this.filterPagination
      const lastIndex = this.filteredOptions.length - 1

      if (lastPage && nextPage < lastPage && to === lastIndex && !this.isFiltering) {
        await this.fetchOptions()
        setTimeout(() => ref.refresh(), 500)
      }
    },

    filterOptionsByStore (value) {
      if (value === '') {
        return this.resetFilterSearch()
      }

      if (value !== this.filterSearch) {
        this.filteredOptions = [...this.formattedResult]
        this.filterSearch = value
        this.resetFilterPagination()
        this.fetchOptions()
      }
    },

    filterOptionsByFuse (value) {
      if (value === '') {
        this.filteredOptions = this.formattedResult
      } else {
        const results = this.fuse.search(value)
        this.filteredOptions = results.map(item => item.item)
      }
    },

    async fetchOptions () {
      try {
        if (!this.entity) {
          throw new Error('A propriedade "entity" é obrigatória quando a propriedade "useLazyLoading" está ativa.')
        }

        const { nextPage } = this.filterPagination

        this.isFiltering = true

        // `${this.entity}/options/${this.name}`
        const { data: { results, count }} = await api.get('/attributes', {
          params: {
            search: this.filterSearch,
            limit: this.limit,
            offset: (nextPage - 1) * this.limit
          }
        })

        // MOCK (Remover quando for implementar o backend)
        const newOptions = results.map(item => {
          return {
            label: item.name,
            value: item.uuid
          }
        })

        this.filteredOptions.push(...newOptions)
        this.filterPagination = {
          nextPage: nextPage + 1,
          lastPage: Math.ceil(count / this.limit),
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.isFiltering = false
      }
    },

    resetFilterPagination () {
      this.filterPagination = {
        nextPage: 1,
        lastPage: null
      }
    },

    resetFilterSearch () {
      this.filterSearch = ''
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
