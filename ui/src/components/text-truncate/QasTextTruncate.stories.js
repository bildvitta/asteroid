import QasTextTruncate from './QasTextTruncate.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasTextTruncate,
  title: 'Components/TextTruncate',

  parameters: {
    docs: {
      description: {
        component: 'Truncate a text based on parent width.'
      }
    }
  },

  argTypes: {
    dialog: {
      description: 'Events and props of QasDialog component.'
    },

    dialogTitle: {
      description: 'The title that will be show in the dialog.'
    },

    maxWidth: {
      description: 'Width that will be used as a delimiter to truncate the text.'
    },

    seeMoreLabel: {
      description: 'The label that be '
    },

    text: {
      description: 'The text that will be truncate.'
    },

    // Slots

    default: {
      description: 'Main content.',
      table: noSummary
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasTextTruncate },
  props: Object.keys(argTypes),
  template: '<qas-text-truncate dialog-title="Title" v-bind="$props" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " /><template #default>Este <strong>é um texto</strong> que pode começar em negrito.</template></qas-text-truncate>'
})

export const Default = Template.bind({})
