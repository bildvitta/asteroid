import QasFilters from './QasFilters.vue'

import Vuex from 'vuex'
import users from '../../mocks/storeModule'

export default {
  component: QasFilters,
  title: 'Components/Filters',

  parameters: {
    docs: {
      description: {
        component: 'Generates dinamic fileds to be used as filters, used in <strong>ListView</strong>.'
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
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasFilters },
  props: Object.keys(argTypes),
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
