<template>
  <section class="q-mb-lg">
    <div v-if="showFilters" class="q-gutter-x-md row">
      <div v-if="showSearch" class="col">
        <slot :filter="filter" name="search">
          <q-form v-if="useSearch" @submit.prevent="filter()">
            <q-input v-model="search" :debounce="debounce" dense :placeholder="searchPlaceholder" type="search">
              <template #append>
                <q-btn v-if="hasSearch" icon="o_clear" unelevated @click="clearSearch" />
                <q-btn v-if="!debounce" icon="o_search" type="submit" unelevated @click="filter()" />
              </template>
            </q-input>
          </q-form>
        </slot>
      </div>

      <slot v-if="showFilterButton" :filter="filter" name="filter-button">
        <q-btn v-if="useFilterButton" :color="filterButtonColor" flat icon="o_filter_list" :label="filterButtonLabel">
          <q-menu @before-show="fetchFilters">
            <div v-if="isFetching" class="q-pa-xl text-center">
              <q-spinner color="grey" size="2em" />
            </div>

            <div v-else-if="hasFetchError" class="q-pa-xl text-center">
              <q-icon color="negative" name="o_warning" size="2em" />
            </div>

            <q-form v-else class="q-gutter-y-md q-pa-md" @submit.prevent="filter()">
              <div v-for="(field, index) in fields" :key="index">
                <qas-field v-model="filters[field.name]" dense :field="field" />
              </div>

              <div class="text-right">
                <q-btn class="q-mr-sm" label="Limpar" size="12px" unelevated @click="clearFilters" />
                <q-btn color="primary" label="Filtrar" size="12px" type="submit" unelevated />
              </div>
            </q-form>
          </q-menu>
        </q-btn>
      </slot>
    </div>

    <div v-if="useBadges && hasActiveFilters" class="q-mt-md">
      <q-chip v-for="(filterItem, key) in activeFilters" :key="key" color="grey-4" dense removable size="md" text-color="grey-8" @remove="removeFilter(filterItem)">{{ filterItem.label }} = "{{ getChipValue(filterItem.value) }}"</q-chip>
    </div>

    <slot :context="mx_context" :filter="filter" :filters="activeFilters" :remove-filter="removeFilter" />
  </section>
</template>

<script>
import QasField from '../field/QasField.vue'

import { camelize, camelizeKeys } from 'humps'
import { humanize, parseValue } from '../../helpers/filters.js'
import contextMixin from '../../mixins/context.js'

export default {
  name: 'QasFilters',

  components: {
    QasField
  },

  mixins: [contextMixin],

  props: {
    useBadges: {
      default: true,
      type: Boolean
    },

    entity: {
      required: true,
      type: String
    },

    useFilterButton: {
      default: true,
      type: Boolean
    },

    useSearch: {
      default: true,
      type: Boolean
    },

    searchOnType: {
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
    }
  },

  emits: ['fetch-success', 'fetch-error'],

  data () {
    return {
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
      const filters = camelizeKeys(this.mx_context.filters)

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
      return this.searchOnType ? '500' : ''
    },

    fields () {
      return this.$store.getters[`${this.entity}/filters`]
    },

    filterButtonColor () {
      return this.hasActiveFilters ? 'primary' : 'grey-8'
    },

    filterButtonLabel () {
      return this.$q.screen.gt.xs ? 'Filtrar' : undefined
    },

    hasActiveFilters () {
      return !!Object.keys(this.activeFilters).length
    },

    hasFields () {
      return !!Object.keys(this.fields).length
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
    }
  },

  watch: {
    $route (to, from) {
      if (to.name === from.name) {
        this.fetchFilters()
        this.updateValues()
      }
    },

    search () {
      if (this.debounce) {
        this.filter()
      }
    }
  },

  created () {
    this.fetchFilters()
    this.watchOnceFields()
  },

  methods: {
    clearFilters () {
      const { filters, ...query } = this.mx_context

      if (this.hasFields) {
        const fields = Object.keys(this.fields)

        for (const key in filters) {
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

      this.$router.push({ query })
    },

    clearSearch () {
      this.search = ''
      this.filter()
    },

    async fetchFilters () {
      if (this.hasFields || !this.useFilterButton) {
        return null
      }

      this.hasFetchError = false
      this.isFetching = true

      try {
        const response = await this.$store.dispatch(`${this.entity}/fetchFilters`, { url: this.url })
        this.$emit('fetch-success', response)
      } catch (error) {
        this.hasFetchError = true
        this.$emit('fetch-error', error)
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

      this.$router.push({ query })
    },

    getChipValue (value) {
      return Array.isArray(value) ? value.join(', ') : value
    },

    removeFilter ({ name }) {
      const query = { ...this.$route.query }

      delete query[name]
      delete this.filters[name]

      this.$router.push({ query })
    },

    updateValues () {
      const { filters, search } = this.mx_context
      this.search = search || ''

      for (const key in filters) {
        this.filters[key] = parseValue(this.normalizeValues(filters[key], this.fields[key]?.multiple))
      }
    },

    normalizeValues (value, isMultiple) {
      if (Array.isArray(value)) return value

      return isMultiple ? [value] : value
    },

    watchOnceFields () {
      const watchOnce = this.$watch('fields', values => {
        if (Object.keys(values).length) {
          this.updateValues()
          watchOnce()
        }
      })
    }
  }
}
</script>
