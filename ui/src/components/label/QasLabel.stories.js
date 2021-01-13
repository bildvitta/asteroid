import QasLabel from './QasLabel.vue'

export default {
  component: QasLabel,
  title: 'Components/Label',
  parameters: {
    docs: {
      description: {
        component: 'Handle label.'
      }
    }
  },

  argTypes: {
    label: {
      description: 'Label to display.'
    },

    quantity: {
      description: 'Number inside parentheses next to the label. Ex: Groups (9).'
    },

    // slots
    default: {
      description: 'Field main content.',
      table: {
        defaultValue: { summary: JSON.stringify({ formattedLabel: 'string' }) },
        type: { summary: null }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasLabel },
  template:
   '<qas-label v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  label: 'My label!'
}

export const Quantity = Template.bind({})
Quantity.args = {
  label: 'My label with quantity',
  quantity: 10
}
