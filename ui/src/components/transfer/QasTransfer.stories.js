import QasTransfer from './QasTransfer.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasTransfer,
  title: 'Components/Transfer',

  parameters: {
    docs: {
      description: {
        component: 'Transfer items between two lists.'
      }
    }
  },

  argTypes: {
    // Props
    emitValue: {
      description: 'When `true`, transform `value` into an array of selected items key, instead of object.'
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

    hideEmptySlot: {
      description: 'Hides empty slot.'
    },

    label: {
      description: 'From list label.'
    },

    labelKey: {
      description: 'Key to be used instead of `label`.'
    },

    options: {
      description: 'Options to be transfered.'
    },

    value: {
      description: 'Selected items. See `emitValue` prop to use keys instead of objects.'
    },

    valueKey: {
      description: 'Key to be used instead of `value`.'
    },

    // Events
    input: {
      description: 'Fires when model changes. Also used by `v-model`.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ value: 'array' }),
          summary: '{}'
        }
      }
    },

    // Slots
    // TODO: Renomear para "from-list-item" e "to-list-item".
    'item-first-column': {
      description: 'From list slot, inside of `QItem`.',
      table: noSummary
    },

    'item-second-column': {
      description: 'To list slot, inside of `QItem`.',
      table: noSummary
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasTransfer },
  props: Object.keys(argTypes),

  data () {
    return {
      model: []
    }
  },

  template:
    `<div>
      <qas-transfer v-model="model" v-bind="$props" />
      <pre>{{ model }}</pre>
    </div>`
})

export const Default = Template.bind({})

Default.args = {
  fuseOptions: { keys: ['label'] },
  label: 'List of items',
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
