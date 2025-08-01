<template>
  <div ref="parent" :class="classes">
    <div class="no-wrap row text-no-wrap">
      <!-- "data-table-hover" habilita o hover no texto dentro do QasTableGenerator -->
      <div ref="truncate" class="ellipsis" data-table-hover>
        <slot>
          <div v-if="hasBadges" class="items-center q-col-gutter-sm row" :class="badgeParentClasses">
            <div v-for="(item, index) in normalizedBadgesList" :key="index">
              <qas-badge v-bind="getBadgeProps(item)" />
            </div>
          </div>

          <div v-else class="ellipsis">
            {{ formattedText }}
          </div>
        </slot>
      </div>

      <qas-btn v-if="hasButton" class="q-ml-xs" :label="buttonLabel" @click.stop.prevent="toggle" />
    </div>

    <qas-dialog v-model="show" v-bind="defaultProps" aria-label="Diálogo de texto completo" max-width="500px" role="dialog" use-full-max-width>
      <template v-if="isCounterMode" #description>
        <component :is="dialogComponent.is" v-bind="dialogComponent.props" v-model:results="searchModel">
          <q-list separator>
            <q-item v-for="(item, index) in dialogComponent.list" :key="index" class="q-px-none">
              <q-item-section>
                <div class="text-body1">
                  {{ item }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </component>
      </template>
    </qas-dialog>
  </div>
</template>

<script setup>
import QasDialog from '../dialog/QasDialog.vue'

import { baseProps } from '../../shared/badge-config'

import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'

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

  emptyText: {
    type: String,
    default: '-'
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

  useBadge: {
    type: Boolean
  },

  useObjectList: {
    type: Boolean
  },

  useWrapBadge: {
    type: Boolean
  }
})

// template refs
const truncate = ref(null)
const parent = ref(null)

// composable
const {
  hasBadges,
  badgeParentClasses,
  normalizedBadgesList,
  getBadgeProps
} = useBadgeHandler()

const {
  textContent,
  isTruncated,
  truncateText
} = useTruncate({ parent, props, hasBadges })

const {
  defaultProps,
  dialogComponent,
  show,
  searchModel,
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

// computeds
const classes = computed(() => [`text-${props.color}`, `text-${props.typography}`])

const formattedText = computed(() => props.list.length || props.text ? displayText.value : props.emptyText)

// composable functions
function useDialog ({ props, textContent }) {
  // reactive vars
  const show = ref(false)
  const searchModel = ref([])

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

  const normalizedSearchModel = computed(() => {
    return props.useObjectList ? searchModel.value.map(({ label }) => label) : searchModel.value
  })

  const dialogComponent = computed(() => {
    const hasSearchBox = normalizedList.value.length > 12

    if (hasSearchBox) {
      return {
        is: 'qas-search-box',
        list: normalizedSearchModel.value,
        props: {
          height: '510px',
          list: props.list,
          ...(props.useObjectList && { fuseOptions: { keys: ['label'] } })
        }
      }
    }

    return {
      is: 'div',
      list: normalizedList.value
    }
  })

  // functions
  function toggle () {
    show.value = !show.value
  }

  return {
    defaultProps,
    dialogComponent,

    show,
    searchModel,

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

function useTruncate ({ parent, props, hasBadges }) {
  // reactive vars
  const maxPossibleWidth = ref('')
  const textContent = ref('')
  const textWidth = ref('')

  // lifecycle
  onMounted(() => truncateText())

  // computed
  const isTruncated = computed(() => textWidth.value > maxPossibleWidth.value)

  // watch
  watch(() => props.maxWidth, truncateText)

  // functions
  async function truncateText () {
    await nextTick()

    // Se tiver badges, então não pode ser feito calculo de width.
    if (hasBadges.value) return

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

function useBadgeHandler () {
  const hasBadges = computed(() => props.useBadge && props.useObjectList && props.list.length)

  const normalizedBadgesList = computed(() => props.list.slice(0, props.maxVisibleItem))
  const badgeParentClasses = computed(() => ({ 'no-wrap': !props.useWrapBadge }))

  function getBadgeProps (item) {
    const itemProps = {}

    /**
     * recupera somente keys que estão em baseProps do QasBadge
     * pra evitar que passe propriedades desnecessárias
     */
    for (const key in item) {
      if (baseProps[key]) {
        itemProps[key] = item[key]
      }
    }

    return itemProps
  }

  return {
    hasBadges,
    badgeParentClasses,
    normalizedBadgesList,
    getBadgeProps
  }
}
</script>
