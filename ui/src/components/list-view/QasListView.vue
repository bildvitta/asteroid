<template>
  <div :class="mx_componentClass">
    <q-pull-to-refresh :disable="!useRefresh" @refresh="refresh">
      <header v-if="hasHeaderSlot">
        <slot name="header" />
      </header>

      <slot v-if="useFilter" name="filter">
        <qas-filters v-bind="filtersProps" :entity="entity" />
      </slot>

      <main class="relative-position">
        <div v-if="showResults">
          <slot />

          <q-inner-loading :showing="mx_isFetching">
            <q-spinner color="grey" size="3em" />
          </q-inner-loading>
        </div>

        <div v-else-if="!mx_isFetching">
          <slot v-if="mx_canShowFetchErrorSlot" name="fetch-error" />

          <slot v-else name="empty-results">
            <qas-empty-result-text />
          </slot>
        </div>

        <div v-else class="q-py-lg text-center">
          <q-spinner color="grey" size="3em" />
        </div>

        <div v-if="hasPages" class="flex items-center q-mt-md" :class="paginationClasses">
          <qas-pagination v-model="page" :max="totalPages" @click="changePage" />
        </div>
      </main>
    </q-pull-to-refresh>

    <slot name="footer" />
  </div>
</template>

<script>
import QasFilters from '../filters/QasFilters.vue'
import QasPagination from '../pagination/QasPagination.vue'

import { viewMixin, contextMixin } from '../../mixins'

import debug from 'debug'
import { extend } from 'quasar'
import { getState, getAction } from '@bildvitta/store-adapter'
import { computed } from 'vue'

const log = debug('asteroid-ui:qas-list-view')

export default {
  components: {
    QasFilters,
    QasPagination
  },

  mixins: [contextMixin, viewMixin],

  provide () {
    return {
      isFetchListSucceeded: computed(() => this.isFetchListSucceeded),
      isListView: true
    }
  },

  props: {
    filtersProps: {
      default: () => ({}),
      type: Object
    },

    results: {
      default: () => [],
      type: Array
    },

    useAutoHandleOnDelete: {
      type: Boolean
    },

    useAutoRefetchOnDelete: {
      type: Boolean
    },

    useFilter: {
      default: true,
      type: Boolean
    },

    usePagination: {
      default: true,
      type: Boolean
    },

    useRefresh: {
      default: true,
      type: Boolean
    },

    useResultsAreaOnly: {
      type: Boolean
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
      page: 1,
      resultsQuantity: 0,
      isFetchListSucceeded: false
    }
  },

  computed: {
    hasDeleteEventListener () {
      return this.useAutoHandleOnDelete || this.useAutoRefetchOnDelete
    },

    hasHeaderSlot () {
      return !!this.$slots.header
    },

    hasPages () {
      return this.totalPages > 1 && this.usePagination
    },

    hasResults () {
      return !!(this.resultsModel || []).length
    },

    resultsModel () {
      return getState.call(this, { entity: this.entity, key: 'list' })
    },

    totalPages () {
      return getState.call(this, { entity: this.entity, key: 'totalPages' })
    },

    showResults () {
      return this.hasResults || this.useResultsAreaOnly
    },

    paginationClasses () {
      return this.$qas.screen.isSmall ? 'justify-center column' : 'justify-end'
    }
  },

  watch: {
    $route (to, from) {
      if (to.name === from.name) {
        this.mx_fetchHandler({ ...this.mx_context, url: this.url }, this.fetchList)
        this.setCurrentPage()
      }
    },

    resultsModel: {
      handler (value) {
        this.$emit('update:results', extend([], true, value))
      },
      deep: true,
      immediate: true
    }
  },

  created () {
    this.mx_fetchHandler({ ...this.mx_context, url: this.url }, this.fetchList)

    this.setCurrentPage()
  },

  mounted () {
    if (!this.hasDeleteEventListener) return

    window.addEventListener('delete-success', this.onDeleteResult)
  },

  unmounted () {
    if (!this.hasDeleteEventListener) return

    window.removeEventListener('delete-success', this.onDeleteResult)
  },

  methods: {
    changePage () {
      const query = { ...this.$route.query, page: this.page }
      this.$router.push({ query })
    },

    async fetchList (externalPayload = {}) {
      this.mx_isFetching = true
      this.isFetchListSucceeded = false

      try {
        const payload = {
          ...this.mx_context,
          url: this.url,
          ...externalPayload
        }

        const response = await getAction.call(this, {
          entity: this.entity,
          key: 'fetchList',
          payload
        })

        const { errors, fields, metadata, results } = response.data
        this.resultsQuantity = results.length

        this.mx_setErrors(errors)
        this.mx_setFields(fields)
        this.mx_setMetadata(metadata)

        this.mx_updateModels({
          errors: this.mx_errors,
          fields: this.mx_fields,
          metadata: this.mx_metadata
        })

        this.isFetchListSucceeded = true

        this.$emit('fetch-success', response)

        log(`[${this.entity}]:fetchList:success`, response)
      } catch (error) {
        this.mx_fetchError(error)
        this.$emit('update:errors', error)
        this.$emit('fetch-error', error)

        log(`[${this.entity}]:fetchList:error`, error)
      } finally {
        this.mx_isFetching = false
      }
    },

    async refresh (done) {
      await this.mx_fetchHandler({ ...this.mx_context, url: this.url }, this.fetchList)

      if (typeof done === 'function') {
        done()
      }
    },

    setCurrentPage () {
      this.page = parseInt(this.$route.query.page || 1)
    },

    onAutoHandleDelete ({ detail: { entity } }) {
      const { page } = this.mx_context

      /*
      * - se a entidade que estiver sendo excluída for diferente da entidade da listagem, ignora.
      * - se a ultima pagina da paginação for igual a pagina atual e tiver mais de um resultado, ignora.
      * - se não existir paginação (somente 1), ignora.
      */
      const skipRefreshList = [
        (entity !== this.entity),
        (this.totalPages === page && this.resultsQuantity > 1),
        (this.totalPages === 1)
      ]

      this.resultsQuantity -= 1

      if (skipRefreshList.find(Boolean)) return

      /*
      * caso eu remova o ultimo item da ultima pagina eu volto ele para a pagina anterior
      * ex: estou na pagina 3 que é a ultima pagina, e removo o ultimo item dela, eu volto o usuário para pagina 2
      */
      if (this.resultsQuantity === 1 || !this.resultsQuantity) {
        const { path, query } = this.$route

        this.$router.replace({ path, query: { ...query, page: query.page - 1 } })
        return
      }

      /*
      * caso remova algo de uma pagina que não seja a ultima, chama o método fetchList novamente
      * ex: estou na pagina 2 e existem 3 paginas, removo um item da pagina 2, então chamo o método fetchList
      */
      this.mx_fetchHandler({ ...this.mx_context, url: this.url }, this.fetchList)
    },

    onDeleteResult (event) {
      if (this.useAutoRefetchOnDelete) {
        this.mx_fetchHandler({ ...this.mx_context, url: this.url }, this.fetchList)
        return
      }

      this.onAutoHandleDelete(event)
    }
  }
}
</script>
