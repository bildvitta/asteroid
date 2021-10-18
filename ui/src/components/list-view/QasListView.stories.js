import Vuex from 'vuex'
import VueRouter from 'vue-router'

import users from '../../mocks/storeModule'

import QasDebugger from '../debugger/QasDebugger'
import QasListView from './QasListView.vue'

const defaultFilterValues = JSON.stringify({
  entity: 'string',
  errors: 'object',
  fields: 'object',
  metadata: 'object'
})

const slotDefaults = {
  defaultValue: {
    detail: JSON.stringify({
      errors: 'object',
      fields: 'object',
      metadata: 'object'
    }),

    summary: '{}'
  },

  type: { summary: null }
}

export default {
  component: QasListView,
  title: 'Components/ListView',

  parameters: {
    docs: {
      description: {
        component: 'List of entity rows.'
      }
    }
  },

  argTypes: {
    // Props
    dialog: {
      description: 'Use when the component is inside a dialog.'
    },

    disableRefresh: {
      description: 'Disables [QPullToRefresh](https://quasar.dev/vue-components/pull-to-refresh). Usually used in conjunction with sortable.'
    },

    entity: {
      control: null,
      description: '[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) entity.'
    },

    filtersProps: {
      description: 'Controls filters props from [QasFilters](https://asteroid.nave.dev/?path=/docs/components-filters--default)'
    },

    noFilter: {
      description: 'Hide filters.'
    },

    url: {
      control: null,
      description: 'Ignore entity and specify another endpoint.'
    },

    // Events
    'fetch-error': {
      description: 'Fires when occur an error fetching value.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ error: 'object' }),
          summary: '{}'
        }
      }
    },

    'fetch-success': {
      description: 'Fires when successfully get the value.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ response: 'object' }),
          summary: '{}'
        }
      }
    },

    // Slots
    default: {
      description: 'Main content.',
      table: slotDefaults
    },

    filter: {
      description: 'Replace `QasFilter` component.',
      table: {
        defaultValue: {
          detail: defaultFilterValues,
          summary: '{}'
        },

        type: { summary: null }
      }
    },

    footer: {
      description: 'Page\'s footer content.',
      table: {
        type: { summary: null }
      }
    },

    header: {
      description: 'Page\'s header content.',
      table: slotDefaults
    },

    'empty-results': {
      description: 'Main content when has no results.',
      table: {
        defaultValue: {
          detail: JSON.stringify({
            fields: 'object',
            metadata: 'object'
          }),

          summary: '{}'
        },

        type: { summary: null }
      },

      type: { summary: null }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasDebugger, QasListView },
  props: Object.keys(argTypes),

  router: new VueRouter(),

  store: new Vuex.Store({
    modules: { users }
  }),

  template:
    `<q-layout>
      <q-page-container>
        <qas-list-view v-bind="$props">
          <template v-slot="{ results, fields }">
            Results: <qas-debugger :inspect="[results]" />
            Fields: <qas-debugger :inspect="[fields]" />
          </template>
        </qas-list-view>
      </q-page-container>
    </q-layout>`
})

export const Default = Template.bind({})

Default.args = {
  entity: 'users'
}
