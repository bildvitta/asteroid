<template>
  <div class="qas-infinite-scroll" :style="containerStyle">
    <q-infinite-scroll
      ref="infiniteScroll"
      v-bind="attributes"
      scroll-target=".qas-infinite-scroll"
      @load="onLoad"
    >
      <slot />

      <template #loading>
        <div class="justify-center q-my-md row">
          <q-spinner-dots
            color="primary"
            size="3em"
          />
        </div>
      </template>
    </q-infinite-scroll>

    <qas-empty-result-text v-if="notHasResults" />
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
// import axios from 'axios'
import { NotifyError } from '../../plugins'

defineOptions({ name: 'QasInfiniteScroll' })

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },

  limit: {
    type: Number,
    default: 12
  },

  offset: {
    type: Number,
    default: 0
  },

  count: {
    type: Number,
    default: 0
  },

  url: {
    type: String,
    default: '',
    required: true
  },

  params: {
    type: Object,
    default: () => ({})
  },

  infiniteScrollProps: {
    type: Object,
    default: () => ({})
  },

  maxHeight: {
    type: String,
    default: ''
  }
})

const emits = defineEmits([
  'update:list',
  'update:offset',
  'update:count'
])

const hasFetchingError = ref(false)
const isFetching = ref(false)
const hasMadeFirstFetch = ref(false)
const infiniteScroll = ref(null)

const listLength = computed(() => props.list.length)

const attributes = computed(() => ({
  offset: 100,
  debounce: 0,
  ...props.infiniteScrollProps
}))

const isEmptyList = computed(() => !listLength.value && !isFetching.value)

const notHasResults = computed(() => isEmptyList.value && hasMadeFirstFetch.value)

const containerStyle = computed(() => ({
  ...(props.maxHeight && { maxHeight: props.maxHeight, overflow: 'auto' })
}))

async function onLoad (_, done) {
  const hasMadeFirstFetchAndHasNoData = hasMadeFirstFetch.value && !listLength.value
  const hasFetchAllData = listLength.value && listLength.value >= props.count
  const stop = hasFetchingError.value || isFetching.value || hasMadeFirstFetchAndHasNoData || hasFetchAllData

  if (stop) {
    infiniteScroll.value.stop()
  } else {
    infiniteScroll.value.resume()
    await fetchList()
  }

  done()
}

async function fetchList () {
  try {
    isFetching.value = true

    await new Promise(resolve => setTimeout(resolve, 2000))

    // const { data } = await axios.get(props.url, {
    //   params: { offset: props.offset, limit: props.limit, ...props.params }
    // })

    console.log('caiu no fetch')
    const { data } = fetchAPI()

    console.log(data, '<--- data')

    const newList = [...props.list, ...(data.results || [])]

    console.log(newList, '<-- newList')

    emits('update:list', newList)
    emits('update:offset', newList.length)
    emits('update:count', data.count)

    // Sinalizar que houve já uma busca, para evitar que onLoad entre em looping, após buscar uma vez e retornar uma lista vazia.
    hasMadeFirstFetch.value = true
  } catch (error) {
    console.log(error, '<--- error')
    NotifyError('Ops… Não conseguimos acessar as informações. Por favor, tente novamente em alguns minutos.')

    hasFetchingError.value = true
  } finally {
    isFetching.value = false
  }
}

function fetchAPI () {
  const response = { count: (props.count + 1000), results: [] }

  for (let i = 0; i < (props.list.length + 12); i++) {
    response.results.push(
      {
        date: '2023-01-11T14:58:40.000000Z',
        description: 'Cliente enviado para análise cadastral'
      }
    )
  }

  return { data: response }
}
</script>
