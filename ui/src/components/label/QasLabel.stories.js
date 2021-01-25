import QasLabel from './QasLabel.vue'

export default {
  component: QasLabel,
  title: 'Components/Label',

  parameters: {
    docs: {
      description: {
        component: 'Standardizes the display of labels for a form\'s field.'
      }
    }
  },

  argTypes: {
    // Events
    label: {
      description: 'Text to be displayed.'
    },

    quantity: {
      description: 'Number to be displayed after label, inside parentheses. E.g. Groups (9).'
    },

    // Slots
    default: {
      description: 'Main content, will be replace label prop.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ formattedLabel: 'string' }),
          summary: '{}'
        },
        type: { summary: null }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasLabel },
  props: Object.keys(argTypes),

  template:
    '<qas-label v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  label: 'My label!'
}

export const Quantity = Template.bind({})
Quantity.args = {
  label: 'My label, but with quantity!',
  quantity: 10
}
