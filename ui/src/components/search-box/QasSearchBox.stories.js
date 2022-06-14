import QasSearchBox from './QasSearchBox.vue'

const noSummary = {
  type: { summary: null }
}

const options = JSON.stringify({
  distance: 100,
  location: 0,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold: 0.1,
  tokenize: true
})

export default {
  component: QasSearchBox,
  title: 'Components/SearchBox',

  parameters: {
    docs: {
      description: {
        component: 'Filters items in the provided list.<br />Search algorithm powered by [Fuse.js](https://fusejs.io).'
      }
    }
  },

  argTypes: {
    // Props
    emptyListHeight: {
      description: 'List height when there is no results.'
    },

    emptyResultText: {
      description: 'Text for empty result on search.'
    },

    entity: {
      description: 'Vuex entity name to be used on lazy loading filter.'
    },

    fuseOptions: {
      description: '[Fuse.js options](https://fusejs.io/api/options.html)',
      table: {
        defaultValue: { detail: options }
      }
    },

    height: {
      description: 'List height (without search field).'
    },

    hideEmptySlot: {
      description: 'Hides empty slot.'
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

    list: {
      description: 'Array of objects with `label` and `value` each, to be searched.'
    },

    placeholder: {
      description: 'Display temporary message when search field in empty.'
    },

    useLazyLoading: {
      description: 'Option to enable lazy loading.'
    },

    value: {
      description: 'Search field value.'
    },

    // Events
    emptyResult: {
      description: 'Fires when there is no results.',
      table: noSummary
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

    fetching: {
      description: 'Fires when fetching the options.',
    },

    input: {
      description: 'Fires when the result changes.',
      table: noSummary
    },

    // Slots
    default: {
      description: 'To format results. Receives the filtered list.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ results: 'array' }),
          summary: '{}'
        },
        ...noSummary
      }
    },

    empty: {
      description: 'To be displayed when there is no results.',
      table: noSummary
    },

    loading: {
      description: 'To be displayed when lazy loading is in progress.',
      table: noSummary
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasSearchBox },
  props: Object.keys(argTypes),
  template:
    `<qas-search-box v-bind="$props" > 
      <template v-slot="{ results }">
        <pre>{{ results }}</pre>
      </template>
    </qas-search-box>`
})

export const Default = Template.bind({})
// TODO: Inserir um mock maior e criar exemplos mais visuais.
Default.args = {
  fuseOptions: { keys: ['label'] },
  list: [
    { label: 'Paul', value: 1 },
    { label: 'Walker', value: 2 }
  ]
}
