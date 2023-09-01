<template>
  <div ref="parent" class="full-width">
    <div class="justify-between no-wrap row text-no-wrap">
      <div ref="truncate" :class="truncateTextClass">
        <slot>{{ text }}</slot>
      </div>

      <div v-if="isTruncated" class="cursor-pointer text-primary" @click.stop.prevent="toggle">
        {{ seeMoreLabel }}
      </div>
    </div>

    <qas-dialog v-model="show" v-bind="defaultProps" aria-label="Diálogo de texto completo" role="dialog" />
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'

import useScreen from '../../composables/use-screen'

import QasDialog from '../dialog/QasDialog.vue'

// define component name
defineOptions({ name: 'QasTextTruncate' })

// props
const props = defineProps({
  dialogProps: {
    type: Object,
    default: () => ({ persistent: false })
  },

  dialogTitle: {
    type: String,
    default: ''
  },

  maxWidth: {
    type: Number,
    default: 0
  },

  seeMoreLabel: {
    type: String,
    default: 'Ver mais'
  },

  text: {
    type: String,
    default: ''
  }
})

// template refs
const truncate = ref(null)
const parent = ref(null)

// composable
const {
  textContent,
  isTruncated,
  truncateTextClass,

  truncateText
} = useTruncate({ parent, props })

const {
  defaultProps,
  show,
  toggle
} = useDialog({ props, textContent })

useMutationObserver({ truncate, callbackFn: truncateText })

// composable functions
function useDialog ({ props, textContent }) {
  // reactive vars
  const show = ref(false)

  // computed
  const description = computed(() => props.text || textContent.value)

  const defaultProps = computed(() => {
    return {
      cancel: false,
      ok: false,

      ...props.dialogProps,

      card: {
        title: props.dialogTitle,
        description: description.value
      }
    }
  })

  // methods
  function toggle () {
    show.value = !show.value
  }

  return {
    defaultProps,

    show,

    toggle
  }
}

function useMutationObserver ({ truncate, callbackFn = () => {} }) {
  // reactive vars
  const observer = ref(null)

  // lifecycle
  onMounted(() => observeContentChange())
  onUnmounted(() => observer.value.disconnect())

  // methods
  function observeContentChange () {
    const config = { childList: true, subtree: true, characterData: true }

    const callback = mutationList => mutationList.forEach(() => callbackFn())

    observer.value = new MutationObserver(callback)

    observer.value.observe(truncate.value, config)
  }
}

function useTruncate ({ parent, props }) {
  // global
  const screen = useScreen()

  // reactive vars
  const maxPossibleWidth = ref('')
  const textContent = ref('')
  const textWidth = ref('')

  // lifecycle
  onMounted(() => truncateText())

  // watch
  watch(() => props.maxWidth, truncateText)

  // computed
  const isTruncated = computed(() => textWidth.value > maxPossibleWidth.value)

  const truncateTextClass = computed(() => {
    return (isTruncated.value || screen.isSmall) && 'ellipsis q-pr-sm'
  })

  // methods
  function truncateText () {
    parent.value.style.maxWidth = '100%'
    textWidth.value = truncate.value.clientWidth
    textContent.value = truncate.value?.innerHTML

    maxPossibleWidth.value = props.maxWidth || truncate.value.parentElement.clientWidth * 0.90

    parent.value.style.maxWidth = `${maxPossibleWidth.value}px`
  }

  return {
    maxPossibleWidth,
    textContent,
    textWidth,

    isTruncated,
    truncateTextClass,

    truncateText
  }
}
</script>
