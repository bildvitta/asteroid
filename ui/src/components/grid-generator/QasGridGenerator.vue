<template>
  <div :class="mx_classes">
    <div v-for="(field, key) in fieldsByResult" :key="key" :class="mx_getFieldClass(key, true)">
      <slot :field="field" :name="`field-${field.name}`">
        <slot :field="field" name="header">
          <header :class="headerClass" :data-cy="`grid-generator-${field.name}-field`">
            {{ field.label }}
          </header>
        </slot>

        <slot :field="field" name="content">
          <div :class="contentClass" :data-cy="`grid-generator-${field.name}-result`">
            {{ field.formattedResult }}
          </div>
        </slot>
      </slot>
    </div>
  </div>
</template>

<script>
import { generatorMixin } from '../../mixins'
import { humanize } from '../../helpers/filters'
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

    emptyResultText: {
      default: '-',
      type: String
    },

    result: {
      default: () => ({}),
      type: Object
    },

    useEmptyResult: {
      default: true,
      type: Boolean
    }
  },

  data () {
    return {
      fieldsByResult: {}
    }
  },

  computed: {
    formattedFields () {
      if (this.useEmptyResult) return this.fields

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
    }
  },

  watch: {
    formattedFields: {
      handler () {
        this.setFieldsByResult()
      },

      immediate: true
    }
  },

  methods: {
    getFieldsByResult () {
      const result = { ...this.result }
      const fieldsByResult = {}

      for (const key in result) {
        const field = this.formattedFields[key] || {}

        if (!field.type) continue

        fieldsByResult[key] = {
          ...field,
          formattedResult: humanize(field, result[key]) || this.emptyResultText
        }
      }

      return fieldsByResult
    },

    setFieldsByResult () {
      this.fieldsByResult = this.getFieldsByResult()
    }
  }
}
</script>
