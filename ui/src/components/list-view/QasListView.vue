<template>
  <component :is="mx_componentTag">
    <q-pull-to-refresh :disable="disableRefresh" @refresh="refresh">
      <header v-if="hasHeaderSlot">
        <slot :fields="mx_fields" :metadata="mx_metadata" name="header" :results="results" />
      </header>

      <slot v-if="useFilter" :entity="entity" :errors="mx_errors" :fields="mx_fields" :metadata="mx_metadata" name="filter" :results="results">
        <qas-filters v-bind="filtersProps" :entity="entity" />
      </slot>

      <main class="relative-position">
        <div v-if="hasResults">
          <slot :fields="mx_fields" :metadata="mx_metadata" :results="results" />
        </div>

        <div v-else-if="!mx_isFetching">
          <slot :fields="mx_fields" :metadata="mx_metadata" name="empty-results">
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

        <q-inner-loading :showing="hasResults && mx_isFetching">
          <q-spinner color="grey" size="3em" />
        </q-inner-loading>
      </main>
    </q-pull-to-refresh>

    <slot name="footer" />
  </component>
</template>

<script>
import { viewMixin, contextMixin } from '../../mixins'
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

    useFilter: {
      default: true,
      type: Boolean
    },

    filtersProps: {
      default: () => ({}),
      type: Object
    }
  },

  emits: ['fetch-success', 'fetch-error'],

  data () {
    return {
      page: 1
    }
  },

  computed: {
    hasHeaderSlot () {
      return !!this.$slots.header
    },

    hasPages () {
      return this.totalPages > 1
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
    $route (to, from) {
      if (to.name === from.name) {
        this.fetchList()
        this.setCurrentPage()
      }
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

    async fetchList () {
      this.mx_isFetching = true

      try {
        const response = await this.$store.dispatch(`${this.entity}/fetchList`, { ...this.mx_context, url: this.url })
        const { errors, fields, metadata } = response.data

        this.mx_setErrors(errors)
        this.mx_setFields(fields)
        this.mx_setMetadata(metadata)

        this.mx_updateModels({
          errors: errors,
          fields: this.mx_fields,
          metadata: metadata
        })

        this.$emit('fetch-success', response)
      } catch (error) {
        this.mx_fetchError(error)
        this.$emit('fetch-error', error)
      } finally {
        this.mx_isFetching = false
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
    }
  }
}
</script>
