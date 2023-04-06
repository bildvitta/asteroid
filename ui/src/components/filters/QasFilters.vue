<template>
  <section class="qas-filters" :class="filtersClass">
    <div v-if="showFilters" class="q-col-gutter-x-md row">
      <div v-if="showSearch" class="col-12 col-md-6">
        <slot :filter="filter" name="search">
          <q-form v-if="useSearch" @submit.prevent="filter()">
            <div class="qas-filters__input-content">
              <qas-input v-model="search" class="bg-white q-px-sm rounded-borders-sm shadow-2" data-cy="filters-search-input" :debounce="debounce" dense hide-bottom-space input-class="ellipsis text-grey-8" :outlined="false" :placeholder="searchPlaceholder" type="search" @update:model-value="onSearch">
                <template #prepend>
                  <q-icon v-if="useSearchOnType" color="grey-8" name="sym_r_search" />
                  <qas-btn v-else color="grey-9" icon="sym_r_search" variant="tertiary" @click="filter()" />
                </template>

                <template #append>
                  <qas-btn v-if="hasSearch" class="q-mr-sm" color="grey-9" icon="sym_r_clear" variant="tertiary" @click="clearSearch" />

                  <template v-if="showFilterButton">
                    <slot :context="mx_context" :filter="filter" :filters="activeFilters" name="filter-button" :remove-filter="removeFilter">
                      <pv-filters-button v-if="useFilterButton" ref="filtersButton" v-model="filters" v-bind="filterButtonProps" />
                    </slot>
                  </template>
                </template>
              </qas-input>
            </div>
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
      <q-chip v-for="(filterItem, key) in activeFilters" :key="key" color="white" :data-cy="`filters-${filterItem.value}-chip`" dense icon-remove="sym_r_close" removable size="md" text-color="grey-8" @remove="removeFilter(filterItem)">{{ getChipValue(filterItem.value) }}</q-chip>
    </div>

    <slot :context="mx_context" :filter="filter" :filters="activeFilters" :remove-filter="removeFilter" />
  </section>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import PvFiltersButton from './private/PvFiltersButton.vue'

import { camelize, camelizeKeys } from 'humps'
import { humanize, parseValue } from '../../helpers/filters.js'
import contextMixin from '../../mixins/context.js'
import { getState, getAction } from '@bildvitta/store-adapter'

export default {
  name: 'QasFilters',

  components: {
    QasBtn,
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
          const value = humanize(this.fields[key], this.normalizeValues(filters[key], this.fields[key]?.multiple))
          const { label, name } = this.fields[key]

          activeFilters[key] = { label, name, value }
        }
      }

      return activeFilters
    },

    debounce () {
      return this.useSearchOnType ? '1200' : ''
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
      return this.hasActiveFilters ? 'primary' : 'grey-9'
    },

    filterButtonProps () {
      return {
        color: this.filterButtonColor,
        error: this.hasFetchError,
        fields: this.fields,
        fieldsProps: this.fieldsProps,
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

    hasSearch () {
      return this.search.length
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

  created () {
    this.fetchFilters()
    this.watchOnceFields()
    this.handleSearchModelOnCreate()
  },

  methods: {
    clearFilters () {
      const { filters, ...query } = this.mx_context
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
      this.updateCurrentFilters()
      this.updateRouteQuery(query)
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
        this.$qas.logger.group(
          `QasFilters - fetchFilters -> Payload do parâmetro do ${this.entity}/fetchFilters`,
          [{ url: this.url }]
        )

        const response = await getAction.call(this, {
          entity: this.entity,
          key: 'fetchFilters',
          payload: { url: this.url }
        })

        this.$emit('fetch-success', response)

        this.$qas.logger.group(
          `QasFilters - fetchFilters -> resposta da action ${this.entity}/fetchFilters`, [response]
        )
      } catch (error) {
        this.hasFetchError = true
        this.$emit('fetch-error', error)

        this.$qas.logger.group(
          `QasFilters - fetchFilters -> exceção da action ${this.entity}/fetchFilters`,
          [error],
          { error: true }
        )
      } finally {
        this.isFetching = false
      }
    },

    filter (external) {
      const { filters, page, ...context } = this.mx_context

      const query = {
        ...filters,
        ...this.filters,
        ...external,
        ...context,
        search: this.search || undefined
      }

      this.hideFiltersMenu()
      this.updateCurrentFilters()
      this.updateRouteQuery(query)
    },

    getChipValue (value) {
      return Array.isArray(value) ? value.join(', ') : value
    },

    hideFiltersMenu () {
      this.$refs.filtersButton?.$refs?.menu?.hide()
    },

    removeFilter ({ name }) {
      const query = { ...this.$route.query }

      delete query[name]
      delete this.filters[name]

      this.updateCurrentFilters()
      this.updateRouteQuery(query)
    },

    updateCurrentFilters () {
      this.currentFilters = {
        ...this.filters,
        ...(this.search && { search: this.search })
      }

      this.$emit('update:currentFilters', this.currentFilters)
    },

    updateRouteQuery (query) {
      this.useUpdateRoute && this.$router.push({ query })
    },

    updateValues () {
      this.setSearch()

      const { filters } = this.mx_context

      for (const key in filters) {
        this.filters[key] = parseValue(this.normalizeValues(filters[key], this.fields[key]?.multiple))
      }
    },

    normalizeValues (value, isMultiple) {
      if (Array.isArray(value)) return value

      return isMultiple ? [value] : value
    },

    watchOnceFields () {
      if (!this.useUpdateRoute) return

      const watchOnce = this.$watch('fields', values => {
        if (Object.keys(values).length) {
          this.updateValues()
          this.updateCurrentFilters()
          watchOnce()
        }
      })
    },

    handleSearchModelOnCreate () {
      if (this.useUpdateRoute && !this.useFilterButton) {
        this.setSearch()
      }
    },

    onSearch () {
      if (this.debounce) {
        this.filter()
      }
    },

    setSearch () {
      const { search } = this.mx_context
      this.search = search || ''
    }
  }
}
</script>

<style lang="scss">
// TODO rever
.qas-filters {
  &__input-content {
    .q-field {
      &::before {
        border: 2px solid transparent;
        border-radius: var(--qas-generic-border-radius);
        bottom: 0;
        content: '';
        left: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        transition: border-color var(--qas-generic-transition);
      }

      &--dense .q-field__prepend {
        padding-right: var(--qas-spacing-xs);
      }

      &--dense .q-field__append {
        padding-left: var(--qas-spacing-sm);
      }

      &--focused::before {
        border-color: var(--q-primary);
        color: var(--q-primary);
      }

      &__control::after,
      &__control::before {
        display: none !important;
      }

      &__native {
        padding-bottom: var(--qas-spacing-sm);
        padding-top: var(--qas-spacing-sm);
      }
    }
  }
}
</style>
