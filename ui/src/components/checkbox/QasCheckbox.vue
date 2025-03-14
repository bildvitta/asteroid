<template>
  <div class="qas-checkbox">
    <!-- Single -->
    <q-checkbox v-if="isSingle" v-model="model" v-bind="singleAttributes" dense>
      <slot />
    </q-checkbox>

    <!-- Group -->
    <div v-else>
      <div v-if="hasCheckboxLabel" class="q-mb-sm text-body1" :class="checkboxLabelClasses">
        {{ formattedLabel }}
      </div>

      <div :class="classes">
        <div v-for="(option, index) in props.options" :key="index">
          <!-- Com children -->
          <q-checkbox v-if="hasChildren(option)" :class="getCheckboxClass(option)" dense :indeterminate-value="false" :label="option.label" :model-value="getModelValue(index)" @update:model-value="updateCheckbox($event, option, index)" />

          <!-- Com children -->
          <q-option-group v-if="hasChildren(option)" class="q-ml-xs q-mt-xs" dense :inline="props.inline" :model-value="props.modelValue" :options="option.children" type="checkbox" @update:model-value="updateChildren($event, option, index)" />

          <!-- Sem children -->
          <q-option-group v-else v-model="model" v-bind="attrs" dense :options="[option]" type="checkbox" />
        </div>
      </div>
    </div>

    <div v-if="props.errorMessage" class="q-pt-sm qas-checkbox__error-message text-negative">
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { getRequiredLabel } from '../../helpers'
import { watch, computed, ref, onMounted, useAttrs } from 'vue'

defineOptions({
  name: 'QasCheckbox',
  inheritAttrs: false
})

const props = defineProps({
  label: {
    default: '',
    type: String
  },

  options: {
    default: () => [],
    type: Array
  },

  modelValue: {
    default: () => [],
    type: [Array, String, Number, Boolean, Object]
  },

  inline: {
    default: true,
    type: Boolean
  },

  errorMessage: {
    type: String,
    default: ''
  },

  error: {
    type: Boolean
  },

  required: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()

// refs
const group = ref({})

// lifecycle
onMounted(handleParent)

// computed
const classes = computed(() => props.inline && 'flex q-gutter-x-sm')

const hasCheckboxLabel = computed(() => !!props.label)

const model = computed({
  get () {
    return props.modelValue
  },

  set (value) {
    updateModelValue(value)
  }
})

const isSingle = computed(() => !props.options.length)

const singleAttributes = computed(() => {
  return {
    ...attrs,

    label: props.label
  }
})

const checkboxLabelClasses = computed(() => {
  return { 'text-negative': props.error }
})

const formattedLabel = computed(() => {
  return getRequiredLabel({ label: props.label, required: props.required })
})

// watch
watch(() => props.options, handleParent)

// functions
function handleParent () {
  if (isSingle.value) return

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

  group.value[index] = intersection.length ? (intersection.length === options.length ? true : null) : false
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
  emit('update:modelValue', value)
}

function getCheckboxClass (option) {
  return hasChildren(option) && 'text-weight-bold'
}

function getModelValue (index) {
  return group.value[index]
}
</script>

<style lang="scss">
.qas-checkbox {
  &__error-message {
    // Tamanho da fonte utilizada nos errors no q-field.
    font-size: 11px;
  }
}
</style>
