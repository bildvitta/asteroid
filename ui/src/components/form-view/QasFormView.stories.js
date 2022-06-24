import QasFormView from './QasFormView.vue'
import QasDebugger from '../debugger/QasDebugger'

import Vuex from 'vuex'
import users from '../../mocks/storeModule'

const slotDefaults = {
  defaultValue: {
    detail: JSON.stringify({
      errors: 'object',
      fields: 'object',
      metadata: 'object'
    }),
    summary: '{}'
  },

  type: {
    summary: null
  }
}

export default {
  component: QasFormView,
  title: 'Components/FormView',

  parameters: {
    docs: {
      description: {
        component: 'Create forms like a magic, you can use this component with create and edit mode.'
      }
    }
  },

  argTypes: {
    // Props
    beforeFetch: {
      description: 'Function to be called before fetching data.'
    },

    cancelButton: {
      description: 'Cancel button label.'
    },

    cancelRoute: {
      description: 'Cancel button route.'
    },

    customId: {
      control: null,
      description: 'Sets a custom id to `entity`. When not set, will use the `:id` route param.'
    },

    dialog: {
      description: 'Use when the component is inside a dialog.'
    },

    disable: {
      description: 'Disable actions buttons.'
    },

    entity: {
      control: null,
      description: '[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) entity.'
    },

    mode: {
      control: { type: 'select', options: ['create', 'replace', 'update'] },
      description: 'Use `create` when you want to create a new entry (`POST`). To edit an existing entry, use `replace` (`PUT`) or `update` (`PATCH`).'
    },

    readOnly: {
      description: 'Disable action buttons and submit method.'
    },

    route: {
      description: 'Page route.'
    },

    showDialogOnUnsavedChanges: {
      description: 'Enable dialog when leave page without save changes.'
    },

    submitButton: {
      description: 'Submit button label.'
    },

    beforeSubmit: {
      description: 'Function to call before submit.'
    },

    url: {
      control: null,
      description: 'Ignore entity and specify another endpoint.'
    },

    value: {
      description: 'Model value.'
    },

    // Events
    'fetch-error': {
      description: 'Fires when occur an error fetching value.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ value: 'object' }),
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
      description: 'Fires when model changes. Is also used by `v-model`.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ error: 'object' }),
          summary: '{}'
        }
      }
    },

    'submit-error': {
      description: 'Fires when occur an error updating value.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ response: 'object', value: 'object' }),
          summary: '{}'
        }
      }
    },

    'submit-success': {
      description: 'Fires when the value is successfully updated.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ error: 'object', value: 'object' }),
          summary: '{}'
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

    actions: {
      description: 'Actions buttons content.',
      table: {
        ...slotDefaults
      }
    },

    footer: {
      description: 'Page\'s footer content.',
      table: {
        ...slotDefaults
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
  components: { QasFormView, QasDebugger },
  props: Object.keys(argTypes),

  store: new Vuex.Store({
    modules: { users }
  }),

  data () {
    return {
      values: {}
    }
  },

  template:
    `<q-layout>
      <q-page-container>
        <qas-form-view v-model="values" v-bind="$props">
          <template v-slot="{ errors, fields, metadata }">
            Fields: <qas-debugger :inspect="[fields]" />
            Values: <qas-debugger :inspect="[values]" />
          </template>
        </qas-form-view>
      </q-page-container>
    </q-layout>`
})

const template = `
  <qas-form-view v-model="values" entity="users">
    <template v-slot="{ errors, fields, metadata }">
      Fields: <qas-debugger :inspect="[fields]" />
      Values: <qas-debugger :inspect="[values]" />
    </template>
  </qas-form-view>
`

export const CreateMode = Template.bind({})

CreateMode.args = {
  customId: '123',
  entity: 'users',
  url: 'users'
}

CreateMode.parameters = {
  docs: {
    source: { code: template }
  }
}

export const EditMode = Template.bind({})

EditMode.args = {
  customId: 'a755a6d1-fc4a-4961-a8cc-b2293fe5b81c',
  entity: 'users',
  mode: 'replace'
}

EditMode.parameters = {
  docs: {
    source: { code: template }
  }
}
