import QasSearchBox from './QasSearchBox.vue'

export default {
  title: 'Components/SearchBox',
  component: QasSearchBox,
  parameters: {
    docs: { 
      description: { 
        component: 'Research Component'
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
      name: 'fuseOptions',
      description: 'Indicates which parameter to use for the filter https://fusejs.io/api/options.html',
    },
    placeholder: {
      description: 'Standard input text'
    },
    height: {
      description: 'Component height'
    },
    value: {
      description: 'Base value for research'
    },
    empty:{
      table:{
        disable: true
      }
    },
    default:{
      table:{
        disable: true
      }
    },
    input:{
      table:{
        disable: true
      }
    },
    emptyResult:{
      table:{
        disable: true
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasSearchBox },
  template:
   `<QasSearchBox v-bind="$props" > 
      <template v-slot="{ results }">
        <div v-for="(obj, index) in results" :key="obj.index">
          {{ obj.label }}
          {{ obj.item }}
        </div>
      </template>
    </QasSearchBox>
    `
})

export const Default = Template.bind({})

Default.args = {
   list: [{label: 'Paul', value: 1 },{"label":"Walker","value":2}],
   fuseOptions: {keys: ['label']}
}
