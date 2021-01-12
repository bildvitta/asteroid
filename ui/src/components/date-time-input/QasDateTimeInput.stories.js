import QasDateTimeInput from './QasDateTimeInput.vue'

export default {
  component: QasDateTimeInput,
  title: 'Components/DateTimeInput',
  parameters: {
    docs: {
      description: {
        component: 'Creates a component that provides a method to input date and/or time.'
      }
    }
  },

  argTypes: {
    // Props
    dateMask: {
      description: 'Mask (formatting string) used for parsing and formatting date value.'
    },

    dateOnly: {
      description: 'Shows only date input.'
    },

    dateOptions: {
      description: 'Optionally configure the days that are selectable.'
    },

    timeMask: {
      description: 'Mask (formatting string) used for parsing and formatting time value.'
    },

    timeOnly: {
      description: 'Shows only time input.'
    },

    timeOptions: {
      description: 'Optionally configure the time that are selectable.'
    },

    value: {
      description: 'Sets the input value in ISO 8601.'
    },

    // Events
    input: {
      description: 'Gets the input value.'
    },

    mounted: {
      description: 'Create component.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasDateTimeInput },
  template:
   '<qas-date-time-input v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
}
