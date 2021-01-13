import QasDecimalInput from './QasDecimalInput.vue'

export default {
  component: QasDecimalInput,
  title: 'Components/DecimalInput',
  parameters: {
    docs: {
      description: {
        component: 'Extends [QInput](https://quasar.dev/vue-components/input), receive <strong>props</strong> and <strong>events</strong> from QInput, component for working with decimal values.'
      }
    }
  },

  argTypes: {
    value: {
      description: 'Model value'
    },

    places: {
      description: 'Number of decimal places.'
    },

    comma: {
      description: 'Separation of decimal places using a comma instead of periods.'
    },

    // events
    input: {
      description: 'Emitted when the component needs to change the model; Is also used by v-model',
      table: {
        defaultValue: { summary: JSON.stringify({ value: 'number' }) }
      }
    },

    mount: {
      table: {
        disable: true
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasDecimalInput },
  data () {
    return {
      model: 0
    }
  },
  template:
    `
    <div>
      <qas-decimal-input v-bind="$props" v-model="model" />
      value: {{ model }}
    </div>
    `
})

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    source: { code: '<qas-decimal-input v-model="model" />' }
  }
}
