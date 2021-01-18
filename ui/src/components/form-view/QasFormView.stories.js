import QasFormView from './QasFormView.vue'
import QasDebugger from '../debugger/QasDebugger'

import Vuex from 'vuex'
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
  component: QasFormView,
  title: 'Components/FormView',
  parameters: {
    docs: {
      description: {
        component: 'Form component, used in <strong>create</strong> and <strong>edit</strong> page, handles vuex directly. Usually used together with <strong>FormGenerator</strong>.'
      }
    }
  },

  argTypes: {
    value: {
      description: 'Model value.'
    },

    cancelButton: {
      description: 'Cancel button label.'
    },

    customId: {
      description: 'The component gets the id from route, but you can set a custom id with this prop.',
      control: null
    },

    disable: {
      description: 'Set the action buttons to disable.'
    },

    mode: {
      description: 'Sets the component mode, for a creation page: <strong>create</strong> (POST), for an edit page: <strong>replace</strong> (PUT) or <strong>update</strong> (PATCH).',
      control: { type: 'select', options: ['create', 'replace', 'update'] }
    },

    readOnly: {
      description: 'Disable action buttons and submit method.'
    },

    submitButton: {
      description: 'Submit button.'
    },

    showDialogOnUnsavedChanges: {
      description: 'Enable dialog when leave page without save changes.'
    },

    cancelRoute: {
      description: 'Route config to button cancel.'
    },

    entity: {
      description: 'Entity of vuex.',
      control: null
    },

    url: {
      description: 'If the entity is different from the endpoint, you can use this property to specify what the endpoint is.',
      control: null
    },

    dialog: {
      description: 'Set FormView to Dialog mode.'
    },

    route: {
      description: 'Page route.'
    },

    // events
    input: {
      description: 'Emitted when the component needs to change the model. Is also used by `v-model`.',
      table: {
        defaultValue: { summary: JSON.stringify({ value: 'object' }) }
      }
    },

    'fetch-success': {
      description: 'Emitted when get\'s the value successfully.',
      table: {
        defaultValue: { summary: JSON.stringify({ response: 'object', value: 'object' }) }
      }
    },

    'fetch-error': {
      description: 'Emitted when can\'t get the value successfully.',
      table: {
        defaultValue: { summary: JSON.stringify({ error: 'object' }) }
      }
    },

    'submit-success': {
      description: 'Emitted when the value is updated successfully.',
      table: {
        defaultValue: { summary: JSON.stringify({ response: 'object', value: 'object' }) }
      }
    },

    'submit-error': {
      description: 'Emitted when the value can\'t be updated successfully.',
      table: {
        defaultValue: { summary: JSON.stringify({ error: 'object', value: 'object' }) }
      }
    },

    // slots
    default: {
      description: 'Page main content.',
      table: {
        ...slotDefaults
      }
    },

    actions: {
      description: 'Actions button content.',
      table: {
        ...slotDefaults
      }
    },

    header: {
      description: 'Page header content.',
      table: {
        ...slotDefaults
      }
    },

    footer: {
      description: 'Page footer content.',
      table: {
        ...slotDefaults
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasFormView, QasDebugger },
  store: new Vuex.Store({
    modules: { users }
  }),
  data () {
    return {
      values: {}
    }
  },
  template:
    `
    <q-layout>
      <q-page-container>
        <qas-form-view v-model="values" v-bind="$props">
          <template v-slot="{ errors, fields, metadata }">
            <div>
              Fields:<qas-debugger :inspect="[fields]" />
              Values:<qas-debugger :inspect="[values]" />
            </div>
          </template>
        </qas-form-view>
      </q-page-container>
    </q-layout>
    `
})

const template =
  `
  <qas-form-view v-model="values" entity="users">
    <template v-slot="{ errors, fields, metadata }">
      <div>
        Fields:<qas-debugger :inspect="[fields]" />
        Values:<qas-debugger :inspect="[values]" />
      </div>
    </template>
  </qas-form-view>
  `

export const CreateMode = Template.bind({})
CreateMode.args = {
  entity: 'users',
  url: 'users',
  customId: '123'
}

CreateMode.parameters = {
  docs: {
    source: { code: template }
  }
}

export const EditMode = Template.bind({})
EditMode.args = {
  entity: 'users',
  mode: 'replace',
  customId: 'a755a6d1-fc4a-4961-a8cc-b2293fe5b81c'
}

EditMode.parameters = {
  docs: {
    source: { code: template }
  }
}
