import QasBtn from '../btn/QasBtn.vue'
import QasBtnActions from './QasBtnActions.vue'

const noSummary = {
  type: { summary: null }
}

// Options
// TODO: Importar de um futuro arquivo constraints.js
const alignOptions = ['start', 'around', 'between', 'center', 'end']
const gutterOptions = ['xs', 'sm', 'md', 'lg', 'xl']

export default {
  component: QasBtnActions,
  title: 'Components/BtnActions',

  parameters: {
    docs: {
      description: {
        component: 'Actions for pages that deals with primary and secondary buttons, like a form or dialog.'
      }
    }
  },

  argTypes: {
    // Props
    align: {
      control: { type: 'select', options: alignOptions },
      description: 'Actions alignment.'
    },

    // TODO: Rever necessidade.
    btnCol: {
      description: 'Col sizes for actions wrapper.'
    },

    gutter: {
      control: { type: 'select', options: gutterOptions },
      description: 'Distance between actions.'
    },

    // Slots
    primary: {
      description: 'Primary action slot.',
      table: noSummary
    },

    secondary: {
      description: 'Secondary action slot.',
      table: noSummary
    }
  }
}

const templates = `
  <template v-slot:primary>
    <qas-btn label="Confirm" />
  </template>
  <template v-slot:secondary>
    <qas-btn color="white" label="Cancel" outline text-color="primary" />
  </template>
`

const Template = (args, { argTypes }) => ({
  components: { QasBtn, QasBtnActions },
  props: Object.keys(argTypes),
  template:
    `<qas-btn-actions v-bind="$props">${templates}</qas-btn-actions>`
})

export const Default = Template.bind({})

Default.parameters = {
  docs: {
    source: { code: `<qas-btn-actions>${templates}</qas-btn-actions>` }
  }
}
