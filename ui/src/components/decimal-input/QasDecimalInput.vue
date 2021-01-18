<template>
  <q-input v-bind="$attrs" fill-mask="0" :mask="mask" reverse-fill-mask :value="inputValue" v-on="events" @input="input" />
</template>

<script>
export default {
  props: {
    comma: {
      default: false,
      type: Boolean
    },

    places: {
      default: 2,
      type: Number
    },

    value: {
      default: 0,
      required: true,
      type: Number
    }
  },

  data () {
    return {
      inputedValue: 0,
      inputValue: this.toMask(this.value)
    }
  },

  computed: {
    events () {
      const { input, ...events } = this.$listeners
      return events
    },

    mask () {
      return `#${this.separator}${'#'.repeat(this.places)}`
    },

    separator () {
      return this.comma ? ',' : '.'
    }
  },

  watch: {
    value (current) {
      this.inputValue = this.toMask(current)
    }
  },

  mounted () {
    this.$emit('mount', this)
  },

  methods: {
    blur () {
      this.$el.blur()
    },

    focus () {
      this.$el.focus()
    },

    input (value) {
      this.inputedValue = this.toDecimal(value)
      this.$emit('input', this.inputedValue)
    },

    toDecimal (value) {
      if (this.comma) {
        value = value.replace(',', '.')
      }

      return parseFloat(value)
    },

    toMask (value) {
      value = value.toFixed(this.places)

      if (this.comma) {
        value = value.replace('.', ',')
      }

      return value
    }
  }
}
</script>
