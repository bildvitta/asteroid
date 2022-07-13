<template>
  <qas-box v-bind="$attrs">
    <qas-input v-model="mx_search" v-bind="attributes">
      <template #append>
        <q-icon color="primary" name="o_search" />
      </template>
    </qas-input>

    <div ref="scrollContainer" class="overflow-auto q-mt-xs relative-position" :style="contentStyle">
      <component :is="component.is" v-bind="component.props">
        <slot v-if="mx_hasFilteredOptions" />
      </component>

      <slot v-if="mx_hasFilteredOptions && mx_isLoading" name="loading">
        <div class="flex justify-center q-pb-sm">
          <q-spinner-dots color="primary" size="20px" />
        </div>
      </slot>

      <slot v-if="showEmptyResult" name="empty-result">
        <div class="absolute-center text-center">
          <q-icon class="q-mb-sm text-center" color="primary" name="o_search" size="38px" />
          <div>{{ emptyResultText }}</div>
        </div>
      </slot>

      <q-inner-loading :showing="!mx_hasFilteredOptions && mx_isLoading">
        <q-spinner color="grey" size="3em" />
      </q-inner-loading>
    </div>
  </qas-box>
</template>

<script>
import { QInfiniteScroll } from 'quasar'
import Fuse from 'fuse.js'

import QasBox from '../box/QasBox.vue'
import { lazyLoadingFilterMixin } from '../../mixins'

export default {
  name: 'QasSearchBox',

  components: {
    QasBox,
    QInfiniteScroll
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
        clearable: true,
        disable: this.isDisabled,
        debounce: this.useLazyLoading ? 500 : 0,
        outlined: true,
        placeholder: this.placeholder,
        hideBottomSpace: true,
        error: this.mx_hasFetchError,
        loading: this.mx_isLoading
      }
    },

    contentStyle () {
      return { height: this.contentHeight }
    },

    contentHeight () {
      return this.mx_hasFilteredOptions
        ? this.height
        : this.showEmptyResult ? this.emptyListHeight : this.height
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
        threshold: 0.1,
        ignoreLocation: true,

        ...this.fuseOptions
      }
    },

    isDisabled () {
      return (!this.useLazyLoading && !this.list.length) || this.mx_isLoading
    },

    showEmptyResult () {
      return this.useEmptySlot && !this.mx_hasFilteredOptions && !this.mx_isLoading
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
    if (this.useLazyLoading) return

    this.mx_filteredOptions = this.list
    this.fuse = new Fuse(this.list, this.defaultFuseOptions)

    this.setListWatcher()
  },

  methods: {
    filterOptionsByFuse (value) {
      this.mx_filteredOptions = value ? this.mx_getNormalizedFuseResults(this.fuse.search(value)) : this.list
    },

    async onInfiniteScroll (_, done) {
      // Se tiver erro no primeiro fetch, retorna o "done" na proxima.
      if ((this.mx_hasFetchError && !this.mx_hasFilteredOptions)) return done()

      if (!this.mx_hasFilteredOptions && !this.mx_search) {
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
    }
  }
}
</script>
