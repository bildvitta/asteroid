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
    dialog: {
      description: 'The object with dialog\'s properties.'
    },

    dialogTitle: {
      description: 'The title that will be show in the dialog.'
    },

    maxWidth: {
      description: 'Width that will be used as a delimiter to create the truncate.'
    },

    text: {
      description: 'The text that will be show in the dialog.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasTextTruncate },
  props: Object.keys(argTypes),
  template: '<qas-text-truncate v-bind="$props" dialog-title="Title example" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " />'
})

export const Default = Template.bind({})
