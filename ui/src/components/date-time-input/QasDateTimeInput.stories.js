import QasDateTimeInput from './QasDateTimeInput.vue'

export default {
  component: QasDateTimeInput,
  title: 'Components/DateTimeInput',

  parameters: {
    docs: {
      description: {
        component: 'Field to input or select date and time.'
      }
    }
  },

  argTypes: {
    // Props
    dateMask: {
      description: 'Mask string to parse and format date value.'
    },

    dateOnly: {
      description: 'For date only mode.'
    },

    dateOptions: {
      description: 'Bypass [QDate](https://quasar.dev/vue-components/date) props.'
    },

    timeMask: {
      description: 'Mask string to parse and format time value.'
    },

    timeOnly: {
      description: 'For time only mode.'
    },

    timeOptions: {
      description: 'Bypass [QTime](https://quasar.dev/vue-components/time) props'
    },

    value: {
      description: 'Sets the input value by ISO 8601.'
    },

    // Events
    input: {
      description: 'Fires when the value changes.'
    },

    mounted: {
      description: 'Fires when the component mounts.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasDateTimeInput },
  props: Object.keys(argTypes),
  template:
    '<qas-date-time-input v-bind="$props" />'
})

export const Default = Template.bind({})
