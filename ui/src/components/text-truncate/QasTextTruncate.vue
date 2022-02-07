<template>
  <div ref="parent" class="full-width">
    <div class="justify-between no-wrap row text-no-wrap">
      <div ref="truncate" :class="truncateTextClass">
        <slot>{{ text }}</slot>
      </div>
      <div v-if="isTruncated" class="cursor-pointer text-primary" @click="toggleDialog">{{ seeMoreLabel }}</div>
    </div>
    <qas-dialog v-model="showDialog" v-bind="defaultDialogProps">
      <template #description>
        <slot>
          <div>{{ text }}</div>
        </slot>
      </template>
    </qas-dialog>
  </div>
</template>

<script>
import screenMixin from '../../mixins/screen'
import QasDialog from '../dialog/QasDialog'

export default {
  name: 'QasTextTruncate',

  components: {
    QasDialog
  },

  mixins: [screenMixin],

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
      textWidth: ''
    }
  },

  computed: {
    truncateTextClass () {
      return (this.isTruncated || this.$_isSmall) && 'ellipsis q-pr-sm'
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
        useCloseIcon: true,
        ...this.dialogProps,
        card: {
          title: this.dialogTitle,
          description: this.text
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
  },

  methods: {
    truncateText () {
      this.$refs.parent.style.maxWidth = '100%'
      this.textWidth = this.$refs.truncate.clientWidth
      this.maxPossibleWidth = this.maxWidth || this.$refs.truncate.parentElement.clientWidth * 0.90
      this.$refs.parent.style.maxWidth = `${this.maxPossibleWidth}px`
    },

    toggleDialog () {
      this.showDialog = !this.showDialog
    }
  }
}
</script>
