<template>
  <component :is="mx_componentTag">
    <header v-if="mx_hasHeaderSlot">
      <slot :errors="mx_errors" :fields="mx_fields" :metadata="mx_metadata" name="header" :result="result" />
    </header>

    <template v-if="hasResult">
      <slot :errors="mx_errors" :fields="mx_fields" :metadata="mx_metadata" :result="result" />
    </template>

    <div v-else-if="!mx_isFetching" class="q-my-xl text-center">
      <q-icon class="q-mb-sm text-center" color="grey-6" name="o_search" size="38px" />
      <div class="text-grey-6">Nenhum item encontrado.</div>
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

export default {
  name: 'QasSingleView',

  mixins: [viewMixin],

  props: {
    customId: {
      default: '',
      type: [Number, String]
    },

    modelValue: {
      default: () => ({}),
      type: Object
    }
  },

  emits: [
    'update:modelValue',
    'fetch-success',
    'fetch-error'
  ],

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
      this.$emit('update:modelValue', value)
    }
  },

  created () {
    this.fetchSingle()
  },

  methods: {
    async fetchSingle () {
      this.mx_isFetching = true

      try {
        const response = await this.$store.dispatch(`${this.entity}/fetchSingle`, { id: this.id, url: this.url })
        const { errors, fields, metadata } = response.data

        this.mx_setErrors(errors)
        this.mx_setFields(fields)
        this.mx_setMetadata(metadata)

        this.mx_updateModels({
          errorsModel: errors,
          fieldsModel: this.mx_fields,
          metadataModel: metadata
        })

        this.$emit('fetch-success', response)
      } catch (error) {
        this.mx_fetchError(error)
        this.$emit('fetch-error', error)
      } finally {
        this.mx_isFetching = false
      }
    }
  }
}
</script>
