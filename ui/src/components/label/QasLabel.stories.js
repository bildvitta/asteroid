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
      description: 'Label to show.'
    },

    quantity: {
      description: 'Number inside parentheses next to the label. Ex: Groups (9)'
    },

    // formattedLabel: {
    //   table: {
    //     category: 'Slots',
    //     subcategory: 'default'
    //   }
    // },

    default: {
      description: 'default slot.'
    },

    formattedLabel: {
      description: 'default slot.',
      table: {
        category: 'Scoped Slots',
        subcategory: 'default',
        type: { summary: 'string' }
      }
    },

    test: {
      description: 'default slot.',
      table: {
        category: 'Scoped Slots',
        subcategory: 'default',
        type: { summary: 'string' }
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
