<template>
  <component :is="component.is" v-bind="component.props">
    <div v-for="(fieldsetItem, fieldsetItemKey) in normalizedFields" :key="fieldsetItemKey">
      <!-- <qas-header v-if="hasHeader" v-bind="props.headerProps" /> -->

      <q-separator v-if="hasSeparator(fieldsetItemKey)" class="q-my-md" />

      <qas-header v-if="fieldsetItem.__hasHeader" v-bind="getHeaderProps({ values: fieldsetItem })" />

      <div :class="classes">
        <div v-for="(field, key) in fieldsetItem.fields" :key="key" :class="getContainerClasses({ key })">
          <slot :field="field" :name="`field-${field.name}`">
            <qas-grid-item v-bind="getGridItemProps(field)">
              <template #header>
                <slot :field="field" :name="`header-field-${field.name}`">
                  <slot :field="field" name="header">
                    <div :class="headerClass" :data-cy="`grid-generator-${field.name}-field`" :title="getTitle(field, 'label')">
                      {{ field.label }}
                    </div>
                  </slot>
                </slot>
              </template>

              <template #content>
                <slot :field="field" :name="`content-field-${field.name}`">
                  <slot :field="field" name="content">
                    <div :class="getContentClasses(field)" :data-cy="`grid-generator-${field.name}-result`" :title="getTitle(field, 'formattedResult')">
                      {{ field.formattedResult }}
                    </div>
                  </slot>
                </slot>
              </template>
            </qas-grid-item>
          </slot>
        </div>
      </div>
    </div>
  </component>
</template>

<script setup>
import QasBox from '../box/QasBox.vue'
import QasGridItem from '../grid-item/QasGridItem.vue'
import QasHeader from '../header/QasHeader.vue'

import useGenerator, { baseProps } from '../../composables/private/use-generator'
import { isEmpty, humanize, filterObject } from '../../helpers'
import { useScreen } from '../../composables'
import isObject from 'lodash-es/isObject'
import { computed } from 'vue'

// define component name
defineOptions({ name: 'QasGridGenerator' })

const screen = useScreen()

// props
const props = defineProps({
  ...baseProps,

  boxProps: {
    type: Object,
    default: () => ({})
  },

  contentClass: {
    type: [Array, Object, String],
    default: ''
  },

  fieldset: {
    type: Object,
    default: () => ({})
  },

  fieldsProps: {
    type: Object,
    default: () => ({})
  },

  headerClass: {
    type: [Array, Object, String],
    default: ''
  },

  headerProps: {
    type: Object,
    default: () => ({})
  },

  emptyResultText: {
    type: String,
    default: '-'
  },

  result: {
    type: Object,
    default: () => ({})
  },

  useBox: {
    type: Boolean
  },

  useEmptyResult: {
    type: Boolean,
    default: true
  },

  useEllipsis: {
    type: Boolean,
    default: true
  },

  useInline: {
    type: Boolean
  }
})

// composables
const { classes, getFieldClass } = useGenerator({ props, isGrid: true })

// computeds
const component = computed(() => {
  return {
    is: props.useBox ? QasBox : 'div',
    props: props.useBox ? props.boxProps : {}
  }
})

const headerClass = computed(() => {
  return [
    props.headerClass,

    {
      ellipsis: !screen.isSmall && props.useEllipsis
    }
  ]
})

const normalizedFields = computed(() => {
  /**
   * No caso de não ter "fieldset", virá via props o result e fields.
   */
  if (!hasFieldset.value) {
    return {
      default: {
        fields: getFieldsByResult({ fields: props.fields, result: props.result }),
        headerProps: props.headerProps,
        __hasHeader: Object.keys(props.headerProps).length
      }
    }
  }

  /**
   * No caso de ter "fieldset", deve organizar os fields/result de acordo com o fieldset.
   */
  return getNormalizedFields(props.fieldset)
})

const hasFieldset = computed(() => !!Object.keys(props.fieldset).length)

// functions
function getFieldsByResult ({ fields, result }) {
  const hasFields = Object.keys(fields).length
  const hasResult = Object.keys(result).length

  if (!hasResult || !hasFields) return {}

  const unformattedResult = { ...result }
  const fieldsByResult = {}

  const formattedFields = getFormattedFields({ fields, result, hasResult })

  for (const key in formattedFields) {
    const field = formattedFields[key] || {}

    if (!field.type) continue

    const humanizedResult = humanize(field, unformattedResult[key])
    const formattedResult = isEmpty({ value: humanizedResult }) ? props.emptyResultText : humanizedResult

    fieldsByResult[key] = {
      ...field,
      formattedResult
    }
  }

  return fieldsByResult
}

// TODO: Adicionar no use-generator
function getNormalizedFields (items) {
  const result = {}

  for (const key in items) {
    const item = items[key]

    // Propriedades que são recebidas em cada fieldset / subset desconstruida
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

    console.log(headerProps, '<-- headerProps')

    // Valida caso tenha um subset dentro de um fieldset
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

    // Pegar os fields com base na key.
    const fieldsByfieldsKeys = filterObject(props.fields, fields)

    // Adicionar "formattedResult" com base no result.
    const formattedFields = getFieldsByResult({ fields: fieldsByfieldsKeys, result: props.result })

    // Adiciona o fields no structure
    Object.assign(structure.fields, { ...formattedFields })

    result[key] = structure
  }

  return result
}

function getContainerClasses ({ key }) {
  if (props.useInline) return 'row justify-between col-12'

  return getFieldClass({ index: key, isGridGenerator: true })
}

function getTitle (field, key) {
  return props.useEllipsis ? field[key] : ''
}

function hasEllipsis (field) {
  /**
   * Para campos do tipo "textarea" vamos sempre exibir o conteúdo por completo.
   */
  return (field.type === 'textarea') && !props.useInline ? false : props.useEllipsis
}

function getContentClasses (field) {
  return [
    props.contentClass,

    {
      ellipsis: !screen.isSmall && hasEllipsis(field)
    }
  ]
}

function getGridItemProps (field) {
  return {
    useEllipsis: hasEllipsis(field),
    useInline: props.useInline,

    ...(props.fieldsProps[field.name] || {})
  }
}

/**
 * Retorna os "fields" formatados, caso a propriedade "useEmptyResult" seja "true", retorna todos os "fields", mesmo que não tenha resultado.
 * Caso a propriedade "useEmptyResult" seja "false", retorna apenas os "fields" que possuem resultado.
*/
function getFormattedFields ({ fields, result, hasResult }) {
  if (props.useEmptyResult) return fields

  if (!hasResult) return {}

  const formattedFields = {}

  for (const key in fields) {
    const currentResult = result[key]

    const validate = Array.isArray(currentResult)
      ? currentResult.length
      : isObject(currentResult) ? Object.keys(currentResult).length : result

    if (validate) {
      formattedFields[key] = fields[key]
    }
  }

  return formattedFields
}

function hasSeparator (fieldsetItemKey) {
  const fieldsetKeys = Object.keys(normalizedFields.value)

  console.log(fieldsetKeys, '<-- fieldsetKeys')
  console.log(fieldsetItemKey, '<-- fieldsetItemKey')

  // Terá o separator se conter mais de um item no fieldset, e não for o primeiro.
  return fieldsetKeys.length > 1 && fieldsetKeys[0] !== fieldsetItemKey
}

// TODO: Adicionar no use-generator
function getHeaderProps ({ values, isSubset }) {
  const typography = isSubset ? 'h5' : 'h4'

  // Separa as propriedades de label e o restante.
  const { labelProps, ...headerProps } = values.headerProps || {}

  return {
    description: values.description,

    // Mesmo que passado a tipografia no headerProps, a tipografia é sobreposta para manter a hierarquia sempre.
    labelProps: {
      ...labelProps,
      ...(values.label && { label: values.label }),
      typography
    },

    ...headerProps
  }
}
</script>
