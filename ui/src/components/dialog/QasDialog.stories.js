import QasDialog from './QasDialog.vue'
import QasBtn from '../btn/QasBtn.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasDialog,
  title: 'Components/Dialog',

  parameters: {
    docs: {
      description: {
        component: 'Extends [QDialog](https://quasar.dev/vue-components/dialog).'
      }
    }
  },

  argTypes: {
    // Props
    btnActions: {
      description: 'Props of QasBtnActions component.'
    },

    cancel: {
      description: '[QBtn](https://quasar.dev/vue-components/button) props and events for "Cancel" button. Use `props` and `events` keys to configure the component, or use `false` to hide the button.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ props: { label: 'Cancel', outline: true } }),
          summary: '{}'
        }
      }
    },

    card: {
      description: 'Content of [QCard](https://quasar.dev/vue-components/card), mast have key <strong>title</strong> and <strong>description</strong>'
    },

    cardProps: {
      description: 'Props of [QCard](https://quasar.dev/vue-components/card) component.'
    },

    maxWidth: {
      description: 'Max width of QCard.',
      table: {
        defaultValue: { summary: '600px' }
      }
    },

    minWidth: {
      description: 'Min width of QCard.',
      table: {
        defaultValue: { summary: '400px' }
      }
    },

    ok: {
      description: '[QBtn](https://quasar.dev/vue-components/button) props and events for "Ok" button. Use `props` and `events` keys to configure the component, or use `false` to hide the button.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ props: { label: 'Ok' } }),
          summary: '{}'
        }
      }
    },

    persistent: {
      description: 'User cannot dismiss [QDialog](https://quasar.dev/vue-components/dialog) if clicking outside of it or hitting ESC key. Also, an app route change won\'t dismiss it.'
    },

    value: {
      description: 'Model value to toggle the visibility of the dialog.',
      table: {
        control: { summary: null },
        defaultValue: { summary: true }
      }
    },

    useForm: {
      description: 'Generate form and trigger validate based input rules'
    },

    // Events
    input: {
      description: 'Fires when toggles the dialog\'s visibility.'
    },

    // Slots
    actions: {
      description: 'Actions slot.',
      table: noSummary
    },

    description: {
      description: 'Description slot.',
      table: noSummary
    },

    header: {
      description: 'Header slot',
      table: noSummary
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasBtn, QasDialog },
  props: Object.keys(argTypes),

  data () {
    return {
      dialog: false
    }
  },

  template:
    `<div>
      <qas-btn label="Open dialog!" @click="dialog = !dialog"/>
      <qas-dialog v-bind="$props" v-model="dialog" />
    </div>`
})

export const Default = Template.bind({})

Default.args = {
  cancel: {
    props: { label: 'Cancel', outline: true }
  },

  card: {
    description: 'This is a description.',
    title: 'This is a title.'
  },

  ok: {
    props: { label: 'Ok, thanks!' }
  }
}
