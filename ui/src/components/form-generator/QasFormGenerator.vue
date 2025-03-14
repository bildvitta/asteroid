<template>
  <div :class="fieldsetClasses">
    <div v-for="(fieldsetItem, fieldsetItemKey) in normalizedFields" :key="fieldsetItemKey" :class="getFieldSetColumnClass(fieldsetItem.column)">
      <component :is="containerComponent.is" v-bind="containerComponent.props">
        <slot v-if="fieldsetItem.__hasFieldset" :name="`legend-${fieldsetItemKey}`">
          <qas-header v-if="fieldsetItem.__hasHeader" v-bind="getHeaderProps(fieldsetItem)" />
        </slot>

        <div>
          <slot :fields="fieldsetItem.fields?.visible" :name="`legend-section-${fieldsetItemKey}`">
            <div class="q-col-gutter-md row">
              <div class="col">
                <div :class="fieldContainerClasses">
                  <div v-for="(field, key) in fieldsetItem.fields.visible" :key="key" :class="getFieldClass({ index: key, fields: normalizedFields })">
                    <slot :field="field" :name="`field-${field.name}`">
                      <qas-field :disable="isFieldDisabled(field)" v-bind="props.fieldsProps[field.name]" :error="props.errors[key]" :field="field" :model-value="props.modelValue[field.name]" @update:model-value="updateModelValue({ key: field.name, value: $event })" />
                    </slot>
                  </div>
                </div>
              </div>

              <div v-if="hasButtonProps(fieldsetItem)" class="col-12 col-sm-auto items-end justify-end row">
                <qas-btn v-bind="fieldsetItem.buttonProps" />
              </div>
            </div>

            <div v-for="(field, key) in fieldsetItem.fields.hidden" :key="key">
              <slot :field="field" :name="`field-${field.name}`">
                <qas-field :disable="isFieldDisabled(field)" v-bind="props.fieldsProps[field.name]" :field="field" :model-value="props.modelValue[field.name]" @update:model-value="updateModelValue({ key: field.name, value: $event })" />
              </slot>
            </div>
          </slot>
        </div>

        <slot v-if="fieldsetItem.__hasFieldset" :name="`legend-bottom-${fieldsetItemKey}`" />
      </component>
    </div>
  </div>
</template>

<script setup>
import { gutterValidator } from '../../helpers/private/gutter-validator'
import useGenerator, { baseProps } from '../../composables/private/use-generator'
import { Spacing } from '../../enums/Spacing'
import { useScreen } from '../../composables'
import { computed, provide, inject } from 'vue'

defineOptions({ name: 'QasFormGenerator' })

const props = defineProps({
  ...baseProps,

  boxProps: {
    default: () => ({}),
    type: Object
  },

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
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])

provide('isFormGenerator', true)

// composables
const { classes, getFieldClass, getFieldSetColumnClass } = useGenerator({ props })

const { fieldsetClasses, hasFieldset } = useFieldset({ props })

const screen = useScreen()

// constants
const hasNestedFormGenerator = inject('isFormGenerator', false)

// computed

/**
 * Se o QasFormGenerator tiver um elemento acima que também é um QasFormGenerator,
 * mesmo que a propriedade useBox seja true, o componente não deve renderizar o box.
 */
const containerComponent = computed(() => {
  const hasBox = props.useBox && !hasNestedFormGenerator

  return {
    is: hasBox ? 'qas-box' : 'div',
    props: {
      ...(hasBox && { ...props.boxProps })
    }
  }
})

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

    const {
      label,
      description,
      column,
      buttonProps,
      headerProps
    } = fieldsetItem

    const hasHeader = !!(label || description || Object.keys(headerProps || {}).length)

    fields[fieldsetKey] = {
      label,
      description,
      column,
      buttonProps,
      fields: { hidden: {}, visible: {} },
      headerProps,

      // Indica que existe um fieldset para que o legend-bottom possa ser renderizado.
      __hasFieldset: true,

      // Indica que existe props para que o header seja renderizado.
      __hasHeader: hasHeader
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

const fieldContainerClasses = computed(() => {
  return [
    ...classes.value,
    {
      col: !screen.isSmall
    }
  ]
})

// functions
function getFieldType ({ type }) {
  return type === 'hidden' ? 'hidden' : 'visible'
}

function getHeaderProps (fieldsetItem) {
  return {
    description: fieldsetItem.description,

    labelProps: {
      ...fieldsetItem.headerProps?.labelProps,
      ...(fieldsetItem.label && { label: fieldsetItem.label })
    },

    ...fieldsetItem.headerProps
  }
}

function isFieldDisabled ({ disable }) {
  return disable || props.disable
}

function updateModelValue ({ key, value }) {
  const models = { ...props.modelValue }
  models[key] = value

  emit('update:modelValue', models)
}

function hasButtonProps ({ buttonProps = {} }) {
  return !!Object.keys(buttonProps).length
}

// composables
function useFieldset ({ props }) {
  const fieldsetClasses = computed(() => {
    const classes = ['row']

    if (props.fieldsetGutter) {
      classes.push(`q-col-gutter-${props.fieldsetGutter}`)
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
