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
        component: 'Component that receives a list and searches with properties that can be customized' +
                    '<br> Dependencies: https://fusejs.io/'
      }
    }
  },

  argTypes: {
    // Props
    emptyListHeight: {
      description: 'list height when empty'
    },

    fuseOptions: {
      description: 'Indicates which parameter to use for the filter https://fusejs.io/api/options.html',
      table: {
        type: { summary: 'Object' },
        defaultValue: {
          detail: `${options}`,
          summary: '{...options}'
        }
      }
    },

    height: {
      description: 'height that the list and the component occupies on the screen'
    },

    hideEmptySlot: {
      description: 'hides the empty named slot, which is shown when the search returns no results'
    },

    list: {
      description: 'Array of objects containing label and value'
    },

    placeholder: {
      description: 'describes what will be shown in the input field'
    },

    value: {
      description: 'input value that will be used for the list filter'
    },

    // Events
    emptyResult: {
      description: 'Emits emptyResult event if there is no value to be searched'
    },

    input: {
      description: 'Triggers the input event with the assigned value and sets the results to the value.'
    },

    // Slots
    default: {
      description: 'Scoped Slot that receives the result in Results',
      table: noSummary
    },

    empty: {
      description: 'Slot showing result not found',
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
Default.args = {
  fuseOptions: { keys: ['label'] },
  list: [
    { label: 'Paul', value: 1 },
    { label: 'Walker', value: 2 }
  ]
}
