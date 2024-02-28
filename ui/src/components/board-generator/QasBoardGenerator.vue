<template>
  <qas-grabbable class="qas-board-generator" use-scroll-bar>
    <div class="no-wrap q-col-gutter-sm q-px-xl row">
      <div v-for="(header, index) in results" :key="index" class="q-mr-sm">
        <qas-box class="q-mb-md">
          <slot :context="header" name="header-column" />
        </qas-box>

        <div ref="columnContainer" class="qas-board-generator__column secondary-scroll" :style="containerStyle">
          <slot v-for="item in getItemsByHeader(header)" :context="item" name="column-item" />

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
import { ref, watch, computed, onMounted, shallowRef, inject } from 'vue'
import promiseHandler from '../../helpers/promise-handler'

defineOptions({ name: 'QasBoardGenerator' })

const columnContainer = ref(null)
const columnsPagination = ref({})
const columnsLoading = ref({})

const axios = inject('axios')

const props = defineProps({
  results: {
    type: Array,
    default: () => []
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

  modelValue: {
    type: Object,
    default: () => ({})
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
    default: '288px'
  },

  useShallowRef: {
    type: Boolean,
    default: true
  }
})

watch(
  () => props.results,
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

const emit = defineEmits(['update:modelValue'])

defineExpose({ fetchColumns, fetchColumn, reset })

const columnsModel = computed({
  get () {
    return props.modelValue
  },

  set (newValues) {
    emit('update:modelValue', newValues)
  }
})

const hasColumnsLength = computed(() => Object.keys(columnsModel.value).length)

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
  props.results.forEach(header => fetchColumn(header))
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

  if (error) return

  /*
  * exemplo de como columnsModel irá ficar:
  *
  * {
  *  '2024-02-15': [...],
  *  '2024-02-16': [...]
  * }
  *
  * onde cada item do objeto é uma coluna no board. O mesmo vale para "columnsLoading" e "columnPagination", organizando
  * os loadings e o controle de paginação por chave identificadora do header.
  */
  const newColumnValues = [
    ...columnsModel.value[headerKey] || [],
    ...response.data?.results || []
  ]

  columnsModel.value[headerKey] = props.useShallowRef ? shallowRef(newColumnValues) : newColumnValues

  columnsPagination.value[headerKey].offset = columnsModel.value[headerKey].length
  columnsPagination.value[headerKey].count = response.data?.count
}

function getItemsByHeader (header) {
  return hasColumnsLength.value ? columnsModel.value[getKeyByHeader(header)] : []
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

  props.results.forEach(header => {
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
  const hasMorePagination = columnsModel.value[headerKey]?.length < columnsPagination.value[headerKey]?.count

  return hasMorePagination && !columnsLoading.value[headerKey]
}

function reset () {
  columnsModel.value = {}
  columnsPagination.value = {}
  columnsLoading.value = {}
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
