import QasSelect from './QasSelect.vue'

const noSummary = {
  type: { summary: null }
}

const options = JSON.stringify({
  distance: 100,
  includeScore: true,
  keys: ['label', 'value'],
  location: 0,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold: 0.1,
  tokenize: true
})

export default {
  component: QasSelect,
  title: 'Components/Select',

  parameters: {
    docs: {
      description: {
        component: 'Filter options by text. Uses [Fuse.js](https://fusejs.io/) and extends [QSelect](https://quasar.dev/vue-components/select).'
      }
    }
  },

  argTypes: {
    // Props
    fuseOptions: {
      description: '[Fuse.js](https://fusejs.io/) options.',
      table: {
        defaultValue: { detail: options }
      }
    },

    labelKey: {
      description: 'Key to be used instead of `label`.'
    },

    options: {
      description: 'Select options.'
    },

    noOptionLabel: {
      description: 'Text for when there are no results for the search.'
    },

    value: {
      description: 'String to filter results.'
    },

    valueKey: {
      description: 'Key to be used instead of `value`.'
    },

    searchable: {
      description: 'option to enable the search field.'
    },

    // Events
    input: {
      description: 'Fires when model changes. Also used by `v-model`.'
    },

    // Slots
    append: {
      description: 'Attach to the inner field.',
      table: {
        category: 'slots',
        ...noSummary
      }
    },

    'no-option': {
      description: 'Customize display when there is no options to show. By default, the results box does not appear.',
      table: {
        category: 'slots',
        ...noSummary
      }
    },

    option: {
      description: 'Replace an option defaults.',
      table: noSummary
    }
  }
}

const Template = ({ options }, { argTypes }) => ({
  components: { QasSelect },
  props: Object.keys(argTypes),

  data () {
    return {
      valueOption: ''
    }
  },

  template: '<qas-select v-model="valueOption" :options="options" label="Select" />'
})

export const Default = Template.bind({})

Default.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]
}
