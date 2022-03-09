import { camelize } from 'humps'
import { get } from 'lodash-es'
import { markRaw } from 'vue'

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
    },

    fields: {
      default: () => ({}),
      type: Object
    },

    errors: {
      default: () => ({}),
      type: Object
    },

    metadata: {
      default: () => ({}),
      type: Object
    },

    fetching: {
      type: Boolean
    }
  },

  emits: [
    'update:fields',
    'update:errors',
    'update:metadata',
    'update:fetching'
  ],

  data () {
    return {
      mx_errors: {},
      mx_fields: {},
      mx_metadata: {},

      mx_isFetching: false
    }
  },

  watch: {
    mx_isFetching (value) {
      this.$emit('update:fetching', value)
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

      const status = get(response, 'status')
      const redirect = ({ 403: 'Forbidden', 404: 'NotFound' })[status]

      if (redirect) {
        this.$router.replace({ name: redirect })
      }
    },

    mx_setErrors (errors = {}) {
      this.mx_errors = markRaw(errors)
    },

    mx_setFields (fields = {}) {
      for (const field in fields) {
        fields[field].name = camelize(fields[field].name)
      }

      this.mx_fields = markRaw(fields)
    },

    mx_setMetadata (metadata = {}) {
      this.mx_metadata = markRaw(metadata)
    },

    mx_updateModels (models) {
      for (const key in models) {
        this.$emit(`update:${key}`, models[key])
      }
    }
  }
}
