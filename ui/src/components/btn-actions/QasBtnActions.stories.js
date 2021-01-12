import QasBtn from '../btn//QasBtn.vue'
import QasBtnActions from './QasBtnActions.vue'

export default {
  component: QasBtnActions,
  title: 'Components/BtnActions',
  parameters: {
    docs: {
      description: {
        component: 'Handle button with primary and secondary actions (on mobile the order of buttons is changed).'
      }
    }
  },

  argTypes: {
    btnCol: {
      description: 'col classes for both buttons.'
    },

    align: {
      description: 'Alignment of buttons.'
    },

    gutter: {
      description: 'Space among buttons.'
    },

    // slots
    primary: {
      description: 'Primary action button',
      table: {
        type: { summary: null }
      }
    },

    secondary: {
      description: 'secondary action button',
      table: {
        type: { summary: null }
      }
    }
  }
}

const template = (`
<qas-btn-actions>
  <template v-slot:primary>
    <qas-btn label="Confirm" />
  </template>
  <template v-slot:secondary>
    <qas-btn label="Cancel" />
  </template>
</qas-btn-actions>
`)

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasBtnActions, QasBtn },
  template:
    (`
    <qas-btn-actions v-bind="$props">
      <template v-slot:primary>
        <qas-btn label="Confirm" />
      </template>
      <template v-slot:secondary>
        <qas-btn label="Cancel" />
      </template>
    </qas-btn-actions>
    `)
})

export const Default = Template.bind({})

Default.parameters = {
  docs: {
    source: { code: template }
  }
}
