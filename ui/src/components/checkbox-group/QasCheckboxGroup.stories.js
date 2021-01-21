import QasCheckboxGroup from './QasCheckboxGroup.vue'

export default {
  component: QasCheckboxGroup,
  title: 'Components/CheckboxGroup',

  parameters: {
    docs: {
      description: {
        component: 'List a collection of checkbox fields, implements [QOptionGroup](https://quasar.dev/vue-components/option-group) and [QCheckbox](https://quasar.dev/vue-components/checkbox).'
      }
    }
  },

  argTypes: {
    // Props
    options: {
      description: 'List of checkbox groups with your children. Each group item has `label` and `children` array, and each checkbox has a `label` and a `value`.'
    },

    value: {
      description: 'An array with all selected checkboxes value.'
    },

    // Events
    input: {
      description: 'Fires when any checkbox changes.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasCheckboxGroup },
  props: Object.keys(argTypes),

  data () {
    return { model: [] }
  },

  template:
    `<div>
      <qas-checkbox-group v-bind="$props" v-model="model" />
      <pre>{{model}}</pre>
    </div>`
})

export const Default = Template.bind({})

Default.args = {
  options: [
    {
      label: 'Checkbox exemple',
      children: [
        { label: 'Children 1', value: 1 },
        { label: 'Children 2', value: 2 }
      ]
    }
  ]
}
