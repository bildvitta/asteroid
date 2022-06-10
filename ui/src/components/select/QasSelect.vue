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
      <slot name="after-options">
        <div v-show="isFiltering" class="flex justify-center q-pb-sm">
          <q-spinner-dots color="primary" size="20px" />
        </div>
      </slot>
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
          limit: 48
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
      isScrolling: false,
      hasFetchError: false,
      isFiltering: false,
      filteredOptions: [],
      filterPagination: {
        page: 1,
        lastPage: null
      },
      filterSearch: null,
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

    popupClassName () {
      return `popup-content-${this.name}`
    },

    attributes () {
      return {
        emitValue: true,
        mapOptions: true,
        outlined: true,
        clearable: this.isSearchable,
        loading: this.isFiltering,
        inputDebounce: this.useLazyLoading ? 500 : 0,
        popupContentClass: this.popupClassName,
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
        if (this.useLazyLoading) return this.filterOptionsByStore(value)
        if (this.searchable) return this.filterOptionsByFuse(value)
      })
    },

    getScrollContainerTop () {
      const scrollContainer = document.querySelector(`.${this.popupClassName}`)
      const scrollContainerHeight = scrollContainer.offsetHeight
      const scrollContainerTop = scrollContainer.scrollTop
      const afterOptionsSlotHeight = 22 // Height of the after-options slot element

      return {
        scrollContainer,
        top: scrollContainerTop + (scrollContainerHeight / 2) - afterOptionsSlotHeight
      }
    },

    async onVirtualScroll ({ ref, index }) {
      if (this.isScrolling) return

      const { scrollContainer, top } = this.getScrollContainerTop()
      const { lastPage, page } = this.filterPagination
      const lastIndex = this.filteredOptions.length - 1

      /**
       *  if the last page was not reached
       *  if the scroll container is at the bottom
       *  if it's not filtering
       */
      const canFetchOptions = lastPage && page <= lastPage && index === lastIndex && !this.isFiltering

      if (canFetchOptions) {
        this.isScrolling = true

        const options = await this.fetchOptions()
        this.filteredOptions.push(...options)

        // solution based on Quasar Select filtering
        setTimeout(() => {
          scrollContainer.scrollTo({
            top,
            behavior: 'smooth'
          })

          // this is to prevent the virtual-scroll event to be fired again after the scrollTo
          this.$nextTick(() => {
            this.isScrolling = false
          })
        }, 100)
      }
    },

    async filterOptionsByStore (value) {
      if (value !== this.filterSearch) {
        this.filteredOptions = []
        this.filterSearch = value
        this.filterPagination = {
          page: 1,
          lastPage: null
        }

        this.filteredOptions = await this.fetchOptions()
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

        this.hasFetchError = false
        this.isFiltering = true

        const { url, params, decamelizeFieldName } = this.lazyLoadingProps
        const { data } = await this.$store.dispatch(`${this.entity}/fetchFieldOptions`, {
          url,
          field: decamelizeFieldName ? decamelize(this.name, { separator: '-' }) : this.name,
          params: {
            search: this.filterSearch,
            offset: (this.filterPagination.page - 1) * params.limit,
            ...params
          }
        })
        const { results, count } = data

        this.filterPagination = {
          page: this.filterPagination.page + 1,
          lastPage: Math.ceil(count / params.limit)
        }

        this.$emit('fetch-options-success', data)

        return results
      } catch (error) {
        this.hasFetchError = true
        this.$qas.error(`Ocorreu um erro ao buscar as opções do campo ${this.label}`)
        this.$emit('fetch-options-error', error)
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
