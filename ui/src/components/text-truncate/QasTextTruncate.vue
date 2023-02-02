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

<script>
import QasDialog from '../dialog/QasDialog.vue'

export default {
  name: 'QasTextTruncate',

  components: {
    QasDialog
  },

  props: {
    dialogProps: {
      type: Object,
      default: () => ({
        persistent: false
      })
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
  },

  data () {
    return {
      maxPossibleWidth: '',
      showDialog: false,
      textWidth: '',
      textContent: '',
      observer: null
    }
  },

  computed: {
    description () {
      return this.text || this.textContent
    },

    truncateTextClass () {
      return (this.isTruncated || this.$qas.screen.isSmall) && 'ellipsis q-pr-sm'
    },

    isTruncated () {
      return this.textWidth > this.maxPossibleWidth
    },

    headerClass () {
      return this.dialogTitle ? 'justify-between' : 'justify-end'
    },

    defaultDialogProps () {
      return {
        cancel: false,
        ok: false,
        ...this.dialogProps,
        card: {
          title: this.dialogTitle,
          description: this.description
        }
      }
    }
  },

  watch: {
    maxWidth () {
      this.truncateText()
    }
  },

  mounted () {
    this.truncateText()
    this.observeContentChange()
  },

  unmounted () {
    this.observer.disconnect()
  },

  methods: {
    truncateText () {
      this.$refs.parent.style.maxWidth = '100%'
      this.textWidth = this.$refs.truncate.clientWidth
      this.textContent = this.$refs.truncate?.innerHTML

      this.maxPossibleWidth = this.maxWidth || this.$refs.truncate.parentElement.clientWidth * 0.90
      this.$refs.parent.style.maxWidth = `${this.maxPossibleWidth}px`
    },

    toggleDialog () {
      this.showDialog = !this.showDialog
    },

    observeContentChange () {
      const element = this.$refs.truncate
      const config = { childList: true, subtree: true, characterData: true }

      const callback = mutationList => {
        mutationList.forEach(() => this.truncateText())
      }

      this.observer = new MutationObserver(callback)
      this.observer.observe(element, config)
    }
  }
}
</script>
