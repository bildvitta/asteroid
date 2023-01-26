<template>
  <section class="q-mb-xl qas-filters">
    <div v-if="showFilters" class="q-col-gutter-x-md row">
      <div v-if="showSearch" class="col-12 col-md-6">
        <slot :filter="filter" name="search">
          <q-form v-if="useSearch" @submit.prevent="filter()">
            <qas-input v-model="search" class="bg-white q-px-sm qas-filters__input rounded-borders-sm shadow-2" data-cy="filters-search-input" :debounce="debounce" dense hide-bottom-space input-class="ellipsis text-grey-8" :outlined="false" :placeholder="searchPlaceholder" type="search">
              <template #prepend>
                <q-icon v-if="useSearchOnType" color="grey-8" name="sym_r_search" />
                <qas-btn v-else color="grey-9" icon="sym_r_search" variant="tertiary" @click="filter()" />
              </template>

              <template #append>
                <qas-btn v-if="hasSearch" class="q-mr-sm" color="grey-9" icon="sym_r_clear" variant="tertiary" @click="clearSearch" />

                <qas-btn v-if="useFilterButton" :color="filterButtonColor" data-cy="filters-btn" icon="sym_r_tune" variant="tertiary">
                  <q-menu anchor="center right" class="full-width" max-width="270px" self="top right">
                    <div v-if="isFetching" class="q-pa-xl text-center">
                      <q-spinner color="grey" size="2em" />
                    </div>

                    <div v-else-if="hasFetchError" class="q-pa-xl text-center">
                      <q-icon color="negative" name="sym_r_warning" size="2em" />
                    </div>

                    <q-form v-else class="q-gutter-y-md q-pa-md" @submit.prevent="filter()">
                      <div v-for="(field, index) in fields" :key="index">
                        <qas-field v-model="filters[field.name]" :data-cy="`filters-${field.name}-field`" :field="field" v-bind="fieldsProps[field.name]" />
                      </div>

                      <div class="q-col-gutter-x-md q-mt-xl row">
                        <div class="col-6">
                          <qas-btn class="full-width" data-cy="filters-clear-btn" label="Limpar" variant="secondary" @click="clearFilters" />
                        </div>

                        <div class="col-6">
                          <qas-btn class="full-width" data-cy="filters-submit-btn" label="Filtrar" type="submit" variant="primary" />
                        </div>
                      </div>
                    </q-form>
                  </q-menu>
                </qas-btn>
              </template>
            </qas-input>
          </q-form>
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
import QasField from '../field/QasField.vue'
import QasBtn from '../btn/QasBtn.vue'

import { camelize, camelizeKeys } from 'humps'
import { humanize, parseValue } from '../../helpers/filters.js'
import contextMixin from '../../mixins/context.js'
import { getState, getAction } from '@bildvitta/store-adapter'

export default {
  name: 'QasFilters',

  components: {
    QasBtn,
    QasField
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
      return this.useSearchOnType ? '1200' : ''
    },

    fields () {
      return getState.call(this, { entity: this.entity, key: 'filters' })
    },

    filterButtonColor () {
      return this.hasActiveFilters ? 'primary' : 'grey-9'
    },

    // TODO: remover
    filterButtonLabel () {
      return this.$q.screen.gt.xs ? 'Filtrar' : undefined
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

<style lang="scss">
// TODO rever
.qas-filters {
  .q-field::before {
    border: 2px solid transparent;
    border-radius: 4px;
    bottom: 0;
    content: '';
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: border-color var(--qas-generic-transition);
  }

  .q-field--focused::before {
    border-color: var(--q-primary);
    color: var(--q-primary);
  }

  .q-field--dense .q-field__prepend {
    padding-right: var(--qas-spacing-xs);
  }

  .q-field--dense .q-field__append {
    padding-left: var(--qas-spacing-sm);
  }

  &__input {
    .q-field__control::before,
    .q-field__control::after {
      display: none;
    }

    .q-field__native {
      padding-bottom: var(--qas-spacing-sm);
      padding-top: var(--qas-spacing-sm);
    }
  }
}
</style>
