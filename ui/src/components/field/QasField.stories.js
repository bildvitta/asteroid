import QasField from './QasField.vue'

export default {
  component: QasField,
  title: 'Components/Field',

  parameters: {
    docs: {
      description: {
        component: 'Creates a top-level drawer menu from an array of items.'
      }
    }
  },

  argTypes: {
    // Props
    error: {
      description: 'Receives the error messages.'
    },

    field: {
      description: 'Receives the API information for input field.'
    },

    // Events
    input: {
      description: 'Fires when opening or closing the drawer menu.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasField },
  props: Object.keys(argTypes),
  template: '<qas-field v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  field: { name: 'customer.document', label: 'CPF', default: '', type: 'text', read_only: false }
}
