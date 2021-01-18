import QasListView from './QasListView.vue'
import QasDebugger from '../debugger/QasDebugger'

import Vuex from 'vuex'
import VueRouter from 'vue-router'

import users from '../../mocks/storeModule'

const slotDefaults = {
  defaultValue: {
    summary: JSON.stringify({ errors: 'object', fields: 'object', metadata: 'object' })
  },

  type: {
    summary: null
  }
}

export default {
  component: QasListView,
  title: 'Components/ListView',

  parameters: {
    docs: {
      description: {
        component: 'This component returns a list of objects based on <strong>vuex entity</strong>.'
      }
    }
  },

  argTypes: {
    dialog: {
      description: 'Used to change the tag of the component if used within any modal becomes div and not QPage.'
    },

    entity: {
      description: 'Entity of vuex.',
      control: null
    },

    url: {
      description: 'If the entity is different from the endpoint, you can use this property to specify what the endpoint is.'
    },

    noFilter: {
      description: 'Disables filter.'
    },

    disableRefresh: {
      description: 'Disables [q-pull-to-refresh](https://quasar.dev/vue-components/pull-to-refresh#Introduction), usually used in conjunction with sortable.'
    },

    // events
    'fetch-success': {
      description: 'Emitted when get\'s the value successfully.',
      table: {
        defaultValue: { summary: JSON.stringify({ response: 'object' }) }
      }
    },

    'fetch-error': {
      description: 'Emitted when can\'t get the value successfully.',
      table: {
        defaultValue: { summary: JSON.stringify({ error: 'object' }) }
      }
    },

    // slots
    header: {
      description: 'Page header content.',
      table: {
        ...slotDefaults
      }
    },

    filter: {
      description: 'Slot to access the <strong>Filter</strong> component.',
      table: {
        defaultValue: {
          summary: JSON.stringify({ errors: 'object', fields: 'object', metadata: 'object', entity: 'string' })
        },

        type: {
          summary: null
        }
      }
    },

    default: {
      description: 'Page main content.',
      table: {
        ...slotDefaults
      }
    },

    footer: {
      description: 'Page footer content.',
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
  components: { QasListView, QasDebugger },
  store: new Vuex.Store({
    modules: { users }
  }),
  router: new VueRouter(),
  template:
    `
    <q-layout>
      <q-page-container>
        <qas-list-view v-bind="$props">
          <template v-slot="{ results, fields }">
            <div>
              Results:<qas-debugger :inspect="[results]" />
              Fields:<qas-debugger :inspect="[fields]" />
            </div>
          </template>
        </qas-list-view>
      </q-page-container>
    </q-layout>
    `
})

const template =
  `
  <qas-list-view entity="users">
    <template v-slot="{ results, fields }">
      <div>
        Results:<qas-debugger :inspect="[results]" />
        Fields:<qas-debugger :inspect="[fields]" />
      </div>
    </template>
  </qas-list-view>
  `

export const Default = Template.bind({})
Default.args = {
  entity: 'users'
}

Default.parameters = {
  docs: {
    source: { code: template }
  }
}
