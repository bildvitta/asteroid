<template>
  <qas-box v-bind="$attrs">
    <q-input v-model="search" clearable :disable="!list.length" outlined :placeholder="placeholder">
      <template #append>
        <q-icon color="primary" name="o_search" />
      </template>
    </q-input>

    <div class="overflow-auto q-mt-xs relative-position" :style="contentStyle">
      <slot v-if="hasResults" :results="results" />

      <slot v-else-if="!hideEmptySlot" name="empty">
        <div class="absolute-center text-center">
          <q-icon class="q-mb-sm text-center" color="primary" name="o_search" size="38px" />
          <div>Não há resultados disponíveis.</div>
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
    emptyListHeight: {
      default: '100px',
      type: String
    },

    fuseOptions: {
      default: () => ({}),
      type: Object
    },

    height: {
      default: '300px',
      type: String
    },

    hideEmptySlot: {
      type: Boolean
    },

    list: {
      default: () => [],
      type: Array
    },

    placeholder: {
      default: 'Pesquisar',
      type: String
    },

    value: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      fuse: null,
      results: this.list,
      search: ''
    }
  },

  computed: {
    contentStyle () {
      return { height: this.list.length ? this.height : this.emptyListHeight }
    },

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
    }
  },

  watch: {
    defaultFuseOptions (value) {
      this.fuse.options = { ...this.fuse.options, ...value }
    },

    hasResults (value) {
      !value && this.$emit('emptyResult')
    },

    list (value) {
      this.fuse.list = value
      this.setResults(this.search)
    },

    search: {
      handler (value) {
        this.setResults(value)
        this.$emit('input', value)
      },

      immediate: true
    }
  },

  created () {
    this.search = this.value
    this.fuse = new Fuse(this.list, this.defaultFuseOptions)
  },

  methods: {
    setResults (value) {
      this.results = value ? this.fuse.search(value) : this.list
    }
  }
}
</script>
