<template>
  <div>
    <q-field :value="value" v-bind="$attrs">
      <template #control="{ floatingLabel, id }">
        <input v-show="floatingLabel" :id="id" ref="input" class="q-field__input" @blur="emitValue" @click="setSelect" @input="emitUpdateModel($event.target.value)">
      </template>
    </q-field>
  </div>
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
      default: '',
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
    }
  },

  watch: {
    value (value) {
      if (this.autoNumeric) {
        this.autoNumeric.set(value)
      }
    }
  },

  async created () {
    const AutoNumeric = (await import('autonumeric')).default
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
      this.autoNumeric = new AutoNumeric(this.$refs.input, options)
      this.autoNumeric.set(this.value)
    })
  },

  beforeDestroy () {
    this.autoNumeric.remove()
  },

  methods: {
    setSelect () {
      this.$refs?.input?.select()
    },

    emitValue () {
      this.$emit('input', this.autoNumeric.getNumber())
    },

    emitUpdateModel (value) {
      this.$emit('update-model', {
        value,
        raw: this.autoNumeric.getNumber()
      })
    }
  }
}
</script>
