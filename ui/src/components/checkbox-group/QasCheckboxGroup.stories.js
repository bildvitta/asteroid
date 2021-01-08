import QasCheckboxGroup from './QasCheckboxGroup.vue'

export default {
  title: 'Components/Checkbox Group',
  component: QasCheckboxGroup,
  parameters: {
    docs: {
      description: {
        component: 'Component to list a collection of checkbox type fields, implements <a href="https://quasar.dev/vue-components/option-group">QOptionGroup</a> and <a href="https://quasar.dev/vue-components/checkbox">QCheckbox.</a>'
      } 
    }
  },

  argTypes: {
    options: {
      description: 'List of objects with <strong> label </strong> keys (checkbox label) and <strong> value </strong> keys (Checkbox value). <br>'
                 + 'Accepts Option Tree Creation using the <strong> children </strong> key, which must contain an object with a similar structure.'
    },

    value: {
      table: {
        disable: true
      }
    },

    input: {
      table: {
        disable: true
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasCheckboxGroup },
  template:
    `<qas-checkbox-group v-bind="$props" />` 
})

export const Default = Template.bind({})
Default.args = {
  options: [
    {
      label: 'Checkbox exemple', value: 1,
      children: [
        { label: 'Children 1', value: 1 },
        { label: 'Children 2', value: 2 }
      ]
    }
  ]
}