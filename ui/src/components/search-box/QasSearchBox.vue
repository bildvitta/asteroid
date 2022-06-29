<template>
  <qas-box v-bind="$attrs">
    <q-input v-model="search" v-bind="attributes">
      <template #append>
        <q-icon color="primary" name="o_search" />
      </template>
    </q-input>

    <div ref="scrollContainer" :class="contentClasses" :style="contentStyle">
      <component :is="component.is" v-bind="component.props" v-on="component.listeners">
        <slot v-if="$_hasFilteredOptions" :results="filteredOptions" />
      </component>

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
import { QInfiniteScroll } from 'quasar'
import QasBox from '../box/QasBox.vue'

import Fuse from 'fuse.js'
import lazyLoadingFilterMixin from '../../mixins/lazy-loading-filter'

export default {
  components: {
    QInfiniteScroll,
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
    }
  },

  data () {
    return {
      fuse: null
    }
  },

  computed: {
    contentClasses () {
      return ['overflow-auto', 'q-mt-xs', 'relative-position']
    },

    contentStyle () {
      return { height: this.contentHeight }
    },

    contentHeight () {
      return this.$_hasFilteredOptions ? this.height : this.showEmptyResult ? this.emptyListHeight : 'auto'
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
      return !this.$_hasFilteredOptions && !this.hideEmptySlot && !this.isLoading
    },

    isDisabled () {
      return (!this.useLazyLoading && !this.list.length) || this.isLoading
    },

    attributes () {
      return {
        clearable: true,
        disable: this.isDisabled,
        debounce: this.useLazyLoading ? 500 : 0,
        outlined: true,
        placeholder: this.placeholder,
        error: this.hasFetchError
      }
    },

    component () {
      const infiniteScrollProps = {
        offset: 100,
        scrollTarget: this.$refs.scrollContainer,
        ref: 'infiniteScrollRef'
      }

      return {
        is: this.useLazyLoading ? 'q-infinite-scroll' : 'div',
        props: {
          ...(this.useLazyLoading && infiniteScrollProps)
        },
        listeners: {
          ...(this.useLazyLoading && { load: this.onInfiniteScroll })
        }
      }
    }
  },

  watch: {
    defaultFuseOptions (value) {
      this.fuse.options = { ...this.fuse.options, ...value }
    },

    $_hasFilteredOptions (value) {
      !value && this.$emit('emptyResult')
    },

    list (value) {
      if (!this.useLazyLoading) {
        this.fuse.list = value
        this.filterOptionsByFuse(this.search)
      }
    },

    search: {
      async handler (value) {
        this.$emit('input', value)

        if (this.useLazyLoading) {
          await this.$_filterOptionsByStore(value)

          this.$refs.infiniteScrollRef.resume()

          return
        }

        this.filterOptionsByFuse(value)
      }
    }
  },

  created () {
    this.filteredOptions = this.list
    this.search = this.value

    if (!this.useLazyLoading) {
      this.fuse = new Fuse(this.list, this.defaultFuseOptions)
    }
  },

  methods: {
    filterOptionsByFuse (value) {
      this.filteredOptions = value ? this.fuse.search(value) : this.list
    },

    async onInfiniteScroll (index, done) {
      if (!this.$_hasFilteredOptions && !this.search) {
        await this.$_setFetchOptions()
        return done()
      }

      if (this.$_canFetchOptions()) {
        await this.$_loadMoreOptions()
        return done()
      }

      done(true)
    }
  }
}
</script>
