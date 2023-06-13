<template>
  <div :class="classes">
    <div v-for="(field, key) in fieldsByResult" :key="key" :class="getFieldClass(key, true)">
      <slot :field="field" :name="`field-${field.name}`">
        <slot :field="field" name="header">
          <header :class="headerClass" :data-cy="`grid-generator-${field.name}-field`">
            {{ field.label }}
          </header>
        </slot>

        <slot :field="field" name="content">
          <div :class="contentClass" :data-cy="`grid-generator-${field.name}-result`">
            {{ field.formattedResult }}
          </div>
        </slot>
      </slot>
    </div>
  </div>
</template>

<script setup>
import useGenerator, { baseProps } from '../../composables/private/use-generator'
import { humanize } from '../../helpers/filters'
import { isObject } from 'lodash-es'
import { ref, computed, watch } from 'vue'

// name
defineOptions({ name: 'QasGridGenerator' })

// props
const props = defineProps({
  ...baseProps,

  contentClass: {
    default: '',
    type: [Array, Object, String]
  },

  headerClass: {
    default: 'text-bold',
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
  }
})

// composables
const { classes, getFieldClass } = useGenerator({ props })

// computed
const hasResult = computed(() => Object.keys(props.result).length)
const hasFields = computed(() => Object.keys(props.fields).length)

const fieldsByResult = ref({})

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

  for (const key in result) {
    const field = formattedFields.value[key] || {}

    if (!field.type) continue

    fieldsByResult[key] = {
      ...field,
      formattedResult: humanize(field, result[key]) || props.emptyResultText
    }
  }

  return fieldsByResult
}

function setFieldsByResult () {
  fieldsByResult.value = getFieldsByResult()
}
</script>
