import QasFormView from './QasFormView.vue'

const slotDefaults = {
  defaultValue: {
    summary: JSON.stringify({ errors: 'object', fields: 'object', metadata: 'object' })
  }
}

export default {
  component: QasFormView,
  title: 'Components/FormView',
  parameters: {
    docs: {
      description: {
        component: 'Extends [QBtn](https://quasar.dev/vue-components/button).'
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
      description: 'The component gets the id from route, but you can set a custom id with this prop.'
    },

    disable: {
      description: 'Set the action buttons to disable.'
    },

    mode: {
      description: 'Sets the component mode, for a creation page: <strong>create</strong> (POST), for an edit page: <strong>replace</strong> (PUT) or <strong>update</strong> (PATCH).'
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
      description: 'Entity of vuex.'
    },

    url: {
      description: 'If the entity is different from the endpoint, you can use this property to specify what the endpoint is.'
    },

    dialog: {
      description: 'Page route.'
    },

    route: {
      description: 'If the entity is different from the endpoint, you can use this property to specify what the endpoint is.'
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
  components: { QasFormView },
  template:
    `
    <q-layout>
      <q-page-container>
        <qas-form-view v-bind="$props">
          <template v-slot="{ errors, fields, metadata }">
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, suscipit repellat esse minima temporibus ipsum similique quos vel reiciendis ut delectus consectetur eum dicta. Impedit tempora sequi eos autem quidem?
            </div>
          </template>
        </qas-form-view>
      </q-page-container>
    </q-layout>
    `
})

export const Default = Template.bind({})
Default.args = {
  entity: 'users'
}
