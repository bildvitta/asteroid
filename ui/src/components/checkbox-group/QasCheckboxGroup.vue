<template>
  <div :class="classes">
    <div v-for="(option, index) in options" :key="index">
      <q-checkbox v-if="hasChildren(option)" :class="getCheckboxClass(option)" dense :label="option.label" :model-value="getModelValue(index)" @update:model-value="updateCheckbox($event, option, index)" />

      <q-option-group v-if="hasChildren(option)" class="q-ml-sm" dense :inline="inline" :model-value="modelValue" :options="option.children" type="checkbox" @update:model-value="updateChildren($event, option, index)" />

      <q-option-group v-else v-model="model" dense v-bind="$attrs" :options="[option]" type="checkbox" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'QasCheckboxGroup',

  props: {
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
  },

  emits: ['update:modelValue'],

  data () {
    return {
      group: {}
    }
  },

  computed: {
    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.$emit('update:modelValue', value)
      }
    },

    classes () {
      return [
        'q-gutter-x-md',
        {
          'flex q-gutter-y-sm': this.inline
        }
      ]
    }
  },

  watch: {
    options () {
      this.handleParent()
    }
  },

  created () {
    this.handleParent()
  },

  methods: {
    handleParent () {
      for (const index in this.options) {
        const option = this.options[index]
        if (this.hasChildren(option)) {
          this.setGroupIntersection(this.modelValue, option, index)
        }
      }
    },

    hasChildren (option) {
      return Object.prototype.hasOwnProperty.call(option, 'children')
    },

    setGroupIntersection (value, option, index) {
      const options = option.children.map(item => item.value)
      const intersection = options.filter(item => value.includes(item))

      this.group[index] = intersection.length && (intersection.length === options.length ? true : null)
    },

    updateCheckbox (value, option, index) {
      this.group[index] = value
      const groupValues = option.children.map(item => item.value)

      const updatedValue = value
        ? [...new Set([...this.modelValue, ...groupValues])]
        : this.modelValue.filter(item => !groupValues.includes(item))

      this.updateModelValue(updatedValue)
    },

    updateChildren (value, option, index) {
      this.setGroupIntersection(value, option, index)
      this.updateModelValue(value)
    },

    getCheckboxClass (option) {
      return this.hasChildren(option) && 'text-weight-bold q-mb-sm'
    },

    getModelValue (index) {
      return this.group[index]
    },

    updateModelValue (value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
