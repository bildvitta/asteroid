<template>
  <div ref="parent" class="full-width">
    <div class="justify-between no-wrap row text-no-wrap">
      <div ref="truncate" :class="truncateTextClass">
        <slot>{{ displayText }}</slot>
      </div>

      <!-- <div v-if="isTruncated" class="cursor-pointer text-primary" @click.stop.prevent="toggle">
        {{ seeMoreLabel }}
      </div> -->

      <qas-btn v-if="hasButton" :label="buttonLabel" @click.stop.prevent="toggle" />
    </div>

    <qas-dialog v-model="show" v-bind="defaultProps" aria-label="Diálogo de texto completo" role="dialog">
      <template v-if="props.useCounterMode" #description>
        <div class="q-col-gutter-y-md row">
          <div
            v-for="(item, index) in normalizedList"
            :key="index"
            class="col-12"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </qas-dialog>
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

  maxTextSize: {
    type: Number,
    default: 1
  },

  seeMoreLabel: {
    type: String,
    default: 'Ver mais'
  },

  text: {
    type: String,
    default: ''
  },

  list: {
    type: Array,
    default: () => []
  },

  useObjectList: {
    type: Boolean,
    default: false
  },

  useCounterMode: {
    type: Boolean
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

const {
  buttonLabel,
  displayText,
  hasButton,
  normalizedList
} = useTemplate({ isTruncated })

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

function useTemplate ({ isTruncated }) {
  const {
    counterLabel,
    normalizedList,
    normalizedCounterText
  } = useCounter()

  const hasButton = computed(() => {
    return props.useCounterMode ? normalizedList.value.length > props.maxTextSize : isTruncated.value
  })

  const displayText = computed(() => {
    return props.useCounterMode ? normalizedCounterText.value : props.text
  })

  const buttonLabel = computed(() => {
    return props.useCounterMode ? counterLabel.value : props.seeMoreLabel
  })

  return {
    displayText,
    hasButton,
    buttonLabel,
    normalizedList
  }
}

function useCounter () {
  const normalizedList = computed(() => {
    return props.useObjectList ? props.list.map(({ label }) => label) : props.list
  })

  const counterText = computed(() => {
    return props.maxTextSize > 1
      ? normalizedList.value.slice(0, props.maxTextSize).join(', ')
      : normalizedList.value[0]
  })

  const normalizedCounterText = computed(() => counterText.value || '-')

  const counter = computed(() => (normalizedList.value.length || 1) - props.maxTextSize)
  const counterLabel = computed(() => `+${counter.value}`)

  return {
    normalizedList,
    normalizedCounterText,
    counterLabel
  }
}
</script>
