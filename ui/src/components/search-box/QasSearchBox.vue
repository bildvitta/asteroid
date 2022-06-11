<template>
  <qas-box v-bind="$attrs">
    <q-input v-model="filterSearch" v-bind="attributes">
      <template #append>
        <q-icon color="primary" name="o_search" />
      </template>
    </q-input>

    <div :class="contentClasses" :style="contentStyle">
      <slot v-if="hasResults" :results="filteredOptions" :height="contentHeight" />

      <slot v-if="isFiltering" name="after-options">
        <div class="flex justify-center q-pb-sm">
          <q-spinner-dots color="primary" size="20px" />
        </div>
      </slot>

      <slot v-if="showEmptyResult" name="empty">
        <div class="absolute-center text-center">
          <q-icon class="q-mb-sm text-center" color="primary" name="o_search" size="38px" />
          <div>{{ emptyResultText }}</div>
        </div>
      </slot>
    </div>
  </qas-box>
</template>

<script>
import QasBox from '../box/QasBox.vue'
import Fuse from 'fuse.js'
import lazyLoadingMixin from '../../mixins/lazy-loading'

export default {
  components: {
    QasBox
  },

  mixins: [lazyLoadingMixin],

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

    emptyResultText: {
      default: 'Não há resultados disponíveis.',
      type: String
    },

    placeholder: {
      default: 'Pesquisar',
      type: String
    },

    virtualScroll: {
      default: () => ({}),
      type: Object
    },

    value: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      fuse: null,
      filteredOptions: this.list
    }
  },

  computed: {
    contentClasses () {
      return [{ 'overflow-auto': !this.useLazyLoading }, 'q-mt-xs', 'relative-position', this.virtualScrollClassName]
    },

    contentStyle () {
      return { height: this.contentHeight }
    },

    contentHeight () {
      return this.hasResults ? this.height : this.showEmptyResult ? this.emptyListHeight : 'auto'
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
      return !!this.filteredOptions.length
    },

    showEmptyResult () {
      return !this.hasResults && !this.hideEmptySlot && !this.isFiltering
    },

    isDisable () {
      return (!this.useLazyLoading && !this.list.length) || this.isFiltering
    },

    attributes () {
      return {
        clearable: true,
        disable: this.isDisable,
        debounce: this.useLazyLoading ? 500 : 0,
        outlined: true,
        placeholder: this.placeholder,
        loading: this.isFiltering,
        error: this.hasFetchError
      }
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
      if (!this.useLazyLoading) {
        this.fuse.list = value
        this.filterOptionsByFuse(this.filterSearch)
      }
    },

    filterSearch: {
      handler (value) {
        this.useLazyLoading ? this.filterOptionsByStore(value) : this.filterOptionsByFuse(value)
        this.$emit('input', value)
      },

      immediate: true
    },

    virtualScroll (value) {
      this.onVirtualScroll(value)
    }
  },

  async created () {
    this.filterSearch = this.value

    if (!this.useLazyLoading) {
      this.fuse = new Fuse(this.list, this.defaultFuseOptions)
    }
  },

  methods: {
    filterOptionsByFuse (value) {
      this.filteredOptions = value ? this.fuse.search(value) : this.list
    }
  }
}
</script>
