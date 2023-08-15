<template>
  <q-field dense :model-value="modelValue">
    <template #control="{ floatingLabel, id }">
      <input v-show="floatingLabel" :id="id" ref="input" class="q-field__input" :placeholder="placeholder" @blur="emitValue" @click="setSelect" @input="emitUpdateModel($event.target.value)">
    </template>
  </q-field>
</template>

<script>
import AutoNumeric from 'autonumeric'
import { getPlaceholder } from '../../helpers'

const defaultModes = {
  decimal: 'commaDecimalCharDotSeparator',
  integer: ['commaDecimalCharDotSeparator', 'integer'],
  money: 'Brazilian',
  percent: 'percentageEU2dec'
}

export default {
  name: 'QasNumericInput',

  props: {
    autonumericOptions: {
      default: () => ({}),
      type: Object
    },

    places: {
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
    },

    useNegative: {
      type: Boolean
    },

    usePositive: {
      default: true,
      type: Boolean
    }
  },

  emits: [
    'update:modelValue',
    'update-model'
  ],

  data () {
    return {
      autoNumeric: null
    }
  },

  computed: {
    defaultMode () {
      return defaultModes[this.mode]
    },

    placeholder () {
      const { placeholder } = this.$attrs

      return placeholder || getPlaceholder(this.mode)
    }
  },

  watch: {
    modelValue (value) {
      if (this.autoNumeric) {
        this.autoNumeric.set(value)
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

    if (!this.useNegative) {
      options.minimumValue = 0
    }

    if (!this.usePositive) {
      options.maximumValue = 0
    }

    if (this.mode !== 'integer') {
      options.decimalPlaces = this.places
    }

    if (this.mode === 'money') {
      // TODO
      /*
      * adicionado manualmente por conta do espaçamento, neste formato não esta preparado para
      * outras linguas, teria que adaptar no futuro, o que não é um problema no momento
      */
      options.currencySymbol = 'R$ '
    }

    Object.assign(options, this.autonumericOptions)

    this.$nextTick(() => {
      this.autoNumeric = new AutoNumeric(this.$refs.input, options)
      this.autoNumeric.set(this.modelValue)
    })
  },

  beforeUnmount () {
    this.autoNumeric.remove()
  },

  methods: {
    setSelect () {
      this.$refs?.input?.select()
    },

    emitValue () {
      this.$emit('update:modelValue', this.autoNumeric.getNumber())
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
