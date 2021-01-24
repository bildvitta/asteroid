import QasFilters from './QasFilters.vue'

import Vuex from 'vuex'
import users from '../../mocks/storeModule'
import VueRouter from 'vue-router'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasFilters,
  title: 'Components/Filters',

  parameters: {
    docs: {
      description: {
        component: 'Generates dynamic fileds to be used as filters, used in <strong>ListView</strong>.'
      }
    }
  },

  argTypes: {
    badges: {
      description: 'Enables active filters as badges.'
    },

    entity: {
      control: null,
      description: '[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) entity.'
    },

    noFilterButton: {
      description: 'Controls button filter.'
    },

    noSearch: {
      description: 'Removes search field.'
    },

    searchPlaceholder: {
      description: 'Search field placeholder.'
    },

    url: {
      control: null,
      description: 'Ignore entity and specify another endpoint.'
    },

    searchOnType: {
      description: 'Search on type.'
    },

    // Events
    'fetch-error': {
      description: 'Fires when occur an error fetching value.',
      table: {
        defaultValue: { summary: JSON.stringify({ error: 'object' }) }
      }
    },

    'fetch-success': {
      description: 'Fires when successfully get the value.',
      table: {
        defaultValue: { summary: JSON.stringify({ response: 'object' }) }
      }
    },

    // Slots
    default: {
      description: 'Bottom content.',
      table: {
        ...noSummary,
        defaultValue: {
          summary: JSON.stringify({
            filters: 'object',
            context: 'object',
            filter: 'function',
            removeFilter: 'function'
          })
        }
      }
    },

    search: {
      description: 'Search input content.',
      table: {
        ...noSummary,
        defaultValue: { summary: JSON.stringify({ filter: 'function' }) }
      }
    },

    'filter-button': {
      description: 'Filter button content.',
      table: {
        ...noSummary,
        defaultValue: { summary: JSON.stringify({ filter: 'function' }) }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasFilters },
  props: Object.keys(argTypes),
  router: new VueRouter(),
  store: new Vuex.Store({
    modules: { users }
  }),
  template:
    '<qas-filters v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  entity: 'users'
}
