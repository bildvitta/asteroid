<template>
  <section :class="filtersClass">
    <div v-if="showFilters" class="q-col-gutter-x-md row">
      <div v-if="showSearch" class="col-12 col-md-6">
        <slot :filter="filter" name="search">
          <q-form v-if="useSearch" @submit.prevent="filter()">
            <qas-search-input v-model="search" :placeholder="searchPlaceholder" :use-search-on-type="useSearchOnType" @clear="clearSearch" @filter="filter()" @update:model-value="onSearch">
              <template v-if="showFilterButton" #after-clear>
                <slot :context="mx_context" :filter="filter" :filters="activeFilters" name="filter-button" :remove-filter="removeFilter">
                  <pv-filters-button v-if="useFilterButton" ref="filtersButton" v-model="filters" v-bind="filterButtonProps" />
                </slot>
              </template>
            </qas-search-input>
          </q-form>
        </slot>
      </div>

      <div v-else-if="showFilterButton" class="col-12 col-md-6">
        <slot :context="mx_context" :filter="filter" :filters="activeFilters" name="filter-button" :remove-filter="removeFilter">
          <pv-filters-button v-if="useFilterButton" ref="filtersButton" v-model="filters" v-bind="filterButtonProps" />
        </slot>
      </div>

      <div class="col-12 col-md-6">
        <slot name="right-side" />
      </div>
    </div>

    <div v-if="hasChip" class="q-mt-md">
      <!-- TODO rever com novo estilo -->
      <q-chip v-for="(filterItem, key) in activeFilters" :key="key" color="white" :data-cy="`filters-${filterItem.value}-chip`" dense icon-remove="sym_r_close" removable size="md" text-color="grey-8" @remove="removeFilter(filterItem)">
        {{ getChipValue(filterItem.value) }}
      </q-chip>
    </div>

    <slot :context="mx_context" :filter="filter" :filters="activeFilters" :remove-filter="removeFilter" />
  </section>
</template>

<script>
import PvFiltersButton from './private/PvFiltersButton.vue'
import debug from 'debug'

import { camelize, camelizeKeys, decamelize } from 'humps'
import { humanize, parseValue } from '../../helpers/filters.js'
import contextMixin from '../../mixins/context.js'
import { getState, getAction } from '@bildvitta/store-adapter'

const log = debug('asteroid-ui:qas-filters')

export default {
  name: 'QasFilters',

  components: {
    PvFiltersButton
  },

  mixins: [contextMixin],

  props: {
    useChip: {
      default: true,
      type: Boolean
    },

    entity: {
      required: true,
      type: String
    },

    fieldsProps: {
      default: () => ({}),
      type: Object
    },

    useFilterButton: {
      default: true,
      type: Boolean
    },

    useSearch: {
      default: true,
      type: Boolean
    },

    useSearchOnType: {
      default: true,
      type: Boolean
    },

    searchPlaceholder: {
      default: 'Pesquisar...',
      type: String
    },

    url: {
      default: '',
      type: String
    },

    useForceRefetch: {
      type: Boolean
    },

    useSpacing: {
      default: true,
      type: Boolean
    },

    useUpdateRoute: {
      default: true,
      type: Boolean
    }
  },

  emits: ['fetch-success', 'fetch-error', 'update:currentFilters'],

  data () {
    return {
      currentFilters: {},
      filters: {},
      hasFetchError: false,
      isFetching: false,
      search: ''
    }
  },

  computed: {
    activeFilters () {
      if (!this.hasFields) {
        return {}
      }

      const activeFilters = {}

      const fields = Object.keys(this.fields)
      const filters = camelizeKeys(this.useUpdateRoute ? this.mx_context.filters : this.currentFilters)

      for (const key in filters) {
        const hasField = fields.includes(key)

        if (hasField) {
          const field = { ...this.fields[key], ...this.formattedFieldsProps?.[decamelize(key)] }
          const value = humanize(field, this.normalizeValues(filters[key], field?.multiple))

          if (!value) continue

          const { label, name } = field

          activeFilters[key] = { label, name, value }
        }
      }

      return activeFilters
    },

    formattedFieldsProps () {
      const fieldsProps = {}

      for (const key in this.fieldsProps) {
        const decamelizedFieldKey = decamelize(key)

        fieldsProps[decamelizedFieldKey] = { ...this.fieldsProps[key] }
      }

      return fieldsProps
    },

    fields () {
      return getState.call(this, { entity: this.entity, key: 'filters' })
    },

    filtersClass () {
      return {
        'q-mb-xl': this.useSpacing
      }
    },

    filterButtonColor () {
      return this.hasActiveFilters ? 'primary' : 'grey-10'
    },

    filterButtonProps () {
      return {
        color: this.filterButtonColor,
        error: this.hasFetchError,
        fields: this.fields,
        fieldsProps: this.formattedFieldsProps,
        loading: this.isFetching,

        onClear: this.clearFilters,
        onFilter: () => this.filter()
      }
    },

    hasActiveFilters () {
      return !!Object.keys(this.activeFilters).length
    },

    hasFields () {
      return !!Object.keys(this.fields || {}).length
    },

    showFilterButton () {
      return !!this.$slots.filterButton || this.useFilterButton
    },

    showFilters () {
      return this.useFilterButton || this.showSearch
    },

    showSearch () {
      return !!this.$slots.search || this.useSearch
    },

    hasChip () {
      return this.useChip && this.hasActiveFilters
    }
  },

  watch: {
    $route (to, from) {
      if (to.name === from.name) {
        this.fetchFilters()
        this.useUpdateRoute && this.updateValues()
      }
    }
  },

  async created () {
    await this.fetchFilters()

    if (this.useUpdateRoute) {
      this.updateValues()
      this.updateCurrentFilters()
    }

    this.handleSearchModelOnCreate()
  },

  methods: {
    async clearFilters () {
      const { filters } = this.mx_context
      const query = { ...this.$route.query }
      const activeFilters = {
        ...filters,
        ...this.filters
      }

      if (this.hasFields) {
        const fields = Object.keys(this.fields)

        for (const key in activeFilters) {
          const camelizedKey = camelize(key)
          const hasField = fields.includes(camelizedKey)

          if (hasField) {
            delete query[key]
            delete this.filters[key]
          }
        }
      } else {
        this.filters = {}
      }

      this.hideFiltersMenu()

      await this.updateRouteQuery(query)

      this.updateCurrentFilters()
    },

    clearSearch () {
      this.search = ''
      this.filter()
    },

    async fetchFilters () {
      if (!this.useForceRefetch && (this.hasFields || !this.useFilterButton)) {
        return null
      }

      this.hasFetchError = false
      this.isFetching = true

      try {
        const response = await getAction.call(this, {
          entity: this.entity,
          key: 'fetchFilters',
          payload: { url: this.url }
        })

        this.$emit('fetch-success', response)

        log(`[${this.entity}]:fetchFilters:success`, response)
      } catch (error) {
        this.hasFetchError = true
        this.$emit('fetch-error', error)

        log(`[${this.entity}]:fetchFilters:error`, error)
      } finally {
        this.isFetching = false
      }
    },

    async filter (external) {
      const { filters, page, ...context } = this.mx_context

      const query = {
        ...filters,
        ...this.filters,
        ...external,
        ...context,
        search: this.search || undefined
      }

      for (const key in query) {
        query[key] ?? delete query[key]
      }

      this.hideFiltersMenu()

      await this.updateRouteQuery(query)

      this.updateCurrentFilters()
    },

    getChipValue (value) {
      return Array.isArray(value) ? value.join(', ') : value
    },

    hideFiltersMenu () {
      this.$refs.filtersButton?.hideMenu()
    },

    async removeFilter ({ name }) {
      const query = { ...this.$route.query }

      delete query[name]
      delete this.filters[name]

      await this.updateRouteQuery(query)

      this.updateCurrentFilters()
    },

    updateCurrentFilters () {
      this.currentFilters = {
        ...this.filters,
        ...(this.search && { search: this.search })
      }

      this.$emit('update:currentFilters', this.currentFilters)
    },

    async updateRouteQuery (query) {
      this.useUpdateRoute && await this.$router.push({ query })
    },

    updateValues () {
      this.setSearch()
      this.setFilters()
    },

    normalizeValues (value, isMultiple) {
      if (Array.isArray(value)) return value

      return isMultiple ? [value] : value
    },

    handleSearchModelOnCreate () {
      if (this.useUpdateRoute && !this.useFilterButton) {
        this.setSearch()
      }
    },

    onSearch () {
      if (this.useSearchOnType) {
        this.filter()
      }
    },

    setSearch () {
      const { search } = this.mx_context
      this.search = search || ''
    },

    setFilters () {
      this.filters = {}

      const { filters } = this.mx_context

      for (const key in filters) {
        this.filters[key] = parseValue(this.normalizeValues(filters[key], this.fields[key]?.multiple))
      }
    }
  }
}
</script>
