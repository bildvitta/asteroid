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
        component: 'Component that receives a list and searches with properties that can be customized'
                    + '<br> Dependencies: https://fusejs.io/' 
      } 
    }
  },

  argTypes: {
    list: {
      name: 'list',
      description: 'Array of objects containing label and value'
    },

    fuseOptions: {
      table: {
        type: {
          summary: 'Object' },
        defaultValue: {
          detail: `${options}`,
          summary: '{...options}'}
      },
      name: 'fuseOptions',
      description: 'Indicates which parameter to use for the filter https://fusejs.io/api/options.html'
    },

    placeholder: {
      description: 'placeholder of input'
    },

    value: {
      description: 'value of search'
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
      table: {
        disable: true
      }
    },
    
    emptyResult: {
      description: 'Emits emptyResult event if there is no value to be searched',
      table: {
        disable: false
      }
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
   list: [{ label: 'Paul', value: 1 },{ label:'Walker', value: 2 }],
   fuseOptions: { keys: ['label'] },
   placeholder: undefined,
   height: undefined
}
