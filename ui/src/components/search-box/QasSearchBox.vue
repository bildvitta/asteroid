<template>
  <qas-box v-bind="$attrs">
    <q-input v-model="search" outlined :placeholder="placeholder" clearable>
      <template v-slot:append>
        <q-icon name="o_search" />
      </template>
    </q-input>
    <div class="overflow-auto q-mt-xs relative-position" :style="contentStyle">
      <slot v-if="hasResults" :results="results" />
      <slot v-else-if="!hideEmptySlot" name="empty">
        <div class="absolute-center text-center">
          <q-icon class="text-center q-mb-sm" color="grey-6" name="o_search" size="38px" />
          <div class="text-grey-6">Nenhum resultado encontrado.</div>
        </div>
      </slot>
    </div>
  </qas-box>
</template>

<script>
import QasBox from '../box/QasBox.vue'
import Fuse from 'fuse.js'

export default {
  components: {
    QasBox
  },

  props: {
    placeholder: {
      type: String,
      default: 'Pesquisar'
    },

    list: {
      type: Array,
      default: () => []
    },

    fuseOptions: {
      type: Object,
      default: () => ({})
    },

    height: {
      type: String,
      default: '300px'
    },

    value: {
      type: String,
      default: ''
    },

    hideEmptySlot: {
      type: Boolean
    }
  },

  data () {
    return {
      search: '',
      results: this.list,
      fuse: null
    }
  },

  created () {
    this.search = this.value
    this.fuse = new Fuse(this.list, this.defaultFuseOptions)
  },

  watch: {
    search: {
      handler (value) {
        this.setResults(value)
        this.$emit('input', value)
      },

      immediate: true
    },

    defaultFuseOptions (value) {
      this.fuse.options = { ...this.fuse.options, ...value }
    },

    list (value) {
      this.fuse.list = value
      this.setResults(this.search)
    },

    hasResults (value) {
      !value && this.$emit('empty-result')
    }
  },

  computed: {
    defaultFuseOptions () {
      return {
        distance: 100,
        location: 0,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.1,
        tokenize: true,
        ...this.fuseOptions
      }
    },

    hasResults () {
      return !!this.results.length
    },

    contentStyle () {
      return { height: this.height }
    }
  },

  methods: {
    setResults (value) {
      this.results = value ? this.fuse.search(value) : this.list
    }
  }
}
</script>
