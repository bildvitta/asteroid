<template>
  <q-field v-model="model">
    <template #control="{ emitValue, floatingLabel, id, value }">
      <input v-show="floatingLabel" ref="input" class="q-field__input" :id="id" :model-value="value" @input="event => emitValue(event.target.value)">
    </template>
  </q-field>
</template>

<script>
const defaultModes = {
  integer: ['commaDecimalCharDotSeparator', 'integer'],
  decimal: 'commaDecimalCharDotSeparator',
  percent: 'percentageEU2dec',
  money: 'Brazilian'
}

export default {
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

    preset: {
      default: false,
      type: [Boolean, String]
    },

    value: {
      validator (value) {
        return typeof value === 'number' || typeof value === 'string' || value === '' || value === null
      }
    }
  },

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
        return this.value
      },

      set (value) {
        value = this.autoNumeric.getNumber()
        this.$emit('input', value)
      }
    }
  },

  async created () {
    const AutoNumeric = (await import('autoNumeric')).default
    const AutoNumericPredefinedOptions = AutoNumeric.getPredefinedOptions()

    function getPredefinedOptions (option) {
      const response = {}

      if (!Array.isArray(option)) {
        option = [option]
      }

      for (const value of option) {
        Object.assign(response, AutoNumericPredefinedOptions[value])
      }

      return response
    }

    const options = getPredefinedOptions(this.preset || this.defaultMode)

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
      this.$refs.input.value = this.value
      this.autoNumeric = new AutoNumeric(this.$refs.input, options)
    })
  }
}
</script>
