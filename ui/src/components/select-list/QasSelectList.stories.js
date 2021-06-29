import QasSelectList from './QasSelectList.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasSelectList,
  title: 'Components/SelectList',

  parameters: {
    docs: {
      description: {
        component: 'Extends `SearchBox`. Filter and select items and return selected items.'
      }
    }
  },

  argTypes: {
    deleteOnly: {
      description: 'Remove options by value model.',
      table: {
        defaultValue: { summary: false }
      }
    },

    fuseOptions: {
      description: '[Fuse.js](https://fusejs.io) options.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ keys: ['label'] }),
          summary: '{}'
        }
      }
    },

    options: {
      description: 'Array of objects containing `label` and `value` each.'
    },

    to: {
      description: 'Object sended to `$router.push(to)` for each item.'
    },

    toIdentifier: {
      description: 'Key to be used as identifier.'
    },

    value: {
      control: { type: null },
      description: 'Array of selected items.'
    },

    // events
    input: {
      description: 'Fires when model changes. Also used by `v-model`.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ value: 'array' }),
          summary: '{}'
        }
      }
    },

    added: {
      description: 'Fires when an item is added to the list.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ item: 'object' }),
          summary: '{}'
        }
      }
    },

    removed: {
      description: 'Fires when removing an item from the list.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ item: 'object', index: 'string' }),
          summary: '{}'
        }
      }
    },

    // Slots
    item: {
      description: '[QItem](https://quasar.dev/vue-components/list-and-list-items) slot.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ context: 'SelectList' }),
          summary: '{}'
        },
        ...noSummary
      }
    },

    'item-action': {
      description: 'Slot inside [QItemSection](https://quasar.dev/vue-components/list-and-list-items#QItemSection) encompassing action button.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ context: 'SelectList' }),
          summary: '{}'
        },
        ...noSummary
      }
    },

    'item-section': {
      description: '[QItemSection](https://quasar.dev/vue-components/list-and-list-items#QItemSection) wrapper slot.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ result: 'object' }),
          summary: '{}'
        },
        ...noSummary
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasSelectList },
  props: Object.keys(argTypes),

  data () {
    return {
      model: []
    }
  },

  template:
    `<div>
      <qas-select-list v-model="model" v-bind="$props" />
      <pre>{{ model }}</pre>
    </div>`
})

export const Default = Template.bind({})
Default.args = {
  fuseOptions: { keys: ['label'] },
  options: [
    { label: 'Item 1', value: 1 },
    { label: 'Item 2', value: 2 },
    { label: 'Item 3', value: 3 },
    { label: 'Item 4', value: 4 },
    { label: 'Item 5', value: 5 },
    { label: 'Item 6', value: 6 },
    { label: 'Item 7', value: 7 },
    { label: 'Item 8', value: 8 },
    { label: 'Item 9', value: 9 },
    { label: 'Item 10', value: 10 }
  ]
}
