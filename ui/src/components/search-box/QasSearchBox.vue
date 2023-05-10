<template>
  <div>
    <qas-search-input v-bind="attributes" v-model="mx_search" />

    <div ref="scrollContainer" class="overflow-auto q-mt-md relative-position" :style="containerStyle">
      <component :is="component.is" v-bind="component.props" class="q-mr-sm">
        <slot v-if="mx_hasFilteredOptions" />
      </component>

      <slot v-if="showSpinnerDots" name="loading">
        <div class="flex justify-center q-pb-sm">
          <q-spinner-dots color="primary" size="20px" />
        </div>
      </slot>

      <slot v-if="showEmptyResult" name="empty-result">
        <div class="q-mt-sm text-body1 text-grey-8">
          <div>{{ emptyResultText }}</div>
        </div>
      </slot>

      <q-inner-loading :showing="showInnerLoading">
        <q-spinner color="grey" size="3em" />
      </q-inner-loading>
    </div>
  </div>
</template>

<script>
import { QInfiniteScroll } from 'quasar'
import Fuse from 'fuse.js'

import QasBox from '../box/QasBox.vue'
import { searchFilterMixin } from '../../mixins'

export default {
  name: 'QasSearchBox',

  components: {
    QasBox,
    QInfiniteScroll
  },

  mixins: [searchFilterMixin],

  props: {
    emptyListHeight: {
      default: '100px',
      type: String
    },

    emptyResultText: {
      default: 'Não há itens para serem exibidos.',
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
      fuse: null
    }
  },

  computed: {
    attributes () {
      return {
        ref: 'search',
        disable: this.isDisabled,
        useDebounce: this.useLazyLoading,
        placeholder: this.placeholder,
        error: this.mx_hasFetchError,
        loading: this.mx_isFetching
      }
    },

    containerStyle () {
      return { height: this.containerHeight }
    },

    hasNoOptionsOnFirstFetch () {
      return this.mx_fetchCount === 1 && !this.mx_hasFilteredOptions
    },

    containerHeight () {
      const hasEmptyList = (!this.list.length && !this.useLazyLoading) || this.hasNoOptionsOnFirstFetch

      return hasEmptyList ? this.emptyListHeight : this.height
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
          ...(this.useLazyLoading && infiniteScrollProps),
          ...(this.useLazyLoading && { onLoad: this.onInfiniteScroll })
        }
      }
    },

    defaultFuseOptions () {
      return {
        ignoreLocation: true,

        ...this.fuseOptions
      }
    },

    isDisabled () {
      return (!this.useLazyLoading && !this.list.length) || this.hasNoOptionsOnFirstFetch
    },

    showEmptyResult () {
      return this.useEmptySlot && !this.mx_hasFilteredOptions && !this.mx_isFetching
    },

    showSpinnerDots () {
      return this.mx_hasFilteredOptions && this.mx_isFetching
    },

    showInnerLoading () {
      return !this.mx_hasFilteredOptions && this.mx_isFetching
    }
  },

  watch: {
    defaultFuseOptions (value) {
      if (this.useLazyLoading) return

      this.fuse.options = { ...this.fuse.options, ...value }
    },

    mx_hasFilteredOptions (value) {
      !value && this.$emit('empty-result')
    },

    mx_search: {
      async handler (value) {
        this.$emit('update:modelValue', value)

        if (this.useLazyLoading) {
          await this.mx_filterOptionsByStore(value)

          this.$refs.infiniteScrollRef.resume()
          this.$refs.search.input.focus()

          return
        }

        this.filterOptionsByFuse(value)
      }
    },

    modelValue: {
      handler (value) {
        this.mx_search = value
      },

      immediate: true
    },

    mx_filteredOptions: {
      handler (options) {
        this.$emit('update:results', options)
      },

      immediate: true
    }
  },

  created () {
    this.setSearchMethod()
  },

  methods: {
    filterOptionsByFuse (value) {
      this.mx_filteredOptions = value ? this.mx_getNormalizedFuseResults(this.fuse.search(value)) : this.list
    },

    async onInfiniteScroll (_, done) {
      // Se tiver erro no primeiro fetch, retorna o "done" na proxima.
      if (((this.mx_hasFetchError && !this.mx_hasFilteredOptions) || this.hasNoOptionsOnFirstFetch)) return done()

      const canMakeFirstFetch = this.mx_fetchCount === 0 && this.mx_hasFilteredOptions

      if ((!this.mx_hasFilteredOptions || canMakeFirstFetch) && !this.mx_search) {
        await this.mx_setFetchOptions()
        return done()
      }

      if (this.mx_canFetchOptions()) {
        await this.mx_loadMoreOptions()
        return done()
      }

      done(true)
    },

    setListWatcher () {
      this.$watch('list', value => {
        this.fuse = new Fuse(value, this.defaultFuseOptions)

        this.filterOptionsByFuse(this.mx_search)
      }, { deep: true })
    },

    setSearchMethod () {
      this.useLazyLoading ? this.setLazyLoading() : this.setFuse()
    },

    setFuse () {
      const list = [...this.list]

      this.mx_filteredOptions = list
      this.fuse = new Fuse(list, this.defaultFuseOptions)

      this.setListWatcher()
    },

    setLazyLoading () {
      this.mx_setCachedOptions('list')
    }
  }
}
</script>
