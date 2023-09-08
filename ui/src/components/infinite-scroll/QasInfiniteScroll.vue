<template>
  <div id="qas-infinite-scroll__container" :style="containerClass">
    <q-infinite-scroll
      ref="infiniteScroll"
      v-bind="attributes"
      scroll-target="#qas-infinite-scroll__container"
      @load="onLoad"
    >
      <slot />

      <template #loading>
        <div class="justify-center q-my-md row">
          <q-spinner-dots
            color="primary"
            size="40px"
          />
        </div>
      </template>
    </q-infinite-scroll>

    <qas-empty-result-text v-if="showNoResults" />
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
import axios from 'axios'
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
const madeTheFirstSearch = ref(false)
const infiniteScroll = ref(null)

const listLength = computed(() => props.list.length)

const attributes = computed(() => ({
  offset: 100,
  debounce: 0,
  ...props.infiniteScrollProps
}))

const listIsEmpty = computed(() => !listLength.value && !isFetching.value)

const showNoResults = computed(() => listIsEmpty.value && madeTheFirstSearch.value)

const containerClass = computed(() => ({
  ...(props.maxHeight && { maxHeight: props.maxHeight, overflow: 'auto' })
}))

async function onLoad (_, done) {
  const madeTheFirstSearchAndHasNoData = madeTheFirstSearch.value && !listLength.value
  const alreadyFetchAllData = listLength.value && listLength.value >= props.count
  const stop = hasFetchingError.value || isFetching.value || madeTheFirstSearchAndHasNoData || alreadyFetchAllData

  if (stop) {
    infiniteScroll.value.stop()
  } else {
    infiniteScroll.value.resume()
    await fetch()
  }

  done()
}

async function fetch () {
  try {
    isFetching.value = true

    const { data } = await axios.get(props.url, {
      params: { offset: props.offset, limit: props.limit, ...props.params }
    })

    const newList = [...props.list, ...(data?.results || [])]

    emits('update:list', newList)
    emits('update:offset', newList.length)
    emits('update:count', data?.count)

    // Sinalizar que houve já uma busca, para evitar que onLoad entre em looping, após buscar uma vez e retornar uma lista vazia.
    madeTheFirstSearch.value = true
  } catch {
    NotifyError('Ops… Não conseguimos acessar as informações. Por favor, tente novamente em alguns minutos.')

    hasFetchingError.value = true
  } finally {
    isFetching.value = false
  }
}
</script>
