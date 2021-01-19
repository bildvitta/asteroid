import QasCheckboxGroup from './QasCheckboxGroup.vue'

const descriptionOption = `List of objects with <strong> label </strong> keys (checkbox label) and <strong>
                           value </strong> keys (Checkbox value).<br>Accepts Option Tree Creation using the
                           <strong>children</strong> key, which must contain an object with a similar structure.`

export default {
  title: 'Components/Checkbox Group',
  component: QasCheckboxGroup,
  parameters: {
    docs: {
      description: {
        component: 'Component to list a collection of checkbox type fields, implements [QOptionGroup](https://quasar.dev/vue-components/option-group) and [QCheckbox](https://quasar.dev/vue-components/checkbox).'
      }
    }
  },

  argTypes: {
    options: {
      description: descriptionOption
    },

    value: {
      description: 'Value receives the value of the checkbox state.',
      control: {
        type: null
      }
    },

    // events
    input: {
      description: 'Issues the input event by passing value, updating the checkbox state.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasCheckboxGroup },
  template:
    '<qas-checkbox-group v-bind="$props" v-model="value" />'
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

const defaultCode = '<qas-checkbox-group v-model="value" :options="options" />'

Default.parameters = {
  docs: {
    source: {
      code: defaultCode
    }
  }
}
