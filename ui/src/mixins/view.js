import { get } from 'lodash'
import { camelizeFieldsName } from '../helpers'

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
      const redirect = status >= 500 ? 'ServerError' : ({ 403: 'Forbidden', 404: 'NotFound' })[status]

      if (redirect) {
        this.$router.replace({ name: redirect })
      }
    },

    setErrors (errors = {}) {
      this.errors = errors
    },

    setFields (fields = {}) {
      this.fields = camelizeFieldsName(fields)
    },

    setMetadata (metadata = {}) {
      this.metadata = metadata
    }
  }
}
