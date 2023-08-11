<template>
  <div :class="fieldsetClasses">
    <div v-for="(fieldsetItem, fieldsetItemKey) in normalizedFields" :key="fieldsetItemKey" class="full-width">
      <component :is="formContainerComponent" v-bind="formContainerProps">
        <slot v-if="fieldsetItem.label" :name="`legend-${fieldsetItemKey}`">
          <qas-label :label="fieldsetItem.label" />
        </slot>

        <div>
          <div :class="classes">
            <div v-for="(field, key) in fieldsetItem.fields.visible" :key="key" :class="getFieldClass({ index: key, fields: normalizedFields })">
              <slot :field="field" :name="`field-${field.name}`">
                <qas-field :disable="isFieldDisabled(field)" v-bind="fieldsProps[field.name]" :error="errors[key]" :field="field" :model-value="modelValue[field.name]" @update:model-value="updateModelValue({ key: field.name, value: $event })" />
              </slot>
            </div>
          </div>

          <div v-for="(field, key) in fieldsetItem.fields.hidden" :key="key">
            <slot :field="field" :name="`field-${field.name}`">
              <qas-field :disable="isFieldDisabled(field)" v-bind="fieldsProps[field.name]" :field="field" :model-value="modelValue[field.name]" @update:model-value="updateModelValue({ key: field.name, value: $event })" />
            </slot>
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<script setup>
import useGenerator, { baseProps, gutterValidator } from '../../composables/private/use-generator'
import { Spacing } from '../../enums/Spacing'
import { computed } from 'vue'

defineOptions({ name: 'QasFormGenerator' })

const props = defineProps({
  ...baseProps,

  disable: {
    type: Boolean
  },

  errors: {
    default: () => ({}),
    type: Object
  },

  fieldset: {
    default: () => ({}),
    type: Object
  },

  fieldsetGutter: {
    default: Spacing.Lg,
    type: [String, Boolean],
    validator: gutterValidator
  },

  fieldsProps: {
    default: () => ({}),
    type: Object
  },

  modelValue: {
    default: () => ({}),
    required: true,
    type: Object
  },

  order: {
    default: () => [],
    type: Array
  },

  useBox: {
    default: true,
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])

// composables
const { classes, getFieldClass } = useGenerator({ props })

const { fieldsetClasses, hasFieldset } = useFieldset({ props })

// computed
const groupedFields = computed(() => {
  const fields = { hidden: {}, visible: {} }

  if (hasFieldset.value) return fields

  for (const key in props.fields) {
    const field = props.fields[key]

    const fieldType = getFieldType(field)

    fields[fieldType][key] = field
  }

  if (props.order.length) {
    const visible = {}

    props.order.forEach(orderItem => {
      if (fields.visible[orderItem]) {
        visible[orderItem] = fields.visible[orderItem]
      }
    })

    fields.visible = visible
  }

  return fields
})

const normalizedFields = computed(() => {
  if (!hasFieldset.value) {
    return {
      default: {
        fields: groupedFields.value
      }
    }
  }

  const fields = {}

  for (const fieldsetKey in props.fieldset) {
    const fieldsetItem = props.fieldset[fieldsetKey]

    fields[fieldsetKey] = {
      label: fieldsetItem.label,
      fields: { hidden: {}, visible: {} }
    }

    fieldsetItem.fields.forEach(fieldName => {
      const field = props.fields[fieldName]

      if (!field) return

      const fieldType = getFieldType(field)

      Object.assign(fields[fieldsetKey].fields[fieldType], {
        [fieldName]: field
      })
    })
  }

  return fields
})

const formContainerComponent = computed(() => props.useBox ? 'qas-box' : 'div')
const formContainerProps = computed(() => props.useBox ? { class: 'q-px-lg q-pt-md q-pb-lg' } : {})

// methods
function getFieldType ({ type }) {
  return type === 'hidden' ? 'hidden' : 'visible'
}

function isFieldDisabled ({ disable }) {
  return disable || props.disable
}

function updateModelValue ({ key, value }) {
  const models = { ...props.modelValue }
  models[key] = value

  emit('update:modelValue', models)
}

// composables
function useFieldset ({ props }) {
  const fieldsetClasses = computed(() => {
    const classes = ['row']

    if (props.fieldsetGutter) {
      classes.push(`q-col-gutter-y-${props.fieldsetGutter}`)
    }

    return classes
  })

  const hasFieldset = computed(() => !!Object.keys(props.fieldset).length)

  return {
    fieldsetClasses,
    hasFieldset
  }
}
</script>
