<template>
  <div>
    <div v-for="(option, index) in options" :key="index" v-test:checkbox-group>
      <q-checkbox v-test:checkbox-group-checkbox :class="hasChildren(option) ? titleClass : []" :label="option.label" :value="hasChildren(option) ? group[index] : option.value" @input="updateCheckbox($event, option, index)" />
      <q-option-group v-if="hasChildren(option)" class="q-ml-sm" inline :options="option.children" type="checkbox" :value="value" @input="updateChildren($event, option, index)" />
    </div>
  </div>
</template>

<script>
import test from '../../directives/Test'

export default {
  directives: {
    test
  },

  props: {
    options: {
      default: () => [],
      type: Array
    },

    value: {
      default: () => [],
      type: Array
    }
  },

  data () {
    return {
      group: {}
    }
  },

  computed: {
    titleClass () {
      return ['text-weight-bold']
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
          this.setGroupIntersection(this.value, option, index)
        }
      }
    },

    hasChildren (option) {
      return Object.prototype.hasOwnProperty.call(option, 'children')
    },

    setGroupIntersection (value, option, index) {
      const options = option.children.map(item => item.value)
      const intersection = options.filter(item => value.includes(item))
      this.$set(this.group, index, intersection.length ? (intersection.length === options.length ? true : null) : false)
    },

    updateCheckbox (value, option, index) {
      if (!this.hasChildren(option)) {
        // Arrumar
        return this.$emit('input', this.value)
      }
      this.$set(this.group, index, value)
      const groupValues = option.children.map(item => item.value)
      const updatedValue = value
        ? [...this.value, ...groupValues]
        : this.value.filter(item => !groupValues.includes(item))
      this.$emit('input', updatedValue)
    },

    updateChildren (value, option, index) {
      this.setGroupIntersection(value, option, index)
      this.$emit('input', value)
    }
  }
}
</script>
