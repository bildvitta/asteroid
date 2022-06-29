import Vuex from 'vuex'
import users from '../../mocks/storeModule'

import QasDebugger from '../debugger/QasDebugger'
import QasSingleView from './QasSingleView.vue'

const slotDefaults = {
  defaultValue: {
    detail: JSON.stringify({
      errors: 'object',
      fields: 'object',
      metadata: 'object',
      result: 'object'
    }),

    summary: '{}'
  },

  type: { summary: null }
}

export default {
  component: QasSingleView,
  title: 'Components/SingleView',

  parameters: {
    docs: {
      description: {
        component: 'You can use this component for <strong>view and display</strong> infos.'
      }
    }
  },

  argTypes: {
    // Props
    beforeFetch: {
      description: 'Function to be called before fetching data.'
    },

    customId: {
      control: null,
      description: 'Sets a custom id to `entity`. When not set, will use the `:id` route param.'
    },

    dialog: {
      description: 'Use when the component is inside a dialog.'
    },

    entity: {
      control: null,
      description: '[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) entity.'
    },

    url: {
      control: null,
      description: 'Ignore entity and specify another endpoint.'
    },

    value: {
      description: 'Model value'
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
          detail: JSON.stringify({ response: 'object', value: 'object' }),
          summary: '{}'
        }
      }
    },

    input: {
      description: 'Fires when successfully get the result.'
    },

    // Slots
    default: {
      description: 'Main content.',
      table: slotDefaults
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
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasDebugger, QasSingleView },
  props: Object.keys(argTypes),

  store: new Vuex.Store({
    modules: { users }
  }),

  template:
    `<q-layout>
      <q-page-container>
        <qas-single-view v-bind="$props">
          <template v-slot="{ fields, result }">
            Fields: <qas-debugger :inspect="[fields]" />
            Results: <qas-debugger :inspect="[result]" />
          </template>
        </qas-single-view>
      </q-page-container>
    </q-layout>`
})

export const Default = Template.bind({})

Default.args = {
  customId: 'a755a6d1-fc4a-4961-a8cc-b2293fe5b81c',
  entity: 'users'
}
