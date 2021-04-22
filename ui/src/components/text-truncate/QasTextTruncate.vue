<template>
  <div ref="parent" class="full-width">
    <div class="justify-between no-wrap row text-no-wrap">
      <div ref="truncate" :class="truncateText">{{ text }}</div>
      <div v-if="hasTruncate" class="cursor-pointer text-primary" @click="toggleDialog">Ver mais</div>
    </div>
    <qas-dialog v-model="showDialog" :cancel="false" :ok="false" v-bind="dialog">
      <template #header>
        <div class="justify-between row">
          <div class="text-bold text-subtitle1">{{ dialogTitle }}</div>
          <qas-btn v-close-popup dense flat icon="close" rounded />
        </div>
      </template>
      <template #description>
        <div>{{ text }}</div>
      </template>
    </qas-dialog>
  </div>
</template>

<script>
import screen from '../../mixins/screen'
import QasDialog from '../dialog/QasDialog.vue'
import QasBtn from '../btn/QasBtn.vue'

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

    text: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      textWidth: '',
      maxPossibleWidth: '',
      showDialog: false
    }
  },

  computed: {
    truncateText () {
      return (this.hasTruncate || this.$_isSmall) && 'ellipsis q-pr-sm'
    },

    hasTruncate () {
      return this.textWidth > this.maxPossibleWidth
    }
  },

  watch: {
    maxWidth () {
      this.getElementsWidth()
    }
  },

  mounted () {
    this.getElementsWidth()
  },

  methods: {
    getElementsWidth () {
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
