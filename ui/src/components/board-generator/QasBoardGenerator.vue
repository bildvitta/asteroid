<template>
  <qas-grabbable class="qas-board-generator">
    <div class="no-wrap q-col-gutter-sm q-px-xl row">
      <div v-for="(header, index) in results" :key="index" class="q-mr-sm">
        <qas-box class="q-mb-md">
          <slot :context="header" name="header-column" />
        </qas-box>

        <div ref="columnContainer" class="qas-board-generator__column">
          <slot v-for="column in getColumn(header)" :context="column" name="column-item" />

          <div class="full-width justify-center q-mt-sm row">
            <qas-btn
              v-if="showSeeMore(getKeyByHeaderKey(header))" icon="sym_r_add" label="Ver mais"
              :use-label-on-small-screen="false" variant="tertiary" @click="fetchColumn(header)"
            />

            <q-spinner v-if="columnsLoading[getKeyByHeaderKey(header)]" color="grey-4" size="3em" />

            <qas-empty-result-text v-if="showEmptyResultText(header)" />
          </div>
        </div>
      </div>
    </div>
  </qas-grabbable>
</template>

<script setup>
import { ref, watch, computed, onMounted, toRaw, inject } from 'vue'
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
    default: '',
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

  limit: {
    type: Number,
    default: 12
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

watch(columnContainer, () => setColumnHeightContainer())

onMounted(() => {
  setColumnsPagination()
  fetchColumns()
})

const emit = defineEmits(['update:modelValue'])

defineExpose({ fetchColumns, fetchColumn })

const columnsModel = computed({
  get () {
    return props.modelValue
  },

  set (newValues) {
    emit('update:modelValue', newValues)
  }
})

function setColumnHeightContainer () {
  columnContainer.value?.forEach(columnElement => {
    const heightToTop = columnElement?.getBoundingClientRect()?.top
    const value = heightToTop + 60

    columnElement.style.setProperty('height', props.height ? props.height : `calc(100vh - ${value}px)`)
  })
}

async function fetchColumns () {
  /*
  * Bater API pra cada header
  */
  props.results.forEach(header => fetchColumn(header))
}

/*
* Busca a coluna com base no header recebido.
*/
async function fetchColumn (header) {
  const headerKey = getKeyByHeaderKey(header)
  const { limit, offset } = columnsPagination.value[headerKey] || {}

  const response = await promiseHandler(
    axios.get(`${props.columnUrl}/${headerKey}`, {
      params: {
        ...props.columnParams,
        limit,
        offset
      }
    }),
    {
      onLoading: value => { columnsLoading.value[headerKey] = value },
      useLoading: false,
      errorMessage: 'Não conseguimos salvar as informações. Por favor, tente novamente em alguns minutos.'
    }
  )

  /*
  * exemplo de como columnsModel irá ficar:
  * {
  *  '2024-02-15': [...],
  *  '2024-02-16': [...]
  * }
  * onde cada item do objeto é uma coluna no board. O mesmo vale para "columnsLoading" e "columnPagination", organizando
  * os loadings e o controle de paginação por chave identificadora do header.
  */
  const columnItems = response.data?.data?.results || []

  columnsModel.value[headerKey] = toRaw([
    ...columnsModel.value[headerKey] || [],
    ...columnItems
  ])

  columnsPagination.value[headerKey] = {
    ...columnsPagination.value[headerKey],
    offset: columnsModel.value[headerKey].length,
    count: response.data?.data?.count
  }
}

function getColumn (header) {
  return Object.keys(columnsModel.value).length ? columnsModel.value[getKeyByHeaderKey(header)] : []
}

/*
* Pegar key com base na chave identificador, exemplo:
* header -> { date: '2024-02-12', ... }
* columnIdKey -> 'date'
* retorno -> '2024-02-12'
*
* Onde esta chave será o "id" da coluna, sendo usado para bater a API, lidar com paginação, loading, etc.
*/
function getKeyByHeaderKey (header = {}) {
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
    const headerKey = getKeyByHeaderKey(header)

    columnsPagination.value[headerKey] = { limit: props.limit, offset: 0 }
    columnsLoading.value[headerKey] = false
  })
}

function showEmptyResultText (header) {
  return !columnsLoading.value[getKeyByHeaderKey(header)] && !getColumn(header)?.length
}

/*
* Valida se o tamanho dos itens da coluna é menor que o valor total de itens que o back retorna e
* se a coluna não está em carregamento.
*/
function showSeeMore (headerKey) {
  return (
    (columnsModel.value[headerKey]?.length < columnsPagination.value[headerKey]?.count) &&
    !columnsLoading.value[headerKey]
  )
}

function reset () {
  columnsModel.value = []
  columnsPagination.value = {}
  columnsLoading.value = {}
}
</script>

<style lang="scss">
.qas-board-generator {
  max-height: 100vh;

  &__column {
    width: 288px;
    /* Tamanho das colunas de acordo com o figma */
    overflow-x: hidden;
    scrollbar-width: none;

    &:hover {
      scrollbar-width: thin;
      scrollbar-color: $blue-1 transparent;

      &::-webkit-scrollbar {
        display: block;
      }
    }

    &::-webkit-scrollbar {
      width: 8px;
      display: none;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $blue-1;
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: $blue-1;
    }
  }
}
</style>
