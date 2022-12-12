<template>
  <component :is="mx_componentTag" :class="mx_componentClass">
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
        </div>

        <div v-else-if="!mx_isFetching">
          <slot name="empty-results">
            <div class="q-my-xl text-center">
              <q-icon class="q-mb-sm text-center" color="grey-7" name="o_search" size="38px" />
              <div class="text-grey-7">Nenhum item encontrado.</div>
            </div>
          </slot>
        </div>

        <div v-else class="q-py-lg text-center">
          <q-spinner color="grey" size="3em" />
        </div>

        <div v-if="hasPages" class="flex items-center q-mt-sm" :class="paginationClasses">
          <div class="text-body1 text-grey-7">
            Itens por página: {{ results.length }}
          </div>

          <qas-pagination v-model="page" :max="totalPages" @click="changePage" />
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
import QasPagination from '../pagination/QasPagination.vue'
import { extend } from 'quasar'
import { getState, getAction } from '@bildvitta/store-adapter'

export default {
  components: {
    QasFilters,
    QasPagination
  },

  mixins: [contextMixin, viewMixin],

  props: {
    filtersProps: {
      default: () => ({}),
      type: Object
    },

    results: {
      default: () => [],
      type: Array
    },

    useRefresh: {
      default: true,
      type: Boolean
    },

    useFilter: {
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
      return getState.call(this, { entity: this.entity, key: 'list' })
    },

    totalPages () {
      return getState.call(this, { entity: this.entity, key: 'totalPages' })
    },

    showResults () {
      return this.hasResults || this.useResultsAreaOnly
    },

    paginationClasses () {
      return this.$qas.screen.isSmall ? 'justify-center column' : 'justify-between'
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

  methods: {
    changePage () {
      const query = { ...this.$route.query, page: this.page }
      this.$router.push({ query })
    },

    async fetchList (externalPayload = {}) {
      this.mx_isFetching = true

      try {
        const payload = {
          ...this.mx_context,
          url: this.url,
          ...externalPayload
        }

        this.$qas.logger.group(
          `QasListView - fetchList -> Payload do parâmetro do ${this.entity}/fetchList`, [payload]
        )

        const response = await getAction.call(this, {
          entity: this.entity,
          key: 'fetchList',
          payload
        })

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

        this.$qas.logger.group(
          `QasListView - fetchList -> resposta da action ${this.entity}/fetchList`, [response]
        )
      } catch (error) {
        this.mx_fetchError(error)
        this.$emit('update:errors', error)
        this.$emit('fetch-error', error)

        this.$qas.logger.group(
          `QasListView - fetchSingle -> exceção da action ${this.entity}/fetchList`,
          [error],
          { error: true }
        )
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
    }
  }
}
</script>
