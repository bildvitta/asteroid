<template>
  <qas-box v-bind="$attrs">
    <q-input v-model="search" v-bind="attributes">
      <template #append>
        <q-icon color="primary" name="o_search" />
      </template>
    </q-input>

    <div :class="contentClasses" :style="contentStyle">
      <slot v-if="hasFilteredOptions" :height="contentHeight" :results="filteredOptions" />

      <slot v-if="isLoading" name="loading">
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
import lazyLoadingFilterMixin from '../../mixins/lazy-loading-filter'

export default {
  components: {
    QasBox
  },

  mixins: [lazyLoadingFilterMixin],

  props: {
    emptyListHeight: {
      default: '100px',
      type: String
    },

    emptyResultText: {
      default: 'Não há resultados disponíveis.',
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
    },

    virtualScroll: {
      default: () => ({}),
      type: Object
    }
  },

  data () {
    return {
      fuse: null
    }
  },

  computed: {
    contentClasses () {
      return [
        { 'overflow-auto': !this.useLazyLoading },
        'q-mt-xs',
        'relative-position',
        this.virtualScrollClassName
      ]
    },

    contentStyle () {
      return { height: this.contentHeight }
    },

    contentHeight () {
      return this.hasFilteredOptions ? this.height : this.showEmptyResult ? this.emptyListHeight : 'auto'
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

    showEmptyResult () {
      return !this.hasFilteredOptions && !this.hideEmptySlot && !this.isLoading
    },

    isDisable () {
      return (!this.useLazyLoading && !this.list.length) || this.isLoading
    },

    attributes () {
      return {
        clearable: true,
        disable: this.isDisable,
        debounce: this.useLazyLoading ? 500 : 0,
        outlined: true,
        placeholder: this.placeholder,
        error: this.hasFetchError
      }
    }
  },

  watch: {
    defaultFuseOptions (value) {
      this.fuse.options = { ...this.fuse.options, ...value }
    },

    hasFilteredOptions (value) {
      !value && this.$emit('emptyResult')
    },

    list (value) {
      if (!this.useLazyLoading) {
        this.fuse.list = value
        this.filterOptionsByFuse(this.search)
      }
    },

    search: {
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

  created () {
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
