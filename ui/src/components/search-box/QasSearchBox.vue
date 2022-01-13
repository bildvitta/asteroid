<template>
  <qas-box>
    <q-input v-model="search" clearable :disable="!list.length" outlined :placeholder="placeholder">
      <template #append>
        <q-icon color="primary" name="o_search" />
      </template>
    </q-input>

    <div class="overflow-auto q-mt-xs relative-position" :style="contentStyle">
      <slot v-if="hasResults" :results="normalizedResults" />

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
    }
  },

  emits: ['update:modelValue', 'empty-result'],

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
    },

    normalizedResults () {
      return this.results.map(result => result?.item)
    }
  },

  watch: {
    defaultFuseOptions (value) {
      this.fuse.options = { ...this.fuse.options, ...value }
    },

    hasResults (value) {
      !value && this.$emit('empty-result')
    },

    list (value) {
      this.fuse.list = value
      this.setResults(this.search)
    },

    search: {
      handler (value) {
        this.setResults(value)
        this.$emit('update:modelValue', value)
      },

      immediate: true
    }
  },

  async created () {
    const Fuse = (await import('fuse.js')).default

    this.search = this.modelValue
    this.fuse = new Fuse(this.list, this.defaultFuseOptions)
    this.setResults()
  },

  methods: {
    setResults (value) {
      this.results = value
        ? this.fuse.search(value)
        : this.list.map(listItem => ({ item: listItem }))
    }
  }
}
</script>
