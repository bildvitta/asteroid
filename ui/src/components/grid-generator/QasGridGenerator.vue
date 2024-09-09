<template>
  <component :is="component.is" v-bind="component.props">
    <qas-header v-if="hasHeader" v-bind="props.headerProps" />

    <div :class="classes">
      <div v-for="(field, key) in fieldsByResult" :key="key" :class="getContainerClassses({ key })">
        <slot :field="field" :name="`field-${field.name}`">
          <qas-grid-item :use-ellipsis="hasEllipsis(field)" :use-inline="props.useInline">
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
  </component>
</template>

<script setup>
import useGenerator, { baseProps } from '../../composables/private/use-generator'
import { isEmpty, humanize } from '../../helpers'
import { useScreen } from '../../composables'
import { isObject } from 'lodash-es'
import { ref, computed, watch } from 'vue'

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
    default: '',
    type: [Array, Object, String]
  },

  headerClass: {
    default: '',
    type: [Array, Object, String]
  },

  headerProps: {
    type: Object,
    default: () => ({})
  },

  emptyResultText: {
    default: '-',
    type: String
  },

  result: {
    default: () => ({}),
    type: Object
  },

  useBox: {
    type: Boolean
  },

  useEmptyResult: {
    default: true,
    type: Boolean
  },

  useEllipsis: {
    default: true,
    type: Boolean
  },

  useInline: {
    type: Boolean
  }
})

// composables
const { classes, getFieldClass } = useGenerator({ props })

// computed
const hasResult = computed(() => Object.keys(props.result).length)
const hasFields = computed(() => Object.keys(props.fields).length)
const hasHeader = computed(() => Object.keys(props.headerProps).length)

const component = computed(() => {
  return {
    is: props.useBox ? 'qas-box' : 'div',
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

const fieldsByResult = ref({})

/**
 * Retorna os "fields" formatados, caso a propriedade "useEmptyResult" seja "true", retorna todos os "fields", mesmo que não tenha resultado.
 * Caso a propriedade "useEmptyResult" seja "false", retorna apenas os "fields" que possuem resultado.
*/
const formattedFields = computed(() => {
  if (props.useEmptyResult) return props.fields

  if (!hasResult.value) return {}

  const fields = {}

  for (const key in props.fields) {
    const result = props.result[key]

    const validate = Array.isArray(result)
      ? result.length
      : isObject(result) ? Object.keys(result).length : result

    if (validate) {
      fields[key] = props.fields[key]
    }
  }

  return fields
})

// watch
watch(() => formattedFields.value, setFieldsByResult, { immediate: true })

// methods
function getFieldsByResult () {
  if (!hasResult.value || !hasFields.value) return {}

  const result = { ...props.result }
  const fieldsByResult = {}

  for (const key in formattedFields.value) {
    const field = formattedFields.value[key] || {}

    if (!field.type) continue

    const humanizedResult = humanize(field, result[key])
    const formattedResult = isEmpty({ value: humanizedResult }) ? props.emptyResultText : humanizedResult

    fieldsByResult[key] = {
      ...field,
      formattedResult
    }
  }

  return fieldsByResult
}

function setFieldsByResult () {
  fieldsByResult.value = getFieldsByResult()
}

function getContainerClassses ({ key }) {
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
      ellipsis: !screen.isSmall && this.hasEllipsis(field)
    }
  ]
}
</script>
