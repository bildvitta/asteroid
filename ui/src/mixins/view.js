import { camelize } from 'humps'
import { get } from 'lodash'

// import { NotifyError } from '../plugins'

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
      mx_errors: {},
      mx_fields: {},
      mx_metadata: {},

      mx_isFetching: false
    }
  },

  computed: {
    mx_componentTag () {
      return this.dialog ? 'div' : 'q-page'
    },

    mx_hasFooterSlot () {
      return !!(this.$slots.footer)
    },

    mx_hasHeaderSlot () {
      return !!(this.$slots.header)
    }
  },

  methods: {
    mx_fetchError (error) {
      const { response } = error
      const exception = get(response, 'data.exception') || error.message

      this.$qas.error('Ops! Erro ao obter os dados.', exception)
      // NotifyError('Ops! Erro ao obter os dados.', exception)

      const status = get(response, 'status')
      const redirect = ({ 403: 'Forbidden', 404: 'NotFound' })[status]

      if (redirect) {
        this.$router.replace({ name: redirect })
      }
    },

    mx_setErrors (errors = {}) {
      this.mx_errors = errors
    },

    mx_setFields (fields = {}) {
      for (const field in fields) {
        fields[field].name = camelize(fields[field].name)
      }

      this.mx_fields = { ...fields }
    },

    mx_setMetadata (metadata = {}) {
      this.mx_metadata = metadata
    }
  }
}
