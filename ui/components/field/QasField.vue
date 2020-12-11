<template>
  <component :is="component.is" v-bind="component" v-on="events" :value="formattedValue" @input="emitValue" />
</template>

<script>
const attributesProfile = {
  maxLength: 'maxlength',
  minLength: 'minlength',
  readOnly: 'readonly'
}

export default {
  name: 'QasField',

  props: {
    error: {
      default: '',
      type: [String, Array]
    },

    field: {
      default: () => ({}),
      type: Object,
      required: true
    }
  },

  computed: {
    formattedValue () {
      const { value } = this.$attrs

      if (!this.isBoolean) {
        return value
      }

      if (this.isEmptyValue) {
        return !!value
      }

      return JSON.parse(value)
    },

    isEmptyValue () {
      const { value } = this.$attrs

      if (!this.isBoolean) {
        return false
      }

      return !this.value && (value === undefined || typeof value === 'string')
    },

    isBoolean () {
      return this.field.type === 'boolean'
    },

    // This computed will change the key name when the server sends different key.
    formatedField () {
      const field = {}

      for (const key in this.field) {
        field[attributesProfile[key] || key] = this.field[key]
      }

      return field
    },

    component () {
      const {
        entity,
        extensions,
        label,
        maxlength,
        minlength,
        multiple,
        name,
        options,
        readonly,
        filled = readonly,
        suffix,
        prefix,
        type,
        mask,
        pattern
        } = this.formatedField

      // Default error attributes for Quasar.
      const error = {
        error: this.hasError || undefined,
        errorMessage: this.errorMessage || undefined
      }

      // Compact default fields attributes.
      const input = {
        label,
        hideBottomSpace: !error.error,
        outlined: true,
        ...error,
        readonly,
        filled,
        maxlength,
        minlength,
        suffix,
        prefix
      }

      const datetimeInput = { is: 'qs-datetime-input', ...input }
      const decimalInput = { is: 'qs-decimal-input', comma: true, fillMask: '0', reverseFillMask: true, ...input }

      // It'll generate a list of acceptable files extensions.
      const accept = extensions && extensions.length ? extensions.map(extension => `.${extension}`).join(',') : false

      // Editor default toolbar.
      const toolbar = [
        ['undo', 'redo'],
        ['bold', 'italic', 'underline'],
        ['left', 'center', 'right', 'justify'],
        ['hr', 'link'],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['print', 'fullscreen']
      ]

      // Profiles
      const profiles = {
        default: { is: 'q-input', ...input, mask },
        textarea: { is: 'q-input', type, ...input },
        number: { is: 'q-input', type: 'number', ...input },
        hidden: { is: 'input', name, type },
        email: { is: 'q-input', type, ...input },
        password: { is: 'qs-password-input', type, pattern, ...input },

        decimal: { ...decimalInput },
        money: { ...decimalInput, prefix: 'R$' },
        percent: { ...decimalInput, suffix: '%' },

        date: { ...datetimeInput, dateOnly: true },
        datetime: { ...datetimeInput },
        time: { ...datetimeInput, timeOnly: true },

        boolean: { is: 'q-toggle', label, ...error },
        checkbox: { is: 'qs-checkbox-group', label, options, ...error },
        radio: { is: 'q-option-group', label, options, type: 'radio', ...error },

        select: { is: 'q-select', emitValue: true, mapOptions: true, multiple, options, ...input },
        upload: { is: 'qs-uploader', accept, autoUpload: true, entity, label, multiple, ...error },
        editor: { is: 'q-editor', toolbar, ...error }
      }

      return { ...(profiles[type] || profiles.default), ...this.$attrs }
    },

    errorMessage () {
      return Array.isArray(this.error) ? this.error.join(' ') : this.error
    },

    hasError () {
      return !!(Array.isArray(this.error) ? this.error.length : this.error)
    },

    events () {
      const { input, ...events } = this.$listeners

      return events
    }
  },

  methods: {
    emitValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
