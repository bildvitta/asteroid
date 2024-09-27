<template>
  <div :class="fieldsetClasses">
    <div v-for="(fieldsetItem, fieldsetItemKey) in normalizedFields" :key="fieldsetItemKey" :class="getFieldSetColumnClass(fieldsetItem.column)">
      <component :is="containerComponent.is" v-bind="containerComponent.props">
        <slot v-if="fieldsetItem.__isFieldset" :name="`legend-${fieldsetItemKey}`">
          <qas-header v-bind="getHeaderProps(fieldsetItem)" />
        </slot>

        <div>
          <slot :fields="fieldsetItem.fields?.visible" :name="`legend-section-${fieldsetItemKey}`">
            <div class="items-end justify-end" :class="getRowContainerClasses(fieldsetItem)">
              <div :class="fieldContainerClasses">
                <div v-for="(field, key) in fieldsetItem.fields.visible" :key="key" :class="getFieldClass({ index: key, fields: normalizedFields })">
                  <slot :field="field" :name="`field-${field.name}`">
                    <qas-field :disable="isFieldDisabled(field)" v-bind="props.fieldsProps[field.name]" :error="props.errors[key]" :field="field" :model-value="props.modelValue[field.name]" @update:model-value="updateModelValue({ key: field.name, value: $event })" />
                  </slot>
                </div>
              </div>

              <qas-btn v-if="hasButtonProps(fieldsetItem)" class="md:q-mt-none q-ml-md q-mt-md" v-bind="fieldsetItem.buttonProps" />
            </div>

            <div v-for="(field, key) in fieldsetItem.fields.hidden" :key="key">
              <slot :field="field" :name="`field-${field.name}`">
                <qas-field :disable="isFieldDisabled(field)" v-bind="props.fieldsProps[field.name]" :field="field" :model-value="props.modelValue[field.name]" @update:model-value="updateModelValue({ key: field.name, value: $event })" />
              </slot>
            </div>
          </slot>
        </div>

        <slot v-if="fieldsetItem.__isFieldset" :name="`legend-bottom-${fieldsetItemKey}`" />
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

    fields[fieldsetKey] = {
      label: fieldsetItem.label,
      description: fieldsetItem.description,
      column: fieldsetItem.column,
      buttonProps: fieldsetItem.buttonProps,
      fields: { hidden: {}, visible: {} },
      headerProps: fieldsetItem.headerProps,

      // Indica que existe um fieldset para que o QasHeader possa ser renderizado
      __isFieldset: true
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

// methods
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

function getRowContainerClasses (item) {
  return { row: hasButtonProps(item) }
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
