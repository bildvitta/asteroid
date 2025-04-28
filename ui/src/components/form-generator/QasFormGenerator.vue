<template>
  <div :class="fieldsetClasses">
    <div v-for="(fieldsetItem, fieldsetItemKey) in normalizedFields" :key="fieldsetItemKey" :class="getFieldSetColumnClass(fieldsetItem.column)">
      <component :is="containerComponent.is" v-bind="containerComponent.props">
        <slot v-if="fieldsetItem.__hasFieldset" :name="`legend-${fieldsetItemKey}`">
          <qas-header v-if="fieldsetItem.__hasHeader" v-bind="getHeaderProps({ values:fieldsetItem })" />
        </slot>

        <div>
          <slot :fields="fieldsetItem.fields?.visible" :name="`legend-section-${fieldsetItemKey}`">
            <div class="q-col-gutter-md row">
              <div class="col">
                <div :class="fieldContainerClasses">
                  <div v-for="(field, key) in getVisibleFields(fieldsetItem)" :key="key" :class="getFieldClass({ index: key, fields: normalizedFields })">
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

            <div v-if="fieldsetItem.__hasSubset" class="column q-col-gutter-y-lg q-mt-none">
              <div v-for="(subsetItem, subsetKey) in fieldsetItem.subset" :key="subsetKey" class="col-12 q-mt-sm">
                <qas-header v-if="subsetItem.__hasHeader" v-bind="getHeaderProps({ values: subsetItem, isSubset: true} )" />

                <div :class="fieldContainerClasses">
                  <div v-for="(field, key) in subsetItem.fields" :key="key" :class="getFieldClass({ index: key, fields: subsetItem.fields })">
                    <slot :field="field" :name="`field-${field.name}`">
                      <qas-field :disable="isFieldDisabled(field)" v-bind="props.fieldsProps[field.name]" :error="props.errors[key]" :field :model-value="props.modelValue[field.name]" @update:model-value="updateModelValue({ key: field.name, value: $event })" />
                    </slot>
                  </div>
                </div>
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

// consts
const hasNestedFormGenerator = inject('isFormGenerator', false)

// computeds
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

  return getNormalizedFields(props.fieldset)
})

/**
 * Função recursiva na qual uso para definir a estrutura de um fieldset e também de um subset (presente dentro do fieldset).
 *
 * @param items {Object} - Objeto contendo a estrutura de um fieldset ou subset
 */
function getNormalizedFields (items) {
  const result = {}

  for (const key in items) {
    const item = items[key]

    // Propriedades que recebo em cada fieldset / subset desconstruida
    const {
      label,
      description,
      headerProps,
      column,
      buttonProps,
      fields = [],
      subset = {}
    } = item

    // Valida caso tenha um header
    const hasHeader = !!(label || description || Object.keys(headerProps || {}).length)

    // Valida caso um subset dentro de um fieldset
    const hasSubset = !!Object.keys(subset).length

    // Estrutura de um fieldset e subset
    const structure = {
      label,
      description,
      column,
      buttonProps,
      headerProps,
      fields: {},
      subset: hasSubset ? getNormalizedFields(subset) : {},

      // Propriedades auxiliares para controle na view
      __hasHeader: hasHeader,
      __hasSubset: hasSubset,
      __hasFieldset: true
    }

    // Loopo as lista de fields (keys) que recebo dentro do fieldset / subset
    fields.forEach(fieldKey => {
      // Encontro dentro da prop fields o field correspondente a key
      const field = props.fields[fieldKey]

      if (!field) return

      // Adiciono o field ao fields da estrutura
      Object.assign(structure.fields, { [fieldKey]: field })
    })

    result[key] = structure
  }

  return result
}

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

function getHeaderProps ({ values, isSubset = false }) {
  const typography = isSubset ? 'h5' : 'h4'

  // Separa as propriedades de label e o restante.
  const { labelProps, ...othersHeaderProps } = values.headerProps || {}

  return {
    description: values.description,

    // Mesmo que passado a tipografia no headerProps, sobreponho para manter a hierarquia sempre
    labelProps: {
      ...labelProps,
      ...(values.label && { label: values.label }),
      typography
    },

    ...othersHeaderProps
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

/**
 * Caso não definimos um fieldset, os fields são separados entre "visible" e "hidden"
 */
function getVisibleFields (fieldsetItem) {
  return fieldsetItem.__hasFieldset ? fieldsetItem.fields : fieldsetItem.fields?.visible
}
</script>
