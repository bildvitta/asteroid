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
    entity: {
      description: 'Vuex entity name to be used on lazy loading filter.',
    },
  
    fuseOptions: {
      description: '[Fuse.js](https://fusejs.io/) options.',
      table: {
        defaultValue: { detail: options }
      }
    },

    labelKey: {
      description: 'Key to be used instead of `label`.'
    },

    lazyLoadingProps: {
      description: 'Props to be used on lazy loading.',
      table: {
        defaultValue: { 
          detail: JSON.stringify({
            url: '',
            params: {
              limit: 48
            },
            decamelizeFieldName: true
          })
        }
      }
    },

    name: {
      description: 'Name of the field.'
    },

    options: {
      description: 'Select options.'
    },

    noOptionLabel: {
      description: 'Text for empty result on search.'
    },

    searchable: {
      description: 'option to enable the search field.'
    },

    useLazyLoading: {
      description: 'Option to enable lazy loading.'
    },

    value: {
      description: 'String to filter results.'
    },

    valueKey: {
      description: 'Key to be used instead of `value`.'
    },

    // Events
    input: {
      description: 'Fires when model changes. Also used by `v-model`.'
    },

    'fetch-options-error': {
      description: 'Fires when occur an error fetching the options.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ error: 'object' }),
          summary: '{}'
        }
      }
    },

    'fetch-options-success': {
      description: 'Fires when successfully fetching the options.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ results: 'array' }),
          summary: '{}'
        }
      }
    },

    // Slots
    'after-options': {
      description: 'Template slot for the elements that should be rendered after the list of options.',
      table: {
        category: 'slots',
        ...noSummary
      }
    },

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
      model: ''
    }
  },

  template: '<qas-select v-model="model" v-bind="$props" label="Selecione o item"/>'
})

export const Default = Template.bind({})

Default.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]
}
