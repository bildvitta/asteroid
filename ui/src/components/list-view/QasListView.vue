<template>
  <component :is="componentTag">
    <q-pull-to-refresh :disable="disableRefresh" @refresh="refresh">
      <header v-if="hasHeaderSlot">
        <slot :fields="fields" :metadata="metadata" name="header" :results="results" />
      </header>

      <slot v-if="!noFilter" :entity="entity" :errors="errors" :fields="fields" :metadata="metadata" name="filter" :results="results">
        <qas-filters v-bind="filtersProps" :entity="entity" />
      </slot>

      <main class="relative-position">
        <div v-if="hasResults">
          <q-infinite-scroll ref="infiniteScroll" v-if="useInfiniteScroll" v-bind="infiniteScrollProps" @load="onLoad">
            <slot :fields="fields" :metadata="metadata" :results="results" />

            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>

          <slot v-else :fields="fields" :metadata="metadata" :results="results" />
        </div>

        <div v-else-if="!isFetching">
          <slot :fields="fields" :metadata="metadata" name="empty-results">
            <div class="q-my-xl text-center">
              <q-icon class="q-mb-sm text-center" color="grey-6" name="o_search" size="38px" />
              <div class="text-grey-6">Nenhum item encontrado.</div>
            </div>
          </slot>
        </div>

        <div v-else class="q-py-lg text-center">
          <q-spinner color="grey" size="3em" />
        </div>

        <div v-if="hasPages" class="justify-center q-mt-lg">
          <q-pagination v-model="page" boundary-links class="flex-center" direction-links :input="$q.screen.lt.sm" :max="totalPages" :max-pages="6" @click="changePage" />
        </div>

        <q-inner-loading :showing="hasResults && isFetching">
          <q-spinner color="grey" size="3em" />
        </q-inner-loading>
      </main>
    </q-pull-to-refresh>

    <slot name="footer" />
  </component>
</template>

<script>
import contextMixin from '../../mixins/context.js'
import viewMixin from '../../mixins/view.js'

import QasFilters from '../filters/QasFilters.vue'

export default {
  components: {
    QasFilters
  },

  mixins: [contextMixin, viewMixin],

  props: {
    disableRefresh: {
      type: Boolean
    },

    noFilter: {
      default: false,
      type: Boolean
    },

    filtersProps: {
      default: () => ({}),
      type: Object
    },

    useInfiniteScroll: {
      default: false,
      type: Boolean
    },

    infiniteScrollProps: {
      default: () => ({ offset: 20 }),
      type: Object
    }
  },

  data () {
    return {
      page: 1
    }
  },

  computed: {
    context () {
      const { limit, ordering, page, search, ...filters } = this.$route.query
      const pageValue = this.useInfiniteScroll ? this.page : page

      return {
        filters,
        limit,
        ordering,
        page: pageValue ? parseInt(pageValue) : 1,
        search,
        increment: this.useInfiniteScroll
      }
    },

    hasHeaderSlot () {
      return !!(this.$slots.header || this.$scopedSlots.header)
    },

    hasPages () {
      return this.totalPages > 1 && !this.useInfiniteScroll
    },

    hasResults () {
      return !!(this.results || []).length
    },

    results () {
      return this.$store.getters[`${this.entity}/list`]
    },

    totalPages () {
      return this.$store.getters[`${this.entity}/totalPages`]
    }
  },

  watch: {
    $route () {
      this.fetchList()
      this.setCurrentPage()
    }
  },

  created () {
    this.fetchList()
    this.setCurrentPage()
  },

  methods: {
    changePage () {
      const query = { ...this.$route.query, page: this.page }
      this.$router.push({ query })
    },

    async fetchList (filters = {}) {
      this.isFetching = true

      const hasFilters = !!Object.keys(filters).length

      try {
        const payload = {
          ...this.context,
          url: this.url,
          ...(hasFilters && { filters })
        }

        const response = await this.$store.dispatch(`${this.entity}/fetchList`, payload)
        const { errors, fields, metadata, results } = response.data

        if (this.useInfiniteScroll && !results?.length) this.stopInfiniteScroll()

        this.setErrors(errors)
        this.setFields(fields)
        this.setMetadata(metadata)

        this.$emit('fetch-success', response)
      } catch (error) {
        this.fetchError(error)
        this.$emit('fetch-error', error)
      } finally {
        this.isFetching = false
      }
    },

    async refresh (done) {
      await this.fetchList()

      if (typeof done === 'function') {
        done()
      }
    },

    setCurrentPage () {
      this.page = parseInt(this.$route.query.page || 1)
    },

    async onLoad (_, done) {
      if (!this.hasResults || this.isFetching) return done()

      console.log('on load')
      this.page += 1
      await this.fetchList()
      done()
    },

    stopInfiniteScroll () {
      this.$refs.infiniteScroll?.stop()
    }
  }
}
</script>
