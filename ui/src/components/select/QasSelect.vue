<template>
  <q-select v-model="model" v-bind="attributes" v-on="listeners" @filter="onFilter">
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
            <template v-else-if="isSearchable && !hasSearch">
              Digite para pesquisar por {{ label }}
            </template>
            <template v-else>
              {{ noOptionLabel }}
            </template>
          </q-item-section>
        </q-item>
      </slot>
    </template>

    <template #after-options>
      <div v-if="isFiltering" class="flex justify-center q-pb-sm">
        <q-spinner-dots size="20px" color="primary" />
      </div>
    </template>
  </q-select>
</template>

<script>
import { decamelize } from 'humps'

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

    lazyLoadingProps: {
      default: () => ({
        url: '',
        params: {
          limit: 40
        },
        decamelizeFieldName: true
      }),
      type: Object
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
      hasFetchError: false,
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

    label () {
      return this.$attrs.label || ''
    },

    listeners () {
      const { input, ...events } = this.$listeners
      const listeners = { ...events }

      if (this.useLazyLoading) {
        listeners['virtual-scroll'] = this.onVirtualScroll
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

    hasSearch () {
      return !!this.filterSearch
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
        } else {
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

    onVirtualScroll ({ to, ref }) {
      setTimeout(async () => {
        const { lastPage, nextPage } = this.filterPagination
        const lastIndex = this.filteredOptions.length - 1

        if (lastPage && nextPage <= lastPage && to === lastIndex && !this.isFiltering) {
          const options = await this.fetchOptions()
          this.filteredOptions.push(...options)
          this.$nextTick(() => ref.refresh())
        }
      }, 500)
    },

    async filterOptionsByStore (value) {
      this.filteredOptions = []
      this.filterSearch = value
      this.filterPagination = {
        nextPage: 1,
        lastPage: null
      }
      this.filteredOptions = await this.fetchOptions()
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

        this.hasFetchError = false
        this.isFiltering = true

        const { url, params, decamelizeFieldName } = this.lazyLoadingProps
        const { data: { results, count }} = await this.$store.dispatch(`${this.entity}/fetchFieldOptions`, {
          url,
          field: decamelizeFieldName ? decamelize(this.name, { separator: '-' }) : this.name,
          params: {
            search: this.filterSearch,
            offset: (this.filterPagination.nextPage - 1) * params.limit,
            ...params
          }
        })

        this.filterPagination = {
          nextPage: this.filterPagination.nextPage + 1,
          lastPage: Math.ceil(count / params.limit),
        }

        return results
      } catch (error) {
        console.error(error)
        this.hasFetchError = true
        this.$qas.error(`Ocorreu um erro ao buscar as opções do campo ${this.label}`)
      } finally {
        this.isFiltering = false
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
