<template>
  <component :is="componentTag">
    <header v-if="hasHeaderSlot">
      <slot :errors="errors" :fields="fields" :metadata="metadata" name="header" :result="result" />
    </header>

    <template v-if="hasResult">
      <slot :errors="errors" :fields="fields" :metadata="metadata" :result="result" />
    </template>

    <div v-else-if="!isFetching" class="q-my-xl text-center">
      <q-icon class="q-mb-sm text-center" color="grey-6" name="o_search" size="38px" />
      <div class="text-grey-6">Nenhum item encontrado.</div>
    </div>

    <footer v-if="hasFooterSlot">
      <slot name="footer" />
    </footer>

    <q-inner-loading :showing="isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import viewMixin from '../../mixins/view'

export default {
  mixins: [viewMixin],

  props: {
    customId: {
      default: '',
      type: [Number, String]
    },

    value: {
      default: () => ({}),
      type: Object
    }
  },

  computed: {
    hasResult () {
      return !!this.result
    },

    id () {
      return this.customId || this.$route.params.id
    },

    result () {
      return this.$store.getters[`${this.entity}/byId`](this.id) || {}
    }
  },

  watch: {
    $route () {
      this.fetchSingle()
    },

    result (value) {
      this.$emit('input', value)
    }
  },

  created () {
    this.fetchSingle()
  },

  methods: {
    async fetchSingle (externalPayload = {}) {
      this.isFetching = true

      const payload = { 
        id: this.id,
        url: this.url,
        ...externalPayload
      }

      try {
        const response = await this.$store.dispatch(`${this.entity}/fetchSingle`, payload)
        const { errors, fields, metadata } = response.data

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
    }
  }
}
</script>
