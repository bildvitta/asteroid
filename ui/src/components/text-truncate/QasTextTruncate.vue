<template>
  <div ref="parent" class="full-width">
    <div class="justify-between no-wrap row text-no-wrap">
      <div ref="truncate" :class="truncateTextClass">
        <slot>{{ text }}</slot>
      </div>
      <div v-if="hasTruncate" class="cursor-pointer text-primary" @click="toggleDialog">{{ seeMoreLabel }}</div>
    </div>
    <qas-dialog v-model="showDialog" :cancel="false" :ok="false" v-bind="dialog">
      <template #header>
        <div class="row" :class="headerClass">
          <div v-if="dialogTitle" class="text-bold text-subtitle1">{{ dialogTitle }}</div>
          <qas-btn v-close-popup dense flat icon="close" rounded />
        </div>
      </template>
      <template #description>
        <slot>
          <div>{{ text }}</div>
        </slot>
      </template>
    </qas-dialog>
  </div>
</template>

<script>
import screen from '../../mixins/screen'
import QasDialog from '../dialog/QasDialog'
import QasBtn from '../btn/QasBtn'

export default {
  components: {
    QasDialog,
    QasBtn
  },

  mixins: [screen],

  props: {
    dialog: {
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
      return (this.hasTruncate || this.$_isSmall) && 'ellipsis q-pr-sm'
    },

    hasTruncate () {
      return this.textWidth > this.maxPossibleWidth
    },

    headerClass () {
      return this.dialogTitle ? 'justify-between' : 'justify-end'
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
