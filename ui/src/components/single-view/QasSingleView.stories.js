import QasSingleView from './QasSingleView.vue'
import QasDebugger from '../debugger/QasDebugger'

import Vuex from 'vuex'
import users from '../../mocks/storeModule'

const slotDefaults = {
  defaultValue: {
    summary: '{}',
    detail: `{
 errors: 'object'
 fields: 'object'
 metadata: 'object'
 result: 'object' 
}`
  },

  type: {
    summary: null
  }
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
    dialog: {
      description: 'Use when the component is inside a dialog.'
    },

    entity: {
      control: null,
      description: '[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) entity.'
    },

    url: {
      control: null,
      description: 'If the entity is different from the endpoint, you can use this property to specify what the endpoint is.'
    },

    customId: {
      control: null,
      description: 'Sets a custom id to `entity`. When not set, will use the `:id` route param.'
    },

    // Events
    'fetch-error': {
      description: 'Fires when occur an error fetching value.',
      table: {
        defaultValue: {
          summary: '{}',
          detail: '{ error: \'object\' }'
        }
      }
    },

    'fetch-success': {
      description: 'Fires when successfully get the value.',
      table: {
        defaultValue: {
          summary: '{}',
          detail: '{ response: \'object\', value: \'object\' }'
        }
      }
    },

    // Slots
    default: {
      description: 'Main content.',
      table: {
        ...slotDefaults
      }
    },

    footer: {
      description: 'Page\'s footer content.',
      table: {
        type: {
          summary: null
        }
      }
    },

    header: {
      description: 'Page\'s header content.',
      table: {
        ...slotDefaults
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasSingleView, QasDebugger },
  store: new Vuex.Store({
    modules: { users }
  }),
  template:
   `
   <q-layout>
    <q-page-container>
      <qas-single-view v-bind="$props">
        <template v-slot="{ fields, result }">
          <div>
            Fields:<qas-debugger :inspect="[fields]" />
            Results:<qas-debugger :inspect="[result]" />
          </div>
        </template>
      </qas-single-view>
    </q-page-container>
  </q-layout>
   `
})

const template = `
  <qas-single-view entity="users">
    <template v-slot="{ errors, fields, metadata, result }">
      <div>
        Fields:<qas-debugger :inspect="[fields]" />
        Result:<qas-debugger :inspect="[result]" />
      </div>
    </template>
  </qas-single-view>
`

export const Default = Template.bind({})
Default.args = {
  entity: 'users',
  customId: 'a755a6d1-fc4a-4961-a8cc-b2293fe5b81c'
}

Default.parameters = {
  docs: {
    source: { code: template }
  }
}
