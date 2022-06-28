<template>
  <qas-box>
    <qas-input v-model="search" clearable :disable="!list.length" hide-bottom-space :placeholder="placeholder">
      <template #append>
        <q-icon color="primary" name="o_search" />
      </template>
    </qas-input>

    <div class="overflow-auto q-mt-xs relative-position" :style="contentStyle">
      <slot v-if="hasResults" />

      <slot v-else-if="useEmptySlot" name="empty-result">
        <div class="absolute-center text-center">
          <q-icon class="q-mb-sm text-center" color="primary" name="o_search" size="38px" />
          <div>Não há resultados disponíveis.</div>
        </div>
      </slot>
    </div>
  </qas-box>
</template>

<script>
import Fuse from 'fuse.js'

import QasBox from '../box/QasBox.vue'

export default {
  name: 'QasSearchBox',

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

    list: {
      default: () => [],
      type: Array
    },

    modelValue: {
      default: '',
      type: String
    },

    placeholder: {
      default: 'Pesquisar',
      type: String
    },

    useEmptySlot: {
      default: true,
      type: Boolean
    },

    results: {
      type: Array,
      default: () => []
    }
  },

  emits: [
    'empty-result',
    'update:modelValue',
    'update:results'
  ],

  data () {
    return {
      fuse: null,
      searchResults: this.list,
      search: ''
    }
  },

  computed: {
    contentStyle () {
      return { height: this.list.length ? this.height : this.emptyListHeight }
    },

    defaultFuseOptions () {
      return {
        threshold: 0.1,
        ignoreLocation: true,

        ...this.fuseOptions
      }
    },

    hasResults () {
      return !!this.searchResults.length
    }
  },

  watch: {
    defaultFuseOptions (value) {
      this.fuse.options = { ...this.fuse.options, ...value }
    },

    hasResults (value) {
      !value && this.$emit('empty-result')
    },

    list: {
      handler (value) {
        this.fuse = new Fuse(value, this.defaultFuseOptions)

        this.setResults(this.search)
        this.updateResultsModel(value)
      },

      deep: true
    },

    search: {
      handler (value) {
        this.setResults(value)
        this.$emit('update:modelValue', value)
      },

      immediate: true
    },

    searchResults: {
      handler (value) {
        this.updateResultsModel(value)
      },
      immediate: true
    }
  },

  created () {
    this.search = this.modelValue
    this.fuse = new Fuse(this.list, this.defaultFuseOptions)
    this.setResults()
  },

  methods: {
    setResults (value) {
      this.searchResults = value
        ? this.fuse.search(value)
        : this.list
    },

    updateResultsModel (value) {
      this.$emit('update:results', value.map(result => result.item || result))
    }
  }
}
</script>
