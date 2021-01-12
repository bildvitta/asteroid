import QasBtn from '../btn/QasBtn.vue'
import QasBtnActions from './QasBtnActions.vue'

const noSummary = {
  type: { summary: null }
}

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
      description: 'Actions alignment.'
    },

    btnCol: {
      description: 'Col sizes for actions wrapper.'
    },

    gutter: {
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
  props: Object.keys(argTypes),
  components: { QasBtnActions, QasBtn },
  template:
    `<qas-btn-actions v-bind="$props">${templates}</qas-btn-actions>`
})

export const Default = Template.bind({})

Default.parameters = {
  docs: {
    source: { code: `<qas-btn-actions>${templates}</qas-btn-actions>` }
  }
}
