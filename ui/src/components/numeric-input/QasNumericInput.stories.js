import QasNumericInput from './QasNumericInput.vue'

export default {
  component: QasNumericInput,
  title: 'Components/NumericInput',

  parameters: {
    docs: {
      description: {
        component: 'Extends [QInput](https://quasar.dev/vue-components/input) with [AutoNumeric](http://autonumeric.org/) plugin.'
      }
    }
  },

  argTypes: {
    // Props
    allowNegative: {
      description: 'Allow negative values.'
    },

    allowPositive: {
      description: 'Allow positive values.'
    },

    autonumericProps: {
      description: '(Autonumeric)[http://autonumeric.org/guide] options.'
    },

    decimalPlaces: {
      description: 'Decimal places.'
    },

    mode: {
      description: 'Component mode like integer, decimal, percent, and money.'
    },

    preset: {
      description: 'Property to configure default nationality of currency.'
    },

    value: {
      description: 'Model value.'
    },

    // Events
    input: {
      description: 'Emitted when the component needs to change the model. Is also used by `v-model`.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ value: 'number' }),
          summary: '{}'
        }
      }
    },

    mount: {
      table: { disable: true }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasNumericInput },
  props: Object.keys(argTypes),

  data () {
    return {
      model: 0
    }
  },

  template:
    `<div>
      <qas-numeric-input v-bind="$props" v-model="model" />
      <pre>{{ model }}</pre>
    </div>`
})

export const Default = Template.bind({})

Default.parameters = {
  docs: {
    source: { code: '<qas-numeric-input v-model="model" />' }
  }
}

export const BrazilianReal = Template.bind({})

BrazilianReal.args = {
}

BrazilianReal.parameters = {
  docs: {
    source: { code: '<qas-numeric-input v-model="model" />' }
  }
}
