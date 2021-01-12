import QasSearchBox from './QasSearchBox.vue'

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
  title: 'Components/SearchBox',
  component: QasSearchBox,
  parameters: {
    docs: {
      description: {
        component: 'Component that receives a list and searches with properties that can be customized' +
                    '<br> Dependencies: https://fusejs.io/'
      }
    }
  },

  argTypes: {
    emptyListHeight: {
      description: 'test'
    },

    fuseOptions: {
      table: {
        type: { summary: 'Object' },
        defaultValue: {
          detail: `${options}`,
          summary: '{...options}'
        }
      },
      name: 'fuseOptions',
      description: 'Indicates which parameter to use for the filter https://fusejs.io/api/options.html'
    },

    height: {
      description: 'height that the list and the component occupies on the screen'
    },

    hideEmptySlot: {
      description: 'hides the empty named slot, which is shown when the search returns no results'
    },

    list: {
      name: 'list',
      description: 'Array of objects containing label and value'
    },

    placeholder: {
      description: 'describes what will be shown in the input field'
    },

    value: {
      description: 'input value that will be used for the list filter'
    },

    // slot
    empty: {
      description: 'Slot showing result not found',
      table: {
        type: { summary: null },
        disable: false
      }
    },

    default: {
      description: 'Scoped Slot that receives the result in Results',
      table: {
        subcategory: 'Scoped Slot',
        type: { summary: null },
        disable: false,
        defaultValue: { summary: 'Results' }
      }
    },

    // events
    input: {
      description: 'Triggers the input event with the assigned value and sets the results to the value.'
    },

    emptyResult: {
      description: 'Emits emptyResult event if there is no value to be searched'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasSearchBox },
  template:
   `<qas-search-box v-bind="$props" > 
      <template v-slot="{ results }">
        {{ results }}
      </template>
    </qas-search-box>
    `
})

export const Default = Template.bind({})

Default.args = {
  list: [{ label: 'Paul', value: 1 }, { label: 'Walker', value: 2 }],
  fuseOptions: { keys: ['label'] },
  placeholder: undefined,
  height: undefined
}
