<template>
  <qas-grabbable class="qas-board-generator" use-scroll-bar>
    <div class="no-wrap q-col-gutter-sm q-px-xl row">
      <div v-for="(header, index) in headers" :key="index" class="q-mr-sm">
        <qas-box class="q-mb-md">
          <slot :fields="getFieldsByHeader(header)" :header="header" name="header-column" />
        </qas-box>

        <div ref="columnContainer" class="qas-board-generator__column secondary-scroll" :style="containerStyle">
          <slot v-for="item in getItemsByHeader(header)" :fields="getFieldsByHeader(header)" :item="item" name="column-item" />

          <div class="full-width justify-center q-mb-md q-mt-sm row">
            <qas-btn v-if="hasSeeMore(header)" icon="sym_r_add" label="Ver mais" :use-label-on-small-screen="false" variant="tertiary" @click="fetchColumn(header)" />

            <q-spinner v-if="columnsLoading[getKeyByHeader(header)]" color="grey-4" size="3em" />

            <qas-empty-result-text v-if="hasEmptyResultText(header)" />
          </div>
        </div>
      </div>
    </div>
  </qas-grabbable>
</template>

<script setup>
import { ref, watch, computed, onMounted, markRaw, inject } from 'vue'
import promiseHandler from '../../helpers/promise-handler'

defineOptions({ name: 'QasBoardGenerator' })

const columnContainer = ref(null)
const columnsPagination = ref({})
const columnsLoading = ref({})
const columnsFieldsModel = ref({})

const axios = inject('axios')

const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },

  results: {
    type: Object,
    default: () => ({})
  },

  columnIdKey: {
    type: String,
    required: true
  },

  columnParams: {
    type: Object,
    default: () => ({})
  },

  columnUrl: {
    type: String,
    required: true
  },

  height: {
    type: String,
    default: ''
  },

  limitPerColumn: {
    type: Number,
    default: 12
  },

  columnWidth: {
    type: String,
    default: '300px'
  },

  useMarkRaw: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'update:results',
  'fetch-column-success',
  'fetch-column-error',
  'fetch-columns-success',
  'fetch-columns-error'
])

watch(
  () => props.headers,
  () => {
    reset()
    setColumnHeightContainer()
    setColumnsPagination()
    fetchColumns()
  }
)

watch(columnContainer, setColumnHeightContainer)

onMounted(() => {
  setColumnsPagination()
  fetchColumns()
})

defineExpose({ fetchColumns, fetchColumn, reset })

const columnsResultsModel = computed({
  get () {
    return props.results
  },

  set (newValues) {
    emit('update:results', newValues)
  }
})

const hasColumnsLength = computed(() => Object.keys(columnsResultsModel.value).length)

const containerStyle = computed(() => `width: ${props.columnWidth};`)

/*
* Setar o tamanho do container do board, onde deverá ser a altura passada via prop, ou o default será ocupar o maximo
* de espaço que ele conseguir considerando a altura do container em relação ao topo.
*/
function setColumnHeightContainer () {
  columnContainer.value?.forEach(columnElement => {
    const heightToTop = columnElement?.getBoundingClientRect()?.top
    const paddingSpacing = 60
    const value = heightToTop + paddingSpacing

    columnElement.style.setProperty('height', props.height ? props.height : `calc(100vh - ${value}px)`)
  })
}

/*
* Bater API pra cada header
*/
async function fetchColumns () {
  const promises = props.headers.map(header => fetchColumn(header))

  const { error } = await promiseHandler(promises, { useLoading: false })

  if (error) {
    emit('fetch-columns-error', error)

    return
  }

  emit('fetch-columns-success')
}

/*
* Busca a coluna com base no header recebido.
*/
async function fetchColumn (header) {
  const headerKey = getKeyByHeader(header)
  const { limit, offset } = columnsPagination.value[headerKey] || {}

  const { data: response, error } = await promiseHandler(
    axios.get(`${props.columnUrl}/${headerKey}`, {
      params: {
        ...props.columnParams,
        limit,
        offset
      }
    }),
    {
      onLoading: value => {
        columnsLoading.value[headerKey] = value
      },
      useLoading: false,
      errorMessage: 'Não conseguimos buscar as colunas do board. Por favor, tente novamente em alguns minutos.'
    }
  )

  if (error) {
    emit('fetch-column-error', error)

    throw error
  }

  /*
  * exemplo de como columnsResultsModel irá ficar:
  *
  * {
  *  '2024-02-15': [...],
  *  '2024-02-16': [...]
  * }
  *
  * onde cada item do objeto é uma coluna no board. O mesmo vale para "columnsFieldsModel", "columnsLoading" e
  * "columnPagination", organizando os fields, loadings e o controle de paginação por chave identificadora do header.
  */
  const newColumnValues = [
    ...columnsResultsModel.value[headerKey] || [],
    ...response.data?.results || []
  ]

  columnsResultsModel.value[headerKey] = props.useMarkRaw ? markRaw(newColumnValues) : newColumnValues

  /*
  * Pode acontecer das options nos fields da segunda página serem diferentes da primeira página,
  * portanto deve ocorrer o merge.
  */
  if (response.data?.fields) {
    columnsFieldsModel.value[headerKey] = getMergedFields(columnsFieldsModel.value[headerKey], response.data?.fields)
  }

  columnsPagination.value[headerKey].offset = columnsResultsModel.value[headerKey].length
  columnsPagination.value[headerKey].count = response.data?.count

  emit('fetch-column-success', { response, header })
}

/*
* Mergeia os options antigos com os novos de cada field.
*/
function getMergedFields (oldFields, newFields) {
  // Primeira vez batendo a API, retorna os novos fields.
  if (!oldFields) return newFields

  // Caso bata a API e por algum motivo não venha fields, mantenha o antigos.
  if (oldFields && !newFields) return oldFields

  let mergedFields = {}

  for (const field in oldFields) {
    const oldCurrentField = oldFields[field]
    const newCurrentField = newFields[field]

    mergedFields = {
      ...mergedFields,
      [field]: {
        ...oldCurrentField,
        ...newCurrentField,
        ...(oldCurrentField.options && { options: handleOptions(oldCurrentField.options, newCurrentField.options) })
      }
    }
  }

  return mergedFields
}

/*
* Tratamento para fazer o merge e evitar options duplicados.
*/
function handleOptions (oldOptions, newOptions) {
  const options = [...oldOptions]

  newOptions.forEach(item => {
    const hasOption = options.find(option => option.value === item.value)

    if (!hasOption) options.push(item)
  })

  return options
}

function getItemsByHeader (header) {
  return hasColumnsLength.value ? columnsResultsModel.value[getKeyByHeader(header)] : []
}

/**
* Pegar key com base na chave identificador, exemplo:
* header -> { date: '2024-02-12', ... }
* columnIdKey -> 'date'
* retorno -> '2024-02-12'
*
* Onde esta chave será o "id" da coluna, sendo usado para bater a API, lidar com paginação, loading, etc.
*
* @example getKeyByHeader({ date: '2024-02-12', ... })
* @returns {string} // '2024-02-12'
*/
function getKeyByHeader (header = {}) {
  return header[props.columnIdKey]
}

/*
* Para cada header, irá ser criado um item com sua chave identificadora para lidar com paginação e loading.
* columnsPagination -> { '2024-02-15': { limit: 12, offset: 0 }, '2024-02-16': { limit: 12, offset: 0 }, ... }
* columnsLoading ->{ '2024-02-15': false, '2024-02-16': false, ... }
*/
function setColumnsPagination () {
  columnsPagination.value = {}
  columnsLoading.value = {}

  props.headers.forEach(header => {
    const headerKey = getKeyByHeader(header)

    columnsPagination.value[headerKey] = { limit: props.limitPerColumn, offset: 0 }
    columnsLoading.value[headerKey] = false
  })
}

function hasEmptyResultText (header) {
  return !columnsLoading.value[getKeyByHeader(header)] && !getItemsByHeader(header)?.length
}

/*
* Valida se o tamanho dos itens da coluna é menor que o valor total de itens que o back retorna e
* se a coluna não está em carregamento.
*/
function hasSeeMore (header) {
  const headerKey = getKeyByHeader(header)
  const hasMorePagination = columnsResultsModel.value[headerKey]?.length < columnsPagination.value[headerKey]?.count

  return hasMorePagination && !columnsLoading.value[headerKey]
}

function reset () {
  columnsResultsModel.value = {}
  columnsPagination.value = {}
  columnsLoading.value = {}
}

function getFieldsByHeader (header) {
  const headerKey = getKeyByHeader(header)

  return columnsFieldsModel.value[headerKey] || {}
}
</script>

<style lang="scss">
.qas-board-generator {
  max-height: 100vh;

  &__column {
    overflow-x: hidden;
    scrollbar-width: none;

    &:hover {
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        display: block;
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
