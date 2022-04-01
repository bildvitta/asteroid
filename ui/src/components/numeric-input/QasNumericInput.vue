<template>
  <q-field v-model="model" outlined>
    <template #control="{ emitValue, floatingLabel, id, value }">
      <input v-show="floatingLabel" :id="id" ref="input" class="q-field__input" :model-value="value" @input="emitValue($event.target.value)">
    </template>
  </q-field>
</template>

<script>
import AutoNumeric from 'autonumeric'

const defaultModes = {
  decimal: 'commaDecimalCharDotSeparator',
  integer: ['commaDecimalCharDotSeparator', 'integer'],
  money: 'Brazilian',
  percent: 'percentageEU2dec'
}

export default {
  name: 'QasNumericInput',

  props: {
    allowNegative: {
      default: true,
      type: Boolean
    },

    allowPositive: {
      default: true,
      type: Boolean
    },

    autonumericProps: {
      default: () => ({}),
      type: Object
    },

    decimalPlaces: {
      default: 2,
      type: Number
    },

    mode: {
      default: 'integer',
      type: String,
      validator: value => ['integer', 'decimal', 'percent', 'money'].includes(value)
    },

    modelValue: {
      default: '',
      type: [String, Number],
      validator: value => {
        return (
          typeof value === 'number' ||
          typeof value === 'string' ||
          value === '' ||
          value === null
        )
      }
    },

    preset: {
      default: false,
      type: [Boolean, String]
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      autoNumeric: null
    }
  },

  computed: {
    defaultMode () {
      return defaultModes[this.mode]
    },

    model: {
      get () {
        return this.modelValue
      },

      set () {
        this.$emit('update:modelValue', this.autoNumeric.getNumber())
      }
    }
  },

  async created () {
    const autoNumericPredefinedOptions = AutoNumeric.getPredefinedOptions()

    let option = this.preset || this.defaultMode

    if (!Array.isArray(option)) {
      option = [option]
    }

    const options = {}

    for (const value of option) {
      Object.assign(options, autoNumericPredefinedOptions[value])
    }

    if (!this.allowNegative) {
      options.minimumValue = 0
    }

    if (!this.allowPositive) {
      options.maximumValue = 0
    }

    if (this.mode !== 'integer') {
      options.decimalPlaces = this.decimalPlaces
    }

    Object.assign(options, this.autonumericProps)

    this.$nextTick(() => {
      this.$refs.input.value = this.modelValue
      this.autoNumeric = new AutoNumeric(this.$refs.input, options)
    })
  },

  beforeUnmount () {
    this.autoNumeric.remove()
  }
}
</script>
