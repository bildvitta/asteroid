<template>
  <div :class="classes">
    <div v-for="(field, key) in formattedFields" :key="key" v-test:grid-generator :class="getFieldClass(key, true)">
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
import generatorMixin from '../../mixins/generator'
import { humanize } from '../../helpers/filters'
import { extend } from 'quasar'
import test from '../../directives/Test'

export default {

  directives: {
    test
  },

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
        if (this.result[key]) {
          fields[key] = this.fields[key]
        }
      }

      return fields
    },

    resultsByFields () {
      const formattedResult = {}
      const result = extend(true, {}, this.result)

      for (const key in result) {
        if (this.formattedFields[key]?.type) {
          formattedResult[key] = humanize(this.formattedFields[key], result[key])
          // TODO: Rever.
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.slotValue[key] = { ...this.formattedFields[key], formattedResult: formattedResult[key] }
        }
      }

      return formattedResult
    }
  }
}
</script>
