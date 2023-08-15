<template>
  <qas-input ref="input" v-bind="attributes" v-model="currentValue" inputmode="numeric" :unmasked-value="false" @blur="validateDateTimeOnBlur" @focus="resetError" @update:model-value="updateModelValue">
    <template #append>
      <qas-btn v-if="!useTimeOnly" color="grey-9" :disable="$attrs.readonly" icon="sym_r_event" variant="tertiary">
        <q-popup-proxy ref="dateProxy" transition-hide="scale" transition-show="scale">
          <qas-date v-model="currentValue" v-bind="defaultDateProps" :mask="maskDate" width="290px" @update:model-value="updateModelValue" />
        </q-popup-proxy>
      </qas-btn>

      <qas-btn v-if="!useDateOnly" class="q-ml-sm" color="grey-9" :disable="$attrs.readonly" icon="sym_r_access_time">
        <q-popup-proxy ref="timeProxy" transition-hide="scale" transition-show="scale">
          <q-time v-model="currentValue" v-bind="defaultTimeProps" format24h :mask="maskDate" @update:model-value="updateModelValue" />
        </q-popup-proxy>
      </qas-btn>
    </template>
  </qas-input>
</template>

<script>
import { date } from 'quasar'
import { date as dateFn } from '../../helpers/filters'

export default {
  name: 'QasDateTimeInput',

  inheritAttrs: false,

  props: {
    dateMask: {
      default: 'DD/MM/YYYY',
      type: String
    },

    dateProps: {
      default: () => ({}),
      type: Object
    },

    timeMask: {
      default: 'HH:mm',
      type: String
    },

    timeProps: {
      default: () => ({}),
      type: Object
    },

    useIso: {
      type: Boolean
    },

    useTimeOnly: {
      type: Boolean
    },

    useDateOnly: {
      type: Boolean
    },

    modelValue: {
      default: '',
      type: String
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      currentValue: '',
      error: false,
      errorMessage: '',
      hasInvalidDate: false,
      lastValue: ''
    }
  },

  computed: {
    attributes () {
      const { modelValue, ...attributes } = this.$attrs

      return {
        error: this.error,
        errorMessage: this.errorMessage,
        ...attributes,
        mask: this.mask
      }
    },

    defaultDateProps () {
      return {
        ...this.defaultDateTimeProps,
        ...this.dateProps
      }
    },

    defaultTimeProps () {
      return {
        ...this.defaultDateTimeProps,
        ...this.timeProps
      }
    },

    defaultDateTimeProps () {
      return {
        readonly: this.$attrs.readonly,
        disable: this.$attrs.disable
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

      if (!this.useTimeOnly) { mask.push(this.dateMask) }
      if (!this.useDateOnly) { mask.push(this.timeMask) }

      return mask.join(' ')
    }
  },

  watch: {
    modelValue (current, original) {
      if (!current || this.useTimeOnly) {
        this.currentValue = current
        return
      }

      if (current !== original && current !== this.lastValue) {
        this.currentValue = this.toMask(current)
      }
    }
  },

  created () {
    this.currentValue = this.toMask(this.modelValue)
  },

  methods: {
    blur () {
      this.inputElement.blur()
    },

    focus () {
      this.inputElement.focus()
    },

    updateModelValue (value) {
      this.currentValue = value
      const valueLength = value?.replace?.(/_/g, '')?.length

      this.error = this.validateDateAndTime(value)

      if (this.error) {
        this.hasInvalidDate = true
        this.errorMessage = 'Data inválida.'
        return
      }

      this.hasInvalidDate = false

      if (value === '' || valueLength === this.mask.length) {
        this.lastValue = this.useTimeOnly ? value : this.toISOString(value)
        this.$emit('update:modelValue', this.lastValue)
      }

      if (this.useDateOnly) {
        this.$refs.dateProxy.hide()
      }

      if (this.useTimeOnly) {
        this.$refs.timeProxy.hide()
      }
    },

    toISOString (value) {
      if (!value) return ''

      if (this.useDateOnly && !this.useIso) {
        return dateFn(date.extractDate(value, this.maskDate), 'yyyy-MM-dd')
      }

      if (this.useTimeOnly && !this.useIso) {
        return date.extractDate(value, 'HH:MM')
      }

      return date.extractDate(value, this.maskDate).toISOString()
    },

    toMask (value) {
      if (!value || this.useTimeOnly) {
        return value || ''
      }

      const newDate = new Date(value).toISOString()

      return date.formatDate(
        this.useDateOnly ? newDate.slice(0, 23) : newDate,
        this.maskDate
      )
    },

    validateDateTimeOnBlur () {
      const valueLength = this.currentValue?.replace?.(/_/g, '')?.length

      // valida se o tamanho digitado é o tamanho que a mascara espera receber
      this.error = !!((valueLength < this.mask.length || this.error) && valueLength)

      if (this.error && !this.hasInvalidDate) {
        this.errorMessage = 'Data incompleta.'
      }

      if (this.hasInvalidDate) {
        this.currentValue = ''
      }

      if (this.error || this.hasInvalidDate) {
        this.$emit('update:modelValue', '')
      }
    },

    validateDateAndTime (value) {
      if (!value) return false

      if (this.useDateOnly) return this.validateDateOnly(value)
      if (this.useTimeOnly) return this.validateTimeOnly(value)

      const [date, time] = value?.split(' ') || []

      return this.validateDateOnly(date) || this.validateTimeOnly(time)
    },

    validateDateOnly (value = '') {
      const [day, month] = value.split('/')

      return day > 31 || month > 12
    },

    validateTimeOnly (value = '') {
      const [hour, minute] = value.split(':')

      return hour > 23 || minute > 59
    },

    resetError () {
      if (!this.currentValue) {
        this.error = false
      }
    }
  }
}
</script>
