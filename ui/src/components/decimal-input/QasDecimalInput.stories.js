import QasDecimalInput from './QasDecimalInput.vue'

export default {
  component: QasDecimalInput,
  title: 'Components/DecimalInput',

  parameters: {
    docs: {
      description: {
        component: 'Extends [QInput](https://quasar.dev/vue-components/input), but with decimal mask.'
      }
    }
  },

  argTypes: {
    // Props
    comma: {
      description: 'Use comma instead of period as decimal separator.'
    },

    places: {
      description: 'Number of decimal places.'
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
  components: { QasDecimalInput },
  props: Object.keys(argTypes),

  data () {
    return {
      model: 0
    }
  },

  template:
    `<div>
      <qas-decimal-input v-bind="$props" v-model="model" />
      <pre>{{ model }}</pre>
    </div>`
})

export const Default = Template.bind({})

Default.parameters = {
  docs: {
    source: { code: '<qas-decimal-input v-model="model" />' }
  }
}

export const BrazilianReal = Template.bind({})

BrazilianReal.args = {
  comma: true,
  prefix: 'R$'
}

BrazilianReal.parameters = {
  docs: {
    source: { code: '<qas-decimal-input v-model="model" comma prefix="R$" />' }
  }
}
