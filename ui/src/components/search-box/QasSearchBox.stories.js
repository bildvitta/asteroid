import QasSearchBox from './QasSearchBox.vue'

const noSummary = {
  type: { summary: null }
}

const options = `{
  distance: 100,
  location: 0,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  shouldSort: true, 
  threshold: 0.1, 
  tokenize: true 
}`

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

    fuseOptions: {
      description: '[Fuse.js options](https://fusejs.io/api/options.html)',
      table: {
        defaultValue: {
          detail: options
        }
      }
    },

    height: {
      description: 'List height (without search field).'
    },

    hideEmptySlot: {
      description: 'Hides empty slot.'
    },

    list: {
      description: 'Array of objects with `label` and `value` each, to be searched.'
    },

    placeholder: {
      description: 'Display temporary message when search field in empty.'
    },

    value: {
      description: 'Search field value.'
    },

    // Events
    emptyResult: {
      description: 'Fires when there is no results.',
      table: noSummary
    },

    input: {
      description: 'Fires when the result changes.',
      table: noSummary
    },

    // Slots
    default: {
      description: 'To format results. Receives the filtered list.',
      table: {
        defaultValue: { summary: JSON.stringify({ results: 'array' }) },
        ...noSummary
      }
    },

    empty: {
      description: 'To be displayed when there is no results.',
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
