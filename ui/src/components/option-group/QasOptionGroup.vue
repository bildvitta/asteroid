<template>
  <q-option-group v-model="model" :options="options" v-bind="attributes">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-option-group>
</template>

<script>
export default {
  name: 'QasOptionGroup',

  inheritAttrs: false,

  props: {
    options: {
      default: () => [],
      type: Array
    },

    type: {
      type: String,
      default: 'radio',
      validator: value => ['radio', 'checkbox', 'toggle'].includes(value)
    },

    modelValue: {
      default: '',
      type: [String, Number, Array, Boolean]
    }
  },

  emits: ['update:modelValue'],

  computed: {
    attributes () {
      return {
        inline: !this.$qas.screen.isSmall,
        ...this.$attrs
      }
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>
