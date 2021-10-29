<template>
  <div>
    <q-input ref="input" v-bind="attributes" v-on="events">
      <template #append>
        <q-icon v-if="!timeOnly" class="cursor-pointer" name="o_event">
          <q-popup-proxy ref="dateProxy" transition-hide="scale" transition-show="scale">
            <q-date v-model="currentValue" v-bind="dateOptions" :mask="maskDate" @input="input" />
          </q-popup-proxy>
        </q-icon>

        <q-icon v-if="!dateOnly" class="cursor-pointer q-ml-md" name="o_access_time">
          <q-popup-proxy ref="timeProxy" transition-hide="scale" transition-show="scale">
            <q-time v-model="currentValue" v-bind="timeOptions" format24h :mask="maskDate" @input="input" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { date } from 'quasar'
import { date as dateFn } from '../../helpers/filters'

export default {
  props: {
    dateMask: {
      default: 'DD/MM/YYYY',
      type: String
    },

    dateOnly: {
      type: Boolean
    },

    dateOptions: {
      default: () => ({}),
      type: Object
    },

    gmt: {
      type: Boolean
    },

    timeMask: {
      default: 'HH:mm',
      type: String
    },

    timeOnly: {
      type: Boolean
    },

    timeOptions: {
      default: () => ({}),
      type: Object
    },

    value: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      currentValue: '',
      lastValue: ''
    }
  },

  computed: {
    attributes () {
      const { value, ...attributes } = this.$attrs

      return {
        ...attributes,
        mask: this.mask,
        value: this.currentValue
      }
    },

    events () {
      const { input, ...events } = this.$listeners

      return {
        ...events,
        input: this.input
      }
    },

    inputElement () {
      return this.$refs.input
    },

    mask () {
      return this.maskDate.replace(/\w/g, '#')
    },

    maskDate () {
      const mask = []

      if (!this.timeOnly) { mask.push(this.dateMask) }
      if (!this.dateOnly) { mask.push(this.timeMask) }

      return mask.join(' ')
    }
  },

  watch: {
    value (current, original) {
      if (!current || this.timeOnly) {
        this.currentValue = current
        return
      }

      if (current !== original && current !== this.lastValue) {
        this.currentValue = this.toMask(current)
      }
    }
  },

  created () {
    this.currentValue = this.toMask(this.value)
  },

  mounted () {
    this.$emit('mounted', this)
  },

  methods: {
    blur () {
      this.inputElement.blur()
    },

    focus () {
      this.inputElement.focus()
    },

    input (value) {
      this.currentValue = value
      const valueLength = value.replace(/_/g, '').length

      if (value === '' || valueLength === this.mask.length) {
        this.lastValue = this.timeOnly ? value : this.toISOString(value)
        this.$emit('input', this.lastValue)
      }

      if (this.dateOnly) {
        this.$refs.dateProxy.hide()
      }

      if (this.timeOnly) {
        this.$refs.timeProxy.hide()
      }
    },

    toISOString (value) {
      if (!value) {
        return ''
      }

      if (this.dateOnly && !this.gmt) {
        return dateFn(date.extractDate(value, this.maskDate), 'yyyy-MM-dd')
      }

      if (this.timeOnly && !this.gmt) {
        return date.extractDate(value, 'HH:MM')
      }

      return date.extractDate(value, this.maskDate).toISOString()
    },

    toMask (value) {
      if (!value || this.timeOnly) {
        return value || ''
      }

      const newDate = new Date(value).toISOString()

      return date.formatDate(
        this.dateOnly ? newDate.slice(0, 23) : newDate,
        this.maskDate
      )
    }
  }
}
</script>
