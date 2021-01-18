import QasAutocomplete from './QasAutocomplete.vue'

export default {
  component: QasAutocomplete,
  title: 'Components/Autocomplete',

  parameters: {
    docs: {
      description: {
        component: 'Component for select text search that implements [Fuse](https://fusejs.io/) and [QSelect](https://quasar.dev/vue-components/select#Introduction) (all QSelect events are available).'
      }
    }
  },

  argTypes: {
    labelKey: {
      description: 'Object key to be replaced by label if there is no key label on any object.'
    },

    valueKey: {
      description: 'Object key to be replaced with value if there is no value key in the object.'
    },

    options: {
      description: 'Select options.'
    },

    fuseOptions: {
      description: 'Opções da biblioteca [Fuse.js](https://fusejs.io/).'
    },

    value: {
      description: 'Value receives the value of the Input and can be multiple.'
    },

    // events
    input: {
      description: 'Raises the input event by passing the value parameter.'
    },

    // slot
    append: {
      description: 'Attach to the inner field.',
      table: {
        category: 'slots',
        type: {
          summary: null
        }
      }
    },

    'no-option': {
      description: 'By default, when there are no options, the menu does not appear. But you can customize this scenario and specify what the menu should display.',
      table: {
        category: 'slots',
        type: {
          summary: null
        }
      }
    },

    option: {
      description: 'Option slot is displayed when there is an option to be displayed.',
      table: {
        type: {
          summary: null
        }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasAutocomplete },

  data () {
    return {
      valueOption: ''
    }
  },

  template:
    '<qas-autocomplete v-bind="$props" v-model="valueOption" />'

})

export const Default = Template.bind({})
Default.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ]
}
