<template>
  <div :class="classes">
    <div v-for="(field, key) in formattedFields" :key="key" :class="getFieldClass(key, true)">
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
import generator from '../../mixins/generator'
import { humanize } from '../../helpers/filters'
import { extend } from 'quasar'

export default {
  mixins: [generator],

  props: {
    result: {
      type: Object,
      default: () => ({})
    },

    headerClass: {
      type: String,
      default: 'text-bold'
    },

    contentClass: {
      type: String,
      default: ''
    },

    hideEmptyResult: {
      type: Boolean
    }
  },

  data () {
    return {
      slotValue: {}
    }
  },

  computed: {
    resultsByFields () {
      const result = extend(true, {}, this.result)

      const formattedResult = {}

      for (const key in result) {
        if (this.formattedFields[key]?.type) {
          formattedResult[key] = humanize(this.formattedFields[key], result[key])
          // TODO rever
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.slotValue[key] = { ...this.formattedFields[key], formattedResult: formattedResult[key] }
        }
      }

      return formattedResult
    },

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
    }
  }
}
</script>
