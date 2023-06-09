<template>
  <div ref="parent" class="full-width">
    <div class="justify-between no-wrap row text-no-wrap">
      <div ref="truncate" :class="truncateTextClass">
        <slot>{{ text }}</slot>
      </div>

      <div v-if="isTruncated" class="cursor-pointer text-primary" @click.stop="toggleDialog">
        {{ seeMoreLabel }}
      </div>
    </div>

    <qas-dialog v-model="showDialog" v-bind="defaultDialogProps" aria-label="Diálogo de texto completo" role="dialog" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, inject } from 'vue'

import { useTextTruncateDialog } from './composables/use-text-truncate-dialog.js'

import QasDialog from '../dialog/QasDialog.vue'

defineOptions({ name: 'QasTextTruncate' })

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

// global
const $qas = inject('$qas')

// reactive vars
const maxPossibleWidth = ref('')
const observer = ref(null)
const textContent = ref('')
const textWidth = ref('')

// template refs
const parent = ref(null)
const truncate = ref(null)

// composable
const {
  defaultDialogProps,
  showDialog,
  toggleDialog
} = useTextTruncateDialog({ props, textContent })

// computed
const isTruncated = computed(() => textWidth.value > maxPossibleWidth.value)

const truncateTextClass = computed(() => {
  return (isTruncated.value || $qas.screen.isSmall) && 'ellipsis q-pr-sm'
})

// watch
watch(() => props.maxWidth, truncateText)

// lifecycle
onMounted(() => {
  truncateText()
  observeContentChange()
})

onUnmounted(() => observer.value.disconnect())

// methods
function truncateText () {
  parent.value.style.maxWidth = '100%'
  textWidth.value = truncate.value.clientWidth
  textContent.value = truncate.value?.innerHTML

  maxPossibleWidth.value = props.maxWidth || truncate.value.parentElement.clientWidth * 0.90

  parent.value.style.maxWidth = `${maxPossibleWidth.value}px`
}

function observeContentChange () {
  const config = { childList: true, subtree: true, characterData: true }

  const callback = mutationList => mutationList.forEach(() => truncateText())

  observer.value = new MutationObserver(callback)

  observer.value.observe(truncate.value, config)
}
</script>
