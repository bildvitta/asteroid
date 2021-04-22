import QasTextTruncate from './QasTextTruncate.vue'

export default {
  component: QasTextTruncate,
  title: 'Components/TextTruncate',

  parameters: {
    docs: {
      description: {
        component: 'Truncate a text depending that parent div width.'
      }
    }
  },

  argTypes: {
    dialogTitle: {
      description: '.'
    },

    text: {
      description: '.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasTextTruncate },
  props: Object.keys(argTypes),
  template: '<qas-text-truncate v-bind="$props" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " />'
})

export const Default = Template.bind({})
