<template>
  <div ref="parent" :class="classes">
    <div class="no-wrap row text-no-wrap">
      <div ref="truncate" class="ellipsis">
        <slot>{{ formattedText }}</slot>
      </div>

      <qas-btn v-if="hasButton" class="q-ml-sm" :label="buttonLabel" @click.stop.prevent="toggle" />
    </div>

    <qas-dialog v-model="show" v-bind="defaultProps" aria-label="Diálogo de texto completo" role="dialog">
      <template v-if="isCounterMode" #description>
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

import QasDialog from '../dialog/QasDialog.vue'

// define component name
defineOptions({ name: 'QasTextTruncate' })

// props
const props = defineProps({
  color: {
    type: String,
    default: 'grey-8'
  },

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

  maxVisibleItem: {
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

  typography: {
    type: String,
    default: 'body1'
  },

  list: {
    type: Array,
    default: () => []
  },

  useObjectList: {
    type: Boolean
  },

  emptyText: {
    type: String,
    default: '-'
  }
})

// template refs
const truncate = ref(null)
const parent = ref(null)

// composable
const {
  textContent,
  isTruncated,
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
  isCounterMode,
  normalizedList
} = useTemplate()

useMutationObserver({ truncate, callbackFn: truncateText })

const classes = computed(() => [`text-${props.color}`, `text-${props.typography}`])

const formattedText = computed(() => props.list.length || props.text ? displayText.value : props.emptyText)

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

  // functions
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

  // functions
  function observeContentChange () {
    const config = { childList: true, subtree: true, characterData: true }

    const callback = mutationList => mutationList.forEach(() => callbackFn())

    observer.value = new MutationObserver(callback)

    observer.value.observe(truncate.value, config)
  }
}

function useTruncate ({ parent, props }) {
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

  // functions
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

    truncateText
  }
}

function useTemplate () {
  const {
    counterLabel,
    normalizedList,
    normalizedCounterText
  } = useCounter()

  const isCounterMode = computed(() => !!props.list.length)

  const hasButton = computed(() => {
    return isCounterMode.value ? normalizedList.value.length > props.maxVisibleItem : isTruncated.value
  })

  const displayText = computed(() => {
    return isCounterMode.value ? normalizedCounterText.value : props.text
  })

  const buttonLabel = computed(() => {
    return isCounterMode.value ? counterLabel.value : props.seeMoreLabel
  })

  return {
    buttonLabel,
    displayText,
    hasButton,
    isCounterMode,
    normalizedList
  }
}

function useCounter () {
  const normalizedList = computed(() => {
    return props.useObjectList ? props.list.map(({ label }) => label) : props.list
  })

  const counterText = computed(() => {
    return props.maxVisibleItem > 1
      ? normalizedList.value.slice(0, props.maxVisibleItem).join(', ')
      : normalizedList.value[0]
  })

  const normalizedCounterText = computed(() => counterText.value || '-')

  const counter = computed(() => (normalizedList.value.length || 1) - props.maxVisibleItem)
  const counterLabel = computed(() => `+${counter.value}`)

  return {
    normalizedList,
    normalizedCounterText,
    counterLabel
  }
}
</script>
