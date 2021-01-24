import Vuex from 'vuex'
import VueRouter from 'vue-router'

import users from '../../mocks/storeModule'

import QasFilters from './QasFilters.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasFilters,
  title: 'Components/Filters',

  parameters: {
    docs: {
      description: {
        component: 'Generates fields to be used as filters. Used by `QasListView`.'
      }
    }
  },

  argTypes: {
    badges: {
      description: 'Show current filters as badges.'
    },

    entity: {
      control: null,
      description: '[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) entity.'
    },

    noFilterButton: {
      description: 'Hides filter button.'
    },

    noSearch: {
      description: 'Hides search field.'
    },

    searchOnType: {
      description: 'Search on type.'
    },

    searchPlaceholder: {
      description: 'Search field placeholder.'
    },

    url: {
      control: null,
      description: 'Ignore entity and specify another endpoint.'
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
            context: 'object',
            filter: 'function',
            filters: 'object',
            removeFilter: 'function'
          })
        }
      }
    },

    'filter-button': {
      description: 'Filter button content.',
      table: {
        defaultValue: { summary: JSON.stringify({ filter: 'function' }) },
        ...noSummary
      }
    },

    search: {
      description: 'Search input content.',
      table: {
        defaultValue: { summary: JSON.stringify({ filter: 'function' }) },
        ...noSummary
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

  template: '<qas-filters v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  entity: 'users'
}
