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
        component: 'Extends <strong>SearchBox</strong>. Filter and select items inside a list and return a list of value as an array.'
      }
    }
  },

  argTypes: {
    value: {
      description: 'Model value, it\'s an array of strings or numbers.',
      control: { type: null }
    },

    options: {
      description: 'Must be an array of objects containing label and value.'
    },

    fuseOptions: {
      description: 'Options of [fuse.js](https://fusejs.io).'
    },

    deleteOnly: {
      description: 'Remove options by value model.',
      table: {
        defaultValue: { summary: false }
      }
    },

    to: {
      description: 'Object sended to <strong>$router.push(to)</strong> for each item in list.'
    },

    toIdentifier: {
      description: 'Key to be used as identifier.'
    },

    // events
    input: {
      description: 'Emitted when the component needs to change the model. Is also used by `v-model`.',
      table: {
        defaultValue: { summary: JSON.stringify({ value: 'array' }) }
      }
    },

    // slots
    item: {
      description: 'Slot inside [QItem](https://quasar.dev/vue-components/list-and-list-items#Introduction).',
      defaultValue: 'aaaaa',
      table: {
        ...noSummary,
        defaultValue: { summary: JSON.stringify({ context: 'SelectList' }) }
      }
    },

    'item-section': {
      description: 'Slot encompassing [QItemSection](https://quasar.dev/vue-components/list-and-list-items#QItemSection).',
      table: {
        ...noSummary,
        defaultValue: { summary: JSON.stringify({ result: 'object' }) }
      }
    },

    'item-action': {
      description: 'Slot inside [QItemSection](https://quasar.dev/vue-components/list-and-list-items#QItemSection) encompassing action button.',
      table: {
        ...noSummary,
        defaultValue: { summary: JSON.stringify({ context: 'SelectList' }) }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasSelectList },
  data () {
    return {
      model: []
    }
  },
  template:
    `
    <div>
      <qas-select-list v-model="model" v-bind="$props" />
      value: {{ model }}
    </div>
    `
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

Default.parameters = {
  docs: {
    source: { code: '<qas-select-list :options="options" v-model="model" />' }
  }
}
