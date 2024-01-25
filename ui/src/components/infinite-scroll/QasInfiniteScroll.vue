<template>
  <div class="qas-infinite-scroll" :style="containerStyle">
    <q-infinite-scroll
      ref="infiniteScroll"
      v-bind="attributes"
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

    <qas-empty-result-text v-if="hasNoResults" />
  </div>
</template>

<script setup>
import { ref, computed, inject, nextTick } from 'vue'
import { NotifyError } from '../../plugins'

defineOptions({ name: 'QasInfiniteScroll' })

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },

  limitPerPage: {
    type: Number,
    default: 12
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

defineExpose({ refresh, remove })

const emit = defineEmits(['update:list'])

const axios = inject('axios')

axios.defaults.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YjI3Y2Y0MS0wMDk1LTQ2MDctOTdiMC03YzEyNzc4Zjc5OTEiLCJqdGkiOiJhOWMxYTA3NDYyMTVlZDVmY2UxYTUwOGU3MjRkZGVjYWI4OWI2M2JlYzc3NTdjOWQxNjY4OGE3MDBhODE5ODU3NjQ0ZjE1MGQyOWE1Yjg5OSIsImlhdCI6MTcwNTk1MzAzMS4xODAyMTQsIm5iZiI6MTcwNTk1MzAzMS4xODAyMTUsImV4cCI6MTczNzU3NTQzMS4xNzE4OTksInN1YiI6IjM1MiIsInNjb3BlcyI6WyIqIl19.uuEBT_vwqK-5LoAmADtcvdEcI0wUUp4T5AMIUctE_6mN4IOltbHWZr6I_bXe49jcpYwRKdVGH-WqdLBYV79MM2iBYKKBQg73a7YlsCAvJAK5GtzQQgntzg3-9QJFigS6WgxHfpbZx4owaIm-sV_PzhqVqFGMcLICbp0y09j20fqXUsLlTe-feL8bCU-Oisa0yQx5cAwtC8RpZlXgCcTqKZt0hibSUKLYAKHSlV7H4l-VMFd4_WsJ_swmLfXj8LyIQY023TdxkSbkBAbLi5U3nLAf6jRg7kNkfCeCZHHSQujAzbTAHYrAM7E2itdL_UJ7E5oGg6K4SNSq1Lca-JsYRcYRcRXuogMSwoI5WMW4UGBUN2CHIvsn80N6HmFHCnfjPzbztSCKAhmTRjdErvOmed03moeHZ7es0jxbfdgUb5GMpeOnce4BiRG5TVhowNvpyq1rt_lIwigCVFj_qOUref40JIS6vg9vxlVZl93_A7ResfUUoGp0xJ8o167dK8lHyAuw6TVUgimkARlmHtRLhVkqOalt3A7MwuNPVCFu_0_kfjBRd7DyiM9g_tmySJEO0wQgCEkrjGNveyvH4fSYRYtLrf104KHG0nC_vf6r5BA-bdHm5x6AB776BwhgLzOQhR8fwtkBZZW_WroQqdhai8BrZJudEnoQqXF5wpMq7lg'

const infiniteScroll = ref(null)

const hasFetchingError = ref(false)
const isFetching = ref(false)
const hasMadeFirstFetch = ref(false)
const count = ref(0)
const offset = ref(0)

const listLength = computed(() => model.value.length)

const attributes = computed(() => ({
  offset: 100,
  debounce: 0,
  ...(props.maxHeight && { scrollTarget: '.qas-infinite-scroll' }),
  ...props.infiniteScrollProps
}))

const isEmptyList = computed(() => !listLength.value && !isFetching.value)

const hasNoResults = computed(() => isEmptyList.value && hasMadeFirstFetch.value)

const containerStyle = computed(() => ({
  ...(props.maxHeight && { maxHeight: props.maxHeight, overflow: 'auto' })
}))

const model = computed({
  get () {
    return props.list
  },

  set (newList) {
    emit('update:list', newList)
  }
})

async function onLoad (_, done) {
  const hasMadeFirstFetchAndHasNoData = hasMadeFirstFetch.value && !listLength.value
  const hasFetchAllData = listLength.value && listLength.value >= count.value
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

    const { data } = await axios.get(props.url, {
      params: { offset: offset.value, limit: props.limitPerPage, ...props.params }
    })

    const newList = [...model.value, ...(data.results || [])]

    model.value = newList
    offset.value = newList.length
    count.value = data.count

    /**
     * Sinalizar que houve já uma busca, para evitar que onLoad entre em looping,
     * após buscar uma vez e retornar uma lista vazia.
    */
    hasMadeFirstFetch.value = true
  } catch {
    NotifyError('Ops… Não conseguimos acessar as informações. Por favor, tente novamente em alguns minutos.')

    hasFetchingError.value = true
  } finally {
    isFetching.value = false
  }
}

function refresh () {
  count.value = 0
  offset.value = 0
  model.value = []

  hasMadeFirstFetch.value = false

  nextTick(() => {
    infiniteScroll.value.reset()
    infiniteScroll.value.resume()
  })
}

function remove (index) {
  model.value.splice(index, 1)
  count.value -= 1
  offset.value -= 1
}
</script>
