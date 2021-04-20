import QasTip from './QasTip.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasTip,
  title: 'Components/Tip',

  parameters: {
    docs: {
      description: {
        component: 'Creates a section where a warning or message will be shown.'
      }
    }
  },

  argTypes: {
    // Props
    buttonColor: {
      description: 'Color name for tip\'s buttons.'
    },

    color: {
      description: 'Color name for tip\'s background.'
    },

    label: {
      description: 'Tip\'s title.'
    },

    text: {
      description: 'Text that will be displayed on the tip.'
    },

    textColor: {
      description: 'Color name for the content tip.'
    },

    // Slots
    actions: {
      description: 'Tip\'s actions buttons.',
      table: noSummary
    },

    default: {
      description: 'Main content.',
      table: noSummary
    },

    title: {
      description: 'Tip\'s title.',
      table: noSummary
    }

  }
}

const Template = (args, { argTypes }) => ({
  components: { QasTip },
  props: Object.keys(argTypes),
  template: '<qas-tip v-bind="$props" text="Text example" label="Title" />'
})

export const Default = Template.bind({})
