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
    value: {
      description: 'Model value, if prop <strong>emitValue</strong> is present, the value will be an array of string or number, otherwise value will be an array of object.'
    },

    emitValue: {
      description: 'If true set <strong>value</strong> to array of numbers or string, otherwise value will be array of object.'
    },

    fuseOptions: {
      description: 'Options of [fuse.js](https://fusejs.io).',
      table: {
        defaultValue: {
          summary: '{}',
          detail: '{ keys: [\'label\'] }'
        }
      }
    },

    hideEmptySlot: {
      description: 'Hide empty slot from SearchBox.'
    },

    labelKey: {
      description: 'If you pass a list of objects without a <strong>label</strong>, you can define in this prop which key is equivalent to it, e.g. <strong>{ title: \'my title\', value: 1 }</strong>, <strong>labelKey</strong> will be <strong>title</strong>.'
    },

    valueKey: {
      description: 'If you pass a list of objects without a <strong>value</strong>, you can define in this prop which key is equivalent to it, e.g. <strong>{ label: \'my title\', result: 1 }</strong>, <strong>valueKey</strong> will be <strong>result</strong>.'
    },

    options: {
      description: 'List of options to display.'
    },

    label: {
      description: 'Label of first list.'
    },

    // events
    input: {
      description: 'Emitted when the component needs to change the model. Is also used by `v-model`.',
      table: {
        defaultValue: {
          summary: '{}',
          detail: '{ value: \'array\' }'
        }
      }
    },

    // slots
    'item-first-column': {
      description: 'First column slot inside QItem.',
      table: noSummary
    },

    'item-second-column': {
      description: 'Second column slot inside QItem.',
      table: noSummary
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasTransfer },
  data () {
    return {
      model: []
    }
  },
  template:
    `
    <div>
      <qas-transfer v-model="model" v-bind="$props" />
      <div>Value: {{ model }} </div>
    </div>
    `
})

export const Default = Template.bind({})
Default.args = {
  label: 'List of items',
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

Default.parameters = {
  docs: {
    source: { code: '<qas-transfer :options="options" v-model="model" />' }
  }
}
