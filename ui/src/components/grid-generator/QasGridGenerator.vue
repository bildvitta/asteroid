<template>
  <div :class="mx_classes">
    <div v-for="(field, key) in formattedFields" :key="key" :class="mx_getFieldClass(key, true)">
      <slot :field="slotValue[key]" :name="`field-${field.name}`">
        <slot :field="slotValue[key]" name="header">
          <header :class="headerClass" :data-cy="`${field.name}-field`">{{ field.label }}</header>
        </slot>

        <slot :field="slotValue[key]" name="content">
          <div :class="contentClass" :data-cy="`${field.name}-result`">{{ resultsByFields[key] }}</div>
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
      slotValue: {}
    }
  },

  computed: {
    formattedFields () {
      if (this.useEmptyResult) {
        this.$qas.logger.group(
          'QasGridGenerator - formattedFields -> this.useEmptyResult tem valor "true"',
          [this.fields]
        )

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

      this.$qas.logger.group('QasGridGenerator - formattedFields', [fields])

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
          formattedResult[key] = (
            humanize(this.formattedFields[key], result[key]) || this.emptyResultText
          )

          this.slotValue[key] = {
            ...this.formattedFields[key],
            formattedResult: formattedResult[key]
          }
        }
      }

      this.$qas.logger.group('QasGridGenerator - getResultsByFields', [formattedResult])

      return formattedResult
    }
  }
}
</script>
