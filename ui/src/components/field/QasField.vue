<template>
  <component :is="component.is" v-bind="component" :value="formattedValue" v-on="events" @input="emitValue" />
</template>

<script>
import QasCheckboxGroup from '../checkbox-group/QasCheckboxGroup.vue'
import QasDateTimeInput from '../date-time-input/QasDateTimeInput.vue'
import QasDecimalInput from '../decimal-input/QasDecimalInput.vue'
import QasInput from '../input/QasInput.vue'
import QasPasswordInput from '../password-input/QasPasswordInput.vue'
import QasUploader from '../uploader/QasUploader.vue'

const attributesProfile = {
  maxLength: 'maxlength',
  minLength: 'minlength',
  readOnly: 'readonly'
}

export default {
  components: {
    QasCheckboxGroup,
    QasDateTimeInput,
    QasDecimalInput,
    QasInput,
    QasPasswordInput,
    QasUploader
  },

  props: {
    error: {
      default: '',
      type: [Array, String]
    },

    field: {
      default: () => ({}),
      required: true,
      type: Object
    }
  },

  computed: {
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

      const datetimeInput = { is: 'qas-date-time-input', ...input }
      const decimalInput = { is: 'qas-decimal-input', comma: true, fillMask: '0', reverseFillMask: true, ...input }

      // It'll generate a list of acceptable files extensions.
      const accept = extensions && extensions.length ? extensions.map(extension => `.${extension}`).join(',') : ''

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
        default: { is: 'qas-input', ...input, mask },
        textarea: { is: 'q-input', type, ...input },
        number: { is: 'q-input', type: 'number', ...input },
        hidden: { is: 'input', name, type },
        email: { is: 'q-input', type, ...input },
        password: { is: 'qas-password-input', type, pattern, ...input },

        decimal: { ...decimalInput },
        money: { ...decimalInput, prefix: 'R$' },
        percent: { ...decimalInput, suffix: '%' },

        date: { ...datetimeInput, dateOnly: true },
        datetime: { ...datetimeInput },
        time: { ...datetimeInput, timeOnly: true },

        boolean: { is: 'q-toggle', label, ...error },
        checkbox: { is: 'qas-checkbox-group', label, options, ...error },
        radio: { is: 'q-option-group', label, options, type: 'radio', ...error },

        select: { is: 'q-select', emitValue: true, mapOptions: true, multiple, options, ...input },
        upload: { is: 'qas-uploader', accept, autoUpload: true, entity, label, multiple, ...error },
        editor: { is: 'q-editor', toolbar, ...error }
      }

      return { ...(profiles[type] || profiles.default), ...this.$attrs }
    },

    errorMessage () {
      return Array.isArray(this.error) ? this.error.join(' ') : this.error
    },

    events () {
      const { input, ...events } = this.$listeners
      return events
    },

    // This computed will change the key name when the server sends different key.
    formatedField () {
      const field = {}

      for (const key in this.field) {
        field[attributesProfile[key] || key] = this.field[key]
      }

      return field
    },

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

    hasError () {
      return !!(Array.isArray(this.error) ? this.error.length : this.error)
    },

    isBoolean () {
      return this.field.type === 'boolean'
    },

    isEmptyValue () {
      const { value } = this.$attrs

      if (!this.isBoolean) {
        return false
      }

      return !this.value && (value === undefined || typeof value === 'string')
    }
  },

  methods: {
    emitValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
