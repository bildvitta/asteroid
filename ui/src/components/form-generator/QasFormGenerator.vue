<template>
  <div>
    <div :class="classes">
      <div v-for="(field, key) in groupedFields.visible" :key="key" :class="getFieldClass(key)">
        <slot :field="field" :name="`field-${field.name}`">
          <qas-field v-bind="fieldsProps[field.name]" :error="errors[key]" :field="field" :value="value[field.name]" v-on="fieldsEvents[field.name]" @input="emitValue(field.name, $event)" />
        </slot>
      </div>
    </div>

    <div v-for="(field, key) in groupedFields.hidden" :key="key">
      <slot :field="field" :name="`field-${field.name}`">
        <qas-field v-bind="fieldsProps[field.name]" :field="field" :value="value[field.name]" v-on="fieldsEvents[field.name]" @input="emitValue(field.name, $event)" />
      </slot>
    </div>
  </div>
</template>

<script>
import generatorMixin from '../../mixins/generator'

import QasField from '../field/QasField'

export default {
  components: {
    QasField
  },

  mixins: [generatorMixin],

  props: {
    errors: {
      default: () => ({}),
      type: Object
    },

    fieldsEvents: {
      default: () => ({}),
      type: Object
    },

    fieldsProps: {
      default: () => ({}),
      type: Object
    },

    order: {
      default: () => [],
      type: Array
    },

    value: {
      default: () => ({}),
      required: true,
      type: Object
    }
  },

  computed: {
    groupedFields () {
      const fields = { hidden: {}, visible: {} }

      for (const key in this.fields) {
        const field = this.fields[key]
        fields[field.type === 'hidden' ? 'hidden' : 'visible'][key] = field
      }

      if (this.order.length) {
        const visible = {}

        for (const item of this.order) {
          if (fields.visible[item]) { visible[item] = fields.visible[item] }
        }

        fields.visible = visible
      }

      return fields
    }
  },

  methods: {
    emitValue (key, value) {
      const models = { ...this.value }
      models[key] = value

      this.$emit('input', models)
    }
  }
}
</script>
