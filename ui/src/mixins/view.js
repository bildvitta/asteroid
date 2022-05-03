import { camelize } from 'humps'
import { get } from 'lodash'

import { NotifyError } from '../plugins'

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

    hasFooterSlot () {
      return !!(this.$slots.footer || this.$scopedSlots.footer)
    },

    hasHeaderSlot () {
      return !!(this.$slots.header || this.$scopedSlots.header)
    }
  },

  methods: {
    fetchError (error) {
      const { response } = error
      const exception = get(response, 'data.exception') || error.message

      NotifyError('Ops! Erro ao obter os dados.', exception)

      const status = get(response, 'status')
      const redirect = ({ 403: 'Forbidden', 404: 'NotFound', 500: 'ServerError', 503: 'ServerError' })[status]

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
