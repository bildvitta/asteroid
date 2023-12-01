<template>
  <section :class="filtersClass">
    <div v-if="showFilters" class="q-col-gutter-x-md row">
      <div v-if="showSearch" class="col-12 col-md-6">
        <slot :filter="filter" name="search">
          <q-form v-if="props.useSearch" @submit.prevent="filter()">
            <qas-search-input v-model="search" :placeholder="props.searchPlaceholder" :use-search-on-type="props.useSearchOnType" @clear="clearSearch" @filter="filter()" @update:model-value="onSearch">
              <template v-if="showFilterButton" #after-clear>
                <slot :context="context" :filter="filter" :filters="activeFilters" name="filter-button" :remove-filter="removeFilter">
                  <pv-filters-button v-if="props.useFilterButton" ref="filtersButton" v-model="filters" v-bind="filterButtonProps" />
                </slot>
              </template>
            </qas-search-input>
          </q-form>
        </slot>
      </div>

      <div v-else-if="showFilterButton" class="col-12 col-md-6">
        <slot :context="context" :filter="filter" :filters="activeFilters" name="filter-button" :remove-filter="removeFilter">
          <pv-filters-button v-if="props.useFilterButton" ref="filtersButton" v-model="filters" v-bind="filterButtonProps" />
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

    <slot :context="context" :filter="filter" :filters="activeFilters" :remove-filter="removeFilter" />
  </section>
</template>

<script setup>
import { ref, computed, useSlots, watch, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContext } from '../../composables'
import { camelize, camelizeKeys, decamelize } from 'humps'
import { humanize, parseValue } from '../../helpers/filters.js'
import { getState, getAction } from '@bildvitta/store-adapter'
import PvFiltersButton from './private/PvFiltersButton.vue'
import debug from 'debug'

const log = debug('asteroid-ui:qas-filters')

const { context } = useContext()
const route = useRoute()
const router = useRouter()

// TODO: Rever uso do getCurrentInstance()
const app = getCurrentInstance().appContext.config.globalProperties

defineOptions({ name: 'QasFilters' })

// Props
const props = defineProps({
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
})

// Emitters
const emits = defineEmits(['fetch-success', 'fetch-error', 'update:currentFilters'])

// Slots
const slots = useSlots()

// Refs
const currentFilters = ref({})
const filters = ref({})
const filtersButton = ref(null)
const hasFetchError = ref(false)
const isFetching = ref(false)
const search = ref('')

// Computadas
const activeFilters = computed(() => {
  if (!hasFields.value) {
    return {}
  }

  const activeFilters = {}

  const fieldsKeys = Object.keys(fields.value)
  const filters = camelizeKeys(props.useUpdateRoute ? context.value.filters : currentFilters.value)

  for (const key in filters) {
    const hasField = fieldsKeys.includes(key)

    if (hasField) {
      const field = { ...fields.value[key], ...formattedFieldsProps.value?.[decamelize(key)] }
      const value = humanize(field, normalizeValues(filters[key], field?.multiple))

      if (!value) continue

      const { label, name } = field

      activeFilters[key] = { label, name, value }
    }
  }

  return activeFilters
})

const formattedFieldsProps = computed(() => {
  const fieldsProps = {}

  for (const key in props.fieldsProps) {
    const decamelizedFieldKey = decamelize(key)

    fieldsProps[decamelizedFieldKey] = { ...props.fieldsProps[key] }
  }

  return fieldsProps
})

const fields = computed(() => {
  return getState.call(app, { entity: props.entity, key: 'filters' })
})

const filtersClass = computed(() => {
  return {
    'q-mb-xl': props.useSpacing
  }
})

const filterButtonColor = computed(() => {
  return hasActiveFilters.value ? 'primary' : 'grey-9'
})

const filterButtonProps = computed(() => {
  return {
    color: filterButtonColor.value,
    error: hasFetchError.value,
    fields: fields.value,
    fieldsProps: formattedFieldsProps.value,
    loading: isFetching.value,

    onClear: clearFilters,
    onFilter: () => filter()
  }
})

const hasActiveFilters = computed(() => {
  return !!Object.keys(activeFilters.value).length
})

const hasFields = computed(() => {
  return !!Object.keys(fields.value || {}).length
})

const showFilterButton = computed(() => {
  return !!slots.filterButton || props.useFilterButton
})

const showFilters = computed(() => {
  return props.useFilterButton || showSearch.value
})

const showSearch = computed(() => {
  return !!slots.search || props.useSearch
})

const hasChip = computed(() => {
  return props.useChip && hasActiveFilters.value
})

// Watchers
watch(
  () => route,
  (to, from) => {
    if (to.name === from.name) {
      fetchFilters()

      props.useUpdateRoute && updateValues()
    }
  }
)

// Métodos
async function init () {
  await fetchFilters()

  if (props.useUpdateRoute) {
    updateValues()
    updateCurrentFilters()
  }

  handleSearchModelOnCreate()
}

async function clearFilters () {
  const query = { ...route.query }

  const activeFilters = {
    ...context.value.filters,
    ...filters.value
  }

  if (hasFields.value) {
    const fieldsKeys = Object.keys(fields.value)

    for (const key in activeFilters) {
      const camelizedKey = camelize(key)
      const hasField = fieldsKeys.includes(camelizedKey)

      if (hasField) {
        delete query[key]
        delete filters.value[key]
      }
    }
  } else {
    filters.value = {}
  }

  hideFiltersMenu()

  await updateRouteQuery(query)

  updateCurrentFilters()
}

function clearSearch () {
  search.value = ''

  filter()
}

async function fetchFilters () {
  if (!props.useForceRefetch && (hasFields.value || !props.useFilterButton)) {
    return null
  }

  hasFetchError.value = false
  isFetching.value = true

  try {
    const response = await getAction.call(app, {
      entity: props.entity,
      key: 'fetchFilters',
      payload: { url: props.url }
    })

    emits('fetch-success', response)

    log(`[${props.entity}]:fetchFilters:success`, response)
  } catch (error) {
    hasFetchError.value = true
    emits('fetch-error', error)

    log(`[${props.entity}]:fetchFilters:error`, error)
  } finally {
    isFetching.value = false
  }
}

async function filter (external) {
  const { filters: contextFilters, page, ...rest } = context.value

  const query = {
    ...contextFilters,
    ...filters.value,
    ...external,
    ...rest,
    search: search.value || undefined
  }

  for (const key in query) {
    query[key] ?? delete query[key]
  }

  hideFiltersMenu()

  await updateRouteQuery(query)

  updateCurrentFilters()
}

function getChipValue (value) {
  return Array.isArray(value) ? value.join(', ') : value
}

function hideFiltersMenu () {
  filtersButton.value?.hideMenu()
}

async function removeFilter ({ name }) {
  const query = { ...route.query }

  delete query[name]
  delete filters.value[name]

  await updateRouteQuery(query)

  updateCurrentFilters()
}

function updateCurrentFilters () {
  currentFilters.value = {
    ...filters.value,
    ...(search.value && { search: search.value })
  }

  emits('update:currentFilters', currentFilters.value)
}

async function updateRouteQuery (query) {
  return props.useUpdateRoute && await router.push({ query })
}

function updateValues () {
  setSearch()
  setFilters()
}

function normalizeValues (value, isMultiple) {
  if (Array.isArray(value)) return value

  return isMultiple ? [value] : value
}

function handleSearchModelOnCreate () {
  if (props.useUpdateRoute && !props.useFilterButton) {
    setSearch()
  }
}

function onSearch () {
  if (props.useSearchOnType) {
    filter()
  }
}

function setSearch () {
  search.value = context.value.search || ''
}

function setFilters () {
  filters.value = {}

  for (const key in context.value.filters) {
    filters.value[key] = parseValue(normalizeValues(context.value.filters[key], fields.value[key]?.multiple))
  }
}

init()
</script>
