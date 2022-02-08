<template>
  <div>
    <div v-for="(option, index) in options" :key="index">
      <q-checkbox :class="getCheckboxClass(option)" :label="option.label" :model-value="getModelValue(option, index)" @update:model-value="updateCheckbox($event, option, index)" />
      <q-option-group v-if="hasChildren(option)" class="q-ml-sm" inline :model-value="modelValue" :options="option.children" type="checkbox" @update:model-value="updateChildren($event, option, index)" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      default: () => [],
      type: Array
    },

    modelValue: {
      default: () => [],
      type: Array
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      group: {}
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

      this.group[index] = intersection.length ? (intersection.length === options.length ? true : null) : false
    },

    updateCheckbox (value, option, index) {
      if (!this.hasChildren(option)) {
        // Arrumar
        return this.updateModelValue(this.modelValue)
      }

      this.group[index] = value
      const groupValues = option.children.map(item => item.value)

      const updatedValue = value
        ? [...this.modelValue, ...groupValues]
        : this.modelValue.filter(item => !groupValues.includes(item))

      this.updateModelValue(updatedValue)
    },

    updateChildren (value, option, index) {
      this.setGroupIntersection(value, option, index)
      this.updateModelValue(value)
    },

    getCheckboxClass (option) {
      return this.hasChildren(option) && 'text-weight-bold'
    },

    getModelValue (option, index) {
      return this.hasChildren(option) ? this.group[index] : option.value
    },

    updateModelValue (value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
