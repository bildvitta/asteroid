import QasListView from './QasListView.vue'

export default {
  component: QasListView,
  title: 'Components/ListView',

  parameters: {
    docs: {
      description: {
        component: 'This component returns a list of objects based on a request.'
      }
    }
  },

  argTypes: {
    dialog: {
      description: 'Used to change the tag of the component if used within any modal becomes div and not QPage.'
    },

    entity: {
      description: 'Vuex Entity'
    },

    url: {
      description: 'If the entity is different from the endpoint, you can use this property to specify what the endpoint is.'
    },

    noFilter: {
      description: 'Disables filter.'
    },

    disableRefresh: {
      description: 'Disables q-pull-to-refresh, normally used in conjunction with sortable.'
    },

    // events
    'fetch-success': {
      description: 'Fires when the request is successful.'
    },

    'fetch-error': {
      description: 'Fires when the request fails.'
    },

    // slots
    header: {
      description: 'Slot to access the header.',
      table: {
        type: {
          summary: 'Scope: { fields: [Array, Object], metadata: Object, results: Array }'
        }
      }
    },

    filter: {
      description: 'Slot to access the filter component.',
      table: {
        type: {
          summary: 'Scope: { fields: [Array, Object], metadata: Object, results: Array, entity: String, errors: [Array, Object] }'
        }
      }
    },

    default: {
      description: 'Slot Default.',
      table: {
        type: {
          summary: 'Scope: { fields: [Array, Object], metadata: Object, results: Array }'
        }
      }
    },

    footer: {
      description: 'Slot to access the footer.',
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
  components: { QasListView },
  template:
    '<qas-list-view v-bind="$props"> '

})

export const Default = Template.bind({})
Default.args = {
  // entity: ''
}
