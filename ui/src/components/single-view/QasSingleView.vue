<template>
  <component :is="mx_componentTag" :class="mx_componentClass">
    <header v-if="mx_hasHeaderSlot">
      <slot name="header" />
    </header>

    <template v-if="hasResult">
      <slot />
    </template>

    <div v-else-if="!mx_isFetching" class="q-my-xl text-center">
      <q-icon class="q-mb-sm text-center" color="grey-7" name="o_search" size="38px" />
      <div class="text-grey-7">Nenhum item encontrado.</div>
    </div>

    <footer v-if="mx_hasFooterSlot">
      <slot name="footer" />
    </footer>

    <q-inner-loading :showing="mx_isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import viewMixin from '../../mixins/view'
import { markRaw } from 'vue'
import { logger } from '../../helpers'

export default {
  name: 'QasSingleView',

  mixins: [viewMixin],

  props: {
    customId: {
      default: '',
      type: [Number, String]
    },

    result: {
      default: () => ({}),
      type: Object
    }
  },

  emits: [
    'update:result',
    'fetch-success',
    'fetch-error'
  ],

  computed: {
    hasResult () {
      return !!this.resultModel
    },

    id () {
      return this.customId || this.$route.params.id
    },

    resultModel () {
      return this.$store.getters[`${this.entity}/byId`](this.id) || {}
    }
  },

  watch: {
    $route (to, from) {
      to.name === from.name && this.fetchSingle()
    },

    resultModel (value) {
      this.$emit('update:result', markRaw({ ...value }))
    }
  },

  created () {
    this.fetchSingle()
  },

  methods: {
    async fetchSingle (params = {}) {
      this.mx_isFetching = true

      logger(log => log.info('fetchSuccess - chamado'))

      try {
        const response = await this.$store.dispatch(
          `${this.entity}/fetchSingle`,
          { id: this.id, url: this.url, params }
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

        logger(log => {
          log
            .info('fetchSuccess - sucesso')
            .group('fetchSuccess - resposta da API')
            .table(response)
            .end()
            // errors, fields e metadata
            .group('fetchSuccess - mx_errors, mx_fields e mx_metadata')
            .table({
              mx_errors: this.mx_errors,
              mx_fields: this.mx_fields,
              mx_metadata: this.mx_metadata
            })
            .end()
        })

        this.$emit('fetch-success', response)
      } catch (error) {
        logger(log => {
          log.group('fetchSuccess - deu ruim', true).info(error).end()
        })
        this.mx_fetchError(error)
        this.$emit('fetch-error', error)
      } finally {
        this.mx_isFetching = false
        logger(log => log.info('fetchSuccess - finalizado'))
      }
    }
  }
}
</script>
