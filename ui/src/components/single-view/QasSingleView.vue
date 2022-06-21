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
    },

    beforeFetch: {
      default: null,
      type: Function
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
    this.mx_fetchHandler({ id: this.id, url: this.url }, this.fetchSingle)
  },

  methods: {
    async fetchSingle (params = {}) {
      this.mx_isFetching = true

      try {
        const payload = { id: this.id, url: this.url, params }

        this.$qas.logger.group(
          `QasSingleView - fetchSingle -> payload do parâmetro do ${this.entity}/fetchSingle`,
          [payload]
        )

        const response = await this.$store.dispatch(`${this.entity}/fetchSingle`, payload)

        const { errors, fields, metadata } = response.data

        this.mx_setErrors(errors)
        this.mx_setFields(fields)
        this.mx_setMetadata(metadata)

        this.mx_updateModels({
          errors: this.mx_errors,
          fields: this.mx_fields,
          metadata: this.mx_metadata
        })

        this.$qas.logger.group(
          `QasSingleView - fetchSingle -> resposta da action ${this.entity}/fetchSingle`, [response]
        )

        this.$emit('fetch-success', response)
      } catch (error) {
        this.mx_fetchError(error)
        this.$emit('fetch-error', error)

        this.$qas.logger.group(
          `QasSingleView - fetchSingle -> exceção da action ${this.entity}/fetchSingle`,
          [error],
          { error: true }
        )
      } finally {
        this.mx_isFetching = false
      }
    }
  }
}
</script>
