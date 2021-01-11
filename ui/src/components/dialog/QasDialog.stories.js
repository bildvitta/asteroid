import QasDialog from './QasDialog.vue'
import QasBtn from '../btn//QasBtn.vue'

export default {
  component: QasDialog,
  title: 'Components/Dialog',
  parameters: {
    docs: {
      description: {
        component: 'Extends [Dialog](https://quasar.dev/vue-components/dialog#Introduction), receive all props, events and methods from QDialog from quasar.'
      }
    }
  },

  argTypes: {
    value: {
      description: 'model value to show/hide the component.'
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
      description: '$attrs send to <strong>QasBtnActions</strong>'
    }

    // dialog: {
    //   table: {
    //     disable: true
    //   }
    // }
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
  label: 'Click here!',
  card: {
    title: 'This is a title.',
    description: 'this is an description.'
  },
  ok: {
    props: { label: 'Ok' },
    events: undefined
  },
  cancel: {
    props: { label: 'Cancelar', outline: true },
    events: undefined
  }
  // dialog: false
}

const template = '<qas-dialog v-model="dialog" />'

Default.parameters = {
  docs: {
    source: { code: template }
  }
}
