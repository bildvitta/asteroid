import QasDialog from './QasDialog.vue'
import QasBtn from '../btn//QasBtn.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasDialog,
  title: 'Components/Dialog',
  parameters: {
    docs: {
      description: {
        component: 'Extends [QDialog](https://quasar.dev/vue-components/dialog#Introduction), receive all props, events and methods from QDialog from quasar.'
      }
    }
  },

  argTypes: {
    value: {
      description: 'model value to show/hide the component.',
      table: {
        defaultValue: { summary: true },
        control: { summary: null }
      }
    },

    card: {
      description: 'Content of [QCard](https://quasar.dev/vue-components/card#Installation), mast have key <strong>title</strong> and <strong>description</strong>'
    },

    maxWidth: {
      description: 'QCard\'s max width.',
      table: {
        defaultValue: { summary: '600px' }
      }
    },

    minWidth: {
      description: 'QCard\'s min width.',
      table: {
        defaultValue: { summary: '400px' }
      }
    },

    ok: {
      description: 'Configuration of btn <strong>ok</strong>, for sending props use key <strong>props</strong> and events use key <strong>events</strong> and for hide this btn pass value <strong>false</strong>',
      table: {
        defaultValue: { summary: { label: 'Ok' } }
      }
    },

    cancel: {
      description: 'Configuration of btn <strong>cancel</strong>, for sending props use key <strong>props</strong> and events use key <strong>events</strong> and for hide this btn pass value <strong>false</strong>',
      table: {
        defaultValue: { summary: { label: 'Cancelar', outline: true } }
      }
    },

    cardProps: {
      description: '$attrs send to <strong>QCard</strong>'
    },

    btnActions: {
      description: '$attrs send to <strong>BtnActions</strong>'
    },

    // slots
    header: {
      description: 'header slot',
      table: noSummary
    },

    description: {
      description: 'description slot',
      table: noSummary
    },

    actions: {
      description: 'actions slot',
      table: noSummary
    },

    // events
    input: {
      description: 'handle model value to show/hide dialog',
      table: {
        defaultValue: { summary: 'boolean' }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasDialog, QasBtn },
  data: () => ({ dialog: false }),
  template:
   (`
    <div>
      <qas-btn label="Open dialog!" @click="dialog = !dialog"/>
      <qas-dialog v-bind="$props" v-model="dialog" />
    </div>
   `)
})

export const Default = Template.bind({})
Default.args = {
  card: {
    title: 'This is a title.',
    description: 'this is an description.'
  },
  ok: {
    props: { label: 'Ok' }
  },
  cancel: {
    props: { label: 'Cancelar', outline: true }
  }
}

const template = '<qas-dialog v-model="dialog" />'

Default.parameters = {
  docs: {
    source: { code: template }
  }
}
