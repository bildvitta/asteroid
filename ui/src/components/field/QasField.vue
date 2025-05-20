<template>
  <!-- <component :is="component.is" v-bind="component" :data-cy="field.name" :model-value="formattedValue" @update:model-value="updateModel"> -->
  <component :is="component.is" v-bind="component.props" :data-cy="field.name" :model-value="formattedValue" @update:model-value="updateModel">
    <!-- <template v-for="(_, name) in $slots" #[name]="context"> -->
    <template v-for="(_, name) in slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </component>
</template>

<!-- <script>
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
import QasSelect from '../select/QasSelect'

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
    QasRadio,
    QasSelect
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
      console.log('TCL: component -> this.formattedField', this.formattedField)

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

      console.log('TCL: component -> attrs', this.$attrs)

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
</script> -->

<script setup>
import { defineAsyncComponent, computed, useAttrs, useSlots } from 'vue'

defineOptions({
  name: 'QasField',
  inheritAttrs: false
})

const props = defineProps({
  error: {
    type: [Array, String],
    default: ''
  },

  field: {
    type: Object,
    required: true,
    default: () => ({})
  },

  modelValue: {
    type: [Object, Array, String, Number, Boolean],
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue'])

// composables
const attributes = useAttrs()
const slots = useSlots()

// computeds
const errorPayload = computed(() => {
  return {
    error: !!(Array.isArray(props.error) ? props.error.length : props.error) || undefined,
    errorMessage: Array.isArray(props.error) ? props.error.join(' ') : props.error
  }
})

const isBoolean = computed(() => props.field.type === 'boolean')

const formattedField = computed(() => {
  const field = {}

  const attributesProfile = {
    maxLength: 'maxlength',
    minLength: 'minlength',
    readOnly: 'readonly'
  }

  for (const key in props.field) {
    field[attributesProfile[key] || key] = props.field[key]
  }

  return field
})

const formattedValue = computed(() => {
  if (!isBoolean.value) return props.modelValue

  const isEmptyValue = !props.modelValue && (props.modelValue === undefined || typeof props.modelValue === 'string')

  if (isEmptyValue) return !!props.modelValue

  return JSON.parse(props.modelValue)
})

const defaultInputProps = computed(() => {
  const {
    disable,
    filled,
    label,
    maxlength,
    minlength,
    placeholder,
    prefix,
    readonly,
    required,
    suffix,
    useIso
  } = formattedField.value

  return {
    label,
    hideBottomSpace: !errorPayload.value.error,
    ...errorPayload.value,
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
})

// components
const qasInput = computed(() => {
  return {
    is: () => import('../input/QasInput.vue'),
    props: defaultInputProps.value
  }
})

const qasNumericInput = computed(() => {
  const { places } = formattedField.value

  return {
    is: () => import('../numeric-input/QasNumericInput.vue'),
    props: {
      ...defaultInputProps.value,
      places
    }
  }
})

const qasPasswordInput = computed(() => {
  const { useStrengthChecker } = formattedField.value

  return {
    is: () => import('../password-input/QasPasswordInput.vue'),
    props: {
      ...defaultInputProps.value,
      useStrengthChecker
    }
  }
})

const qasDateTimeInput = computed(() => {
  const { useIso } = formattedField.value

  return {
    is: () => import('../date-time-input/QasDateTimeInput.vue'),
    props: {
      useIso,
      ...defaultInputProps.value
    }
  }
})

const qasToggle = computed(() => {
  const { label } = formattedField.value

  return {
    is: () => import('../toggle/QasToggle.vue'),
    props: {
      label,
      ...errorPayload.value
    }
  }
})

const qasRadio = computed(() => {
  const { label, options } = formattedField.value

  return {
    is: () => import('../radio/QasRadio.vue'),
    props: {
      label,
      options
    }
  }
})

const qasCheckbox = computed(() => {
  const { label, options, required } = formattedField.value

  return {
    is: () => import('../checkbox/QasCheckbox.vue'),
    props: {
      label,
      options,
      required,
      ...errorPayload.value
    }
  }
})

const qasUploader = computed(() => {
  const {
    accept,
    entity,
    label,
    multiple,
    readonly,
    maxFiles
  } = formattedField.value

  return {
    is: () => import('../uploader/QasUploader.vue'),
    props: {
      accept,
      autoUpload: true,
      entity,
      label,
      multiple,
      readonly,
      maxFiles,
      ...errorPayload.value
    }
  }
})

const qEditor = computed(() => {
  return {
    is: () => import('quasar').then(q => q.QEditor),
    props: {
      toolbar: [
        ['undo', 'redo'],
        ['bold', 'italic', 'underline'],
        ['left', 'center', 'right', 'justify'],
        ['hr', 'link'],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['print', 'fullscreen']
      ],
      ...errorPayload.value
    }
  }
})

const qasSignatureUploader = computed(() => {
  const { entity, label } = formattedField.value

  return {
    is: () => import('../signature-uploader/QasSignatureUploader.vue'),
    props: {
      uploaderProps: {
        entity,
        label,
        ...errorPayload.value
      }
    }
  }
})

const qasSelect = computed(() => {
  const {
    entity,
    name,
    multiple,
    options,
    useLazyLoading
  } = formattedField.value

  console.log('TCL: qasSelect -> name', options)
  return {
    is: () => import('../select/QasSelect.vue'),
    props: {
      entity,
      name,
      multiple,
      options,
      useLazyLoading,
      ...defaultInputProps.value
    }
  }
})

const component = computed(() => {
  const {
    mask,
    type,
    name
  } = formattedField.value

  const profiles = {
    default: {
      is: qasInput.value.is,
      props: {
        ...qasInput.value.props,
        mask
      }
    },

    textarea: {
      is: qasInput.value.is,
      props: {
        ...qasInput.value.props,
        type: 'textarea'
      }
    },

    number: {
      is: qasInput.value.is,
      props: {
        ...qasInput.value.props,
        type: 'number'
      }
    },

    hidden: {
      is: 'input',
      props: {
        name,
        type: 'hidden'
      }
    },

    email: {
      is: qasInput.value.is,
      props: {
        ...qasInput.value.props,
        type: 'email'
      }
    },

    money: {
      is: qasNumericInput.value.is,
      props: {
        ...qasNumericInput.value.props,
        mode: 'money'
      }
    },

    decimal: {
      is: qasNumericInput.value.is,
      props: {
        ...qasNumericInput.value.props,
        mode: 'decimal'
      }
    },

    percent: {
      is: qasNumericInput.value.is,
      props: {
        ...qasNumericInput.value.props,
        mode: 'percent'
      }
    },

    date: {
      is: qasDateTimeInput.value.is,
      props: {
        ...qasDateTimeInput.value.props,
        useDateOnly: true
      }
    },

    time: {
      is: qasDateTimeInput.value.is,
      props: {
        ...qasDateTimeInput.value.props,
        useTimeOnly: true
      }
    },

    checkbox: qasCheckbox.value,
    password: qasPasswordInput.value,
    select: qasSelect.value,
    datetime: qasDateTimeInput.value,
    boolean: qasToggle.value,
    radio: qasRadio.value,
    upload: qasUploader.value,
    editor: qEditor.value,
    'signature-uploader': qasSignatureUploader.value
  }

  const is = profiles[type]?.is || profiles.default?.is

  const isDynamicImport = typeof is === 'function'

  console.log('TCL: component -> attributes', attributes)
  return {
    is: isDynamicImport ? defineAsyncComponent(profiles[type]?.is || profiles.default?.is) : is,
    props: {
      ...(profiles[type]?.props || profiles.default?.props)
      // ...attributes
    }
  }
})

// functions
function updateModel (value) {
  const isNumberType = props.field.type === 'number'

  const newValue = isNumberType ? Number(value) : value

  emit('update:modelValue', newValue)
}
</script>
