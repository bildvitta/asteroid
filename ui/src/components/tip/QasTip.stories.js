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
    bgColor: {
      description: 'Color name for tip\'s background.'
    },

    color: {
      description: 'Color name for the content tip.'
    },

    text: {
      description: 'Text that will be displayed on the tip.'
    },

    title: {
      description: 'Tip\'s title.'
    },

    // Slots
    default: {
      description: 'Main content.',
      table: noSummary
    },

    header: {
      description: 'Tip\'s header.',
      table: noSummary
    }

  }
}

const Template = (args, { argTypes }) => ({
  components: { QasTip },
  props: Object.keys(argTypes),
  template: '<qas-tip v-bind="$props" text="Text example" title="Title" />'
})

export const Default = Template.bind({})
