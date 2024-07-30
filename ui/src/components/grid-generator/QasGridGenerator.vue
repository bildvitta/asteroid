<template>
  <div :class="classes">
    <div v-for="(field, key) in fieldsByResult" :key="key" :class="getContainerClass({ key })">
      <slot :field="field" :name="`field-${field.name}`">
        <slot :field="field" name="header">
          <header :class="headerClass" :data-cy="`grid-generator-${field.name}-field`" :title="getTitle(field, 'label')">
            {{ field.label }}
          </header>
        </slot>

        <slot :field="field" name="content">
          <div :class="contentClass" :data-cy="`grid-generator-${field.name}-result`" :title="getTitle(field, 'formattedResult')">
            {{ field.formattedResult }}
          </div>
        </slot>
      </slot>
    </div>
  </div>
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

  contentClass: {
    default: '',
    type: [Array, Object, String]
  },

  headerClass: {
    default: '',
    type: [Array, Object, String]
  },

  emptyResultText: {
    default: '-',
    type: String
  },

  result: {
    default: () => ({}),
    type: Object
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
const { classes: useGeneratorClasses, getFieldClass } = useGenerator({ props })

// computed
const hasResult = computed(() => Object.keys(props.result).length)
const hasFields = computed(() => Object.keys(props.fields).length)

const contentClass = computed(() => {
  return [
    props.contentClass,

    {
      ellipsis: !screen.isSmall && props.useEllipsis
    }
  ]
})

const headerClass = computed(() => {
  return [
    props.headerClass,

    {
      ellipsis: !screen.isSmall && props.useEllipsis,
      'text-bold': screen.isSmall || !props.useInline
    }
  ]
})

const classes = computed(() => {
  if (props.useInline) return 'row q-col-gutter-md'

  return useGeneratorClasses.value
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

function getContainerClass ({ key }) {
  if (props.useInline) {
    return `row justify-between col-12 q-col-gutter-x-${props.gutter}`
  }

  return getFieldClass({ index: key, isGridGenerator: true })
}

function getTitle (field, key) {
  return props.useEllipsis ? field[key] : ''
}
</script>
