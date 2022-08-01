<template>
  <div :class="fieldsetClasses">
    <div v-for="(fieldsetItem, fieldsetItemKey) in normalizedFields" :key="fieldsetItemKey" class="full-width">
      <slot v-if="fieldsetItem.label" :name="`legend-${fieldsetItemKey}`">
        <qas-label :label="fieldsetItem.label" />
      </slot>

      <div>
        <div :class="mx_classes">
          <div v-for="(field, key) in fieldsetItem.fields.visible" :key="key" :class="mx_getFieldClass(key)">
            <slot :field="field" :name="`field-${field.name}`">
              <qas-field v-bind="fieldsProps[field.name]" :error="errors[key]" :field="field" :model-value="modelValue[field.name]" @update:model-value="updateModelValue(field.name, $event)" />
            </slot>
          </div>
        </div>

        <div v-for="(field, key) in fieldsetItem.fields.hidden" :key="key">
          <slot :field="field" :name="`field-${field.name}`">
            <qas-field v-bind="fieldsProps[field.name]" :field="field" :model-value="modelValue[field.name]" @update:model-value="updateModelValue(field.name, $event)" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import generatorMixin from '../../mixins/generator'
import QasField from '../field/QasField.vue'

export default {
  name: 'QasFormGenerator',

  components: {
    QasField
  },

  mixins: [generatorMixin],

  props: {
    errors: {
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

    modelValue: {
      default: () => ({}),
      required: true,
      type: Object
    },

    fieldset: {
      default: () => ({}),
      type: Object
    },

    fieldsetGutter: {
      default: 'lg',
      type: [String, Boolean],
      validator: value => {
        return typeof value === 'boolean' || ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
      }
    }
  },

  emits: ['update:modelValue'],

  computed: {
    groupedFields () {
      const fields = { hidden: {}, visible: {} }

      if (this.hasFieldset) return fields

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
    },

    normalizedFields () {
      if (!this.hasFieldset) {
        return {
          default: {
            fields: this.groupedFields
          }
        }
      }

      const fields = {}

      for (const fieldsetKey in this.fieldset) {
        const fieldsetItem = this.fieldset[fieldsetKey]

        fields[fieldsetKey] = {
          label: fieldsetItem.label,
          fields: { hidden: {}, visible: {} }
        }

        for (const fieldName of fieldsetItem.fields) {
          const field = this.fields[fieldName]

          Object.assign(
            fields[fieldsetKey].fields[
              field.type === 'hidden' ? 'hidden' : 'visible'
            ],
            {
              [fieldName]: field
            }
          )
        }
      }

      return fields
    },

    hasFieldset () {
      return !!Object.keys(this.fieldset).length
    },

    fieldsetClasses () {
      const classes = ['row']

      if (this.fieldsetGutter) {
        classes.push(`q-col-gutter-${this.fieldsetGutter}`)
      }

      return classes
    }
  },

  methods: {
    updateModelValue (key, value) {
      const models = { ...this.modelValue }
      models[key] = value

      this.$emit('update:modelValue', models)
    }
  }
}
</script>
