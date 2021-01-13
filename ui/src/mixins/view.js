import { camelize } from 'humps'
import { get } from 'lodash'

export default {
  props: {
    dialog: {
      type: Boolean
    },

    entity: {
      required: true,
      type: String
    },

    url: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      errors: {},
      fields: {},
      metadata: {},

      isFetching: false
    }
  },

  computed: {
    componentTag () {
      return this.dialog ? 'div' : 'q-page'
    },

    hasHeaderSlot () {
      return !!(this.$slots.header || this.$scopedSlots.header)
    },

    hasFooterSlot () {
      return !!(this.$slots.footer || this.$scopedSlots.footer)
    }
  },

  methods: {
    fetchError (error) {
      const { response } = error
      const exception = get(response, 'data.exception') || error.message

      this.$qs.error('Ops! Erro ao obter os dados.', exception)

      const status = get(response, 'status')
      const redirect = ({ 403: 'Forbidden', 404: 'NotFound' })[status]

      if (redirect) {
        this.$router.replace({ name: redirect })
      }
    },

    setErrors (errors = {}) {
      this.errors = errors
    },

    setFields (fields = {}) {
      for (const field in fields) {
        fields[field].name = camelize(fields[field].name)
      }

      this.fields = fields
    },

    setMetadata (metadata = {}) {
      this.metadata = metadata
    }
  }
}
