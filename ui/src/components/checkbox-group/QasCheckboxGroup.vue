<template>
  <div :class="classes">
    <div v-for="(option, index) in options" :key="index">
      <q-checkbox v-if="hasChildren(option)" :class="getCheckboxClass(option)" :label="option.label" :model-value="getModelValue(index)" @update:model-value="updateCheckbox($event, option, index)" />

      <q-option-group v-if="hasChildren(option)" class="q-ml-sm" :inline="inline" :model-value="modelValue" :options="option.children" type="checkbox" @update:model-value="updateChildren($event, option, index)" />

      <q-option-group v-else v-model="model" v-bind="$attrs" :options="[option]" type="checkbox" />
    </div>
  </div>
</template>

<script setup>
import { watch, computed, ref, onMounted } from 'vue'

defineOptions({ name: 'QasCheckboxGroup' })

const props = defineProps({
  options: {
    default: () => [],
    type: Array
  },

  modelValue: {
    default: () => [],
    type: Array
  },

  inline: {
    default: true,
    type: Boolean
  }
})

const emits = defineEmits(['update:modelValue'])

onMounted(handleParent)

const group = ref({})

const classes = computed(() => props.inline && 'flex q-gutter-x-sm')

const model = computed({
  get () {
    return props.modelValue
  },

  set (value) {
    updateModelValue(value)
  }
})

watch(() => props.options, handleParent)

// functions
function handleParent () {
  for (const index in props.options) {
    const option = props.options[index]
    if (hasChildren(option)) {
      setGroupIntersection(props.modelValue, option, index)
    }
  }
}

function hasChildren (option) {
  return Object.prototype.hasOwnProperty.call(option, 'children')
}

function setGroupIntersection (value, option, index) {
  const options = option.children.map(item => item.value)
  const intersection = options.filter(item => value.includes(item))

  group.value[index] = intersection.length && (intersection.length === options.length ? true : null)
}

function updateCheckbox (value, option, index) {
  group.value[index] = value

  const groupValues = option.children.map(item => item.value)

  const updatedValue = value
    ? [...new Set([...props.modelValue, ...groupValues])]
    : props.modelValue.filter(item => !groupValues.includes(item))

  updateModelValue(updatedValue)
}

function updateChildren (value, option, index) {
  setGroupIntersection(value, option, index)
  updateModelValue(value)
}

function updateModelValue (value) {
  emits('update:modelValue', value)
}

function getCheckboxClass (option) {
  return hasChildren(option) && 'text-weight-bold'
}

function getModelValue (index) {
  return group.value[index]
}

</script>
