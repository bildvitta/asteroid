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
    btnActions: {
      description: '$attrs send to <strong>BtnActions</strong>'
    },

    cancel: {
      description: 'Configuration of btn <strong>cancel</strong>, for sending props use key <strong>props</strong> and events use key <strong>events</strong> and for hide this btn pass value <strong>false</strong>',
      table: {
        defaultValue: { summary: { label: 'Cancelar', outline: true } }
      }
    },

    card: {
      description: 'Content of [QCard](https://quasar.dev/vue-components/card#Installation), mast have key <strong>title</strong> and <strong>description</strong>'
    },

    cardProps: {
      description: '$attrs send to <strong>QCard</strong>'
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

    value: {
      description: 'model value to show/hide the component.',
      table: {
        control: { summary: null },
        defaultValue: { summary: true }
      }
    },

    // Events
    input: {
      description: 'handle model value to show/hide dialog',
      table: {
        defaultValue: { summary: 'boolean' }
      }
    },

    // Slots
    actions: {
      description: 'actions slot',
      table: noSummary
    },

    description: {
      description: 'description slot',
      table: noSummary
    },

    header: {
      description: 'header slot',
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
    props: { label: 'Cancelar', outline: true }
  },

  card: {
    description: 'this is an description.',
    title: 'This is a title.'
  },

  ok: {
    props: { label: 'Ok' }
  }
}

Default.parameters = {
  docs: {
    source: { code: '<qas-dialog v-model="dialog" />' }
  }
}
