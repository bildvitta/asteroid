<template>
  <component :is="component.is" v-bind="component" :data-cy="field.name" :model-value="formattedValue" @update:model-value="updateModel">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </component>
</template>

<script>
import QasCheckbox from '../checkbox/QasCheckbox.vue'
import QasDateTimeInput from '../date-time-input/QasDateTimeInput.vue'
import QasInput from '../input/QasInput.vue'
import QasNumericInput from '../numeric-input/QasNumericInput.vue'
import QasOptionGroup from '../option-group/QasOptionGroup.vue'
import QasPasswordInput from '../password-input/QasPasswordInput.vue'
import QasSignatureUploader from '../signature-uploader/QasSignatureUploader.vue'
import QasUploader from '../uploader/QasUploader.vue'
import QasToggle from '../toggle/QasToggle.vue'
import QasRadio from '../radio/QasRadio.vue'

const attributesProfile = {
  maxLength: 'maxlength',
  minLength: 'minlength',
  readOnly: 'readonly'
}

export default {
  name: 'QasField',

  components: {
    QasCheckbox,
    QasDateTimeInput,
    QasInput,
    QasNumericInput,
    QasOptionGroup,
    QasPasswordInput,
    QasSignatureUploader,
    QasUploader,
    QasToggle,
    QasRadio
  },

  inheritAttrs: false,

  props: {
    error: {
      default: '',
      type: [Array, String]
    },

    field: {
      default: () => ({}),
      required: true,
      type: Object
    },

    modelValue: {
      default: undefined,
      type: [Object, Array, String, Number, Boolean]
    }
  },

  emits: ['update:modelValue'],

  computed: {
    component () {
      const {
        disable,
        entity,
        extensions,
        filled,
        label,
        mask,
        maxFiles,
        maxlength,
        minlength,
        multiple,
        name,
        options,
        placeholder,
        places,
        prefix,
        readonly,
        required,
        suffix,
        type,
        useIso,
        useLazyLoading,
        useStrengthChecker
      } = this.formattedField

      // Default error attributes for Quasar.
      const error = {
        error: this.hasError || undefined,
        errorMessage: this.errorMessage || undefined
      }

      // Compact default fields attributes.
      const input = {
        label,
        hideBottomSpace: !error.error,
        ...error,
        readonly,
        required,
        disable,
        filled,
        maxlength,
        minlength,
        suffix,
        placeholder,
        prefix,
        useIso
      }

      const numericInput = { is: 'qas-numeric-input', places, ...input }
      const datetimeInput = { is: 'qas-date-time-input', useIso, ...input }

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
        textarea: { is: 'qas-input', type, ...input },
        number: { is: 'qas-input', type: 'number', ...input },
        hidden: { is: 'input', name, type },
        email: { is: 'qas-input', type, ...input },
        password: { is: 'qas-password-input', ...input, useStrengthChecker },

        decimal: { ...numericInput, mode: 'decimal' },
        money: { ...numericInput, mode: 'money' },
        percent: { ...numericInput, mode: 'percent' },

        date: { ...datetimeInput, useDateOnly: true },
        datetime: { ...datetimeInput },
        time: { ...datetimeInput, useTimeOnly: true },

        boolean: { is: 'qas-toggle', label, ...error },
        checkbox: { is: 'qas-checkbox', label, options, ...error, required },
        radio: { is: 'qas-radio', label, options },

        upload: { is: 'qas-uploader', accept, autoUpload: true, entity, label, multiple, readonly, maxFiles, ...error },
        editor: { is: 'q-editor', toolbar, ...error },

        'signature-uploader': { is: 'qas-signature-uploader', uploaderProps: { entity, label, ...error } },

        select: { is: 'qas-select', entity, name, multiple, options, useLazyLoading, ...input }
      }

      return {
        ...(profiles[type] || profiles.default),
        ...this.$attrs
      }
    },

    errorMessage () {
      return Array.isArray(this.error) ? this.error.join(' ') : this.error
    },

    // This computed will change the key name when the server sends different key.
    formattedField () {
      const field = {}

      for (const key in this.field) {
        field[attributesProfile[key] || key] = this.field[key]
      }

      return field
    },

    formattedValue () {
      if (!this.isBoolean) {
        return this.modelValue
      }

      if (this.isEmptyValue) {
        return !!this.modelValue
      }

      return JSON.parse(this.modelValue)
    },

    hasError () {
      return !!(Array.isArray(this.error) ? this.error.length : this.error)
    },

    isBoolean () {
      return this.field.type === 'boolean'
    },

    isEmptyValue () {
      if (!this.isBoolean) {
        return false
      }

      return !this.modelValue && (this.modelValue === undefined || typeof this.modelValue === 'string')
    },

    isNumberType () {
      return this.field.type === 'number'
    }
  },

  methods: {
    updateModel (value) {
      this.$emit('update:modelValue', this.isNumberType ? Number(value) : value)
    }
  }
}
</script>
