<template>
  <component :is="mx_componentTag" :class="mx_componentClass">
    <q-pull-to-refresh :disable="disableRefresh" @refresh="refresh">
      <header v-if="hasHeaderSlot">
        <slot name="header" />
      </header>

      <slot v-if="useFilter" name="filter">
        <qas-filters v-bind="filtersProps" :entity="entity" />
      </slot>

      <main class="relative-position">
        <div v-if="hasResults">
          <slot />
        </div>

        <div v-else-if="!mx_isFetching">
          <slot name="empty-results">
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
import { extend } from 'quasar'

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
    },

    results: {
      default: () => [],
      type: Array
    }
  },

  emits: [
    'fetch-success',
    'fetch-error',
    'update:errors',
    'update:results'
  ],

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
      return !!(this.resultsModel || []).length
    },

    resultsModel () {
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
    },

    resultsModel: {
      handler (value) {
        this.$emit('update:results', extend([], true, value))
      },
      immediate: true
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
      this.mx_isFetching = true

      try {
        const response = await this.$store.dispatch(
          `${this.entity}/fetchList`,
          { ...this.mx_context, url: this.url, filters }
        )

        const { errors, fields, metadata } = response.data

        this.mx_setErrors(errors)
        this.mx_setFields(fields)
        this.mx_setMetadata(metadata)

        this.mx_updateModels({
          errors: this.mx_errors,
          fields: this.mx_fields,
          metadata: this.mx_metadata
        })

        this.$emit('fetch-success', response)
      } catch (error) {
        this.mx_fetchError(error)
        this.$emit('update:errors', error)
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
