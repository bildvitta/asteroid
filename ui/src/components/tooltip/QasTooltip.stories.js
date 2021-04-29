import QasTooltip from './QasTooltip.vue'

export default {
  component: QasTooltip,
  title: 'Components/Tooltip',

  parameters: {
    docs: {
      description: {
        component: 'Creates a warning or message will be shown.'
      }
    }
  },

  argTypes: {
    // Props
    color: {
      description: 'Icon\'s color name.'
    },

    icon: {
      description: 'Icon\'s name.'
    },

    message: {
      description: 'Tooltip\'s message.'
    },

    messageIcon: {
      description: 'Message\'s icon name.'
    },

    messageIconSize: {
      description: 'Message\'s icon size.'
    },

    mobileMessageProps: {
      description: 'Props of $q.notify plugin'
    },

    size: {
      description: 'Tooltip\'s icon size.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasTooltip },
  props: Object.keys(argTypes),
  template: '<qas-tooltip v-bind="$props" message-icon="o_assignment_late" :mobile-message-props="{message: `Mobile notify example!`, icon:`o_assignment_late`}" messageIcon="o_assignment_late" icon="o_assignment_late" message="Message!" />'
})

export const Default = Template.bind({})
