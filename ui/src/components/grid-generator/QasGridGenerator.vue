<template>
  <div :class="mx_classes">
    <div v-for="(field, key) in formattedFields" :key="key" :class="mx_getFieldClass(key, true)">
      <slot :field="slotValue[key]" :name="`field-${field.name}`">
        <slot :field="slotValue[key]" name="header">
          <div :class="headerClass">{{ field.label }}</div>
        </slot>

        <slot :field="slotValue[key]" name="content">
          <div :class="contentClass">{{ resultsByFields[key] }}</div>
        </slot>
      </slot>
    </div>
  </div>
</template>

<script>
import { generatorMixin } from '../../mixins'
import { humanize } from '../../helpers/filters'
import { extend } from 'quasar'
import { isObject } from 'lodash-es'

export default {
  name: 'QasGridGenerator',

  mixins: [generatorMixin],

  props: {
    contentClass: {
      default: '',
      type: [Array, Object, String]
    },

    headerClass: {
      default: 'text-bold',
      type: [Array, Object, String]
    },

    hideEmptyResult: {
      type: Boolean
    },

    result: {
      default: () => ({}),
      type: Object
    }
  },

  data () {
    return {
      slotValue: {}
    }
  },

  computed: {
    formattedFields () {
      if (!this.hideEmptyResult) {
        return this.fields
      }

      const fields = {}

      for (const key in this.fields) {
        const result = this.result[key]

        const validate = Array.isArray(result)
          ? result.length
          : isObject(result) ? Object.keys(result).length : result

        if (validate) {
          fields[key] = this.fields[key]
        }
      }

      return fields
    },

    resultsByFields () {
      return this.getResultsByFields()
    }
  },

  methods: {
    getResultsByFields () {
      const formattedResult = {}
      const result = extend(true, {}, this.result)

      for (const key in result) {
        if (this.formattedFields[key]?.type) {
          formattedResult[key] = humanize(this.formattedFields[key], result[key])
          this.slotValue[key] = { ...this.formattedFields[key], formattedResult: formattedResult[key] }
        }
      }

      return formattedResult
    }
  }
}
</script>
