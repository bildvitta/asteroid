import QasCopy from './QasCopy.vue'

export default {
  component: QasCopy,
  title: 'Components/Copy',
  parameters: {
    docs: {
      description: {
        component: 'Copy label to clipboard.'
      }
    }
  },

  argTypes: {
    icon: {
      description: 'Icon name following Quasar convention.'
    },

    label: {
      description: 'Text to clipboard.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasCopy },
  template:
   '<qas-copy v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Click here!'
}
