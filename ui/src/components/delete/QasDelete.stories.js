import QasDelete from './QasDelete.vue'

export default {
  component: QasDelete,
  title: 'Components/Delete',

  parameters: {
    docs: {
      description: {
        component: 'Component to delete a record from the click event.'
      }
    }
  },

  argTypes: {
    dialog: {
      description: 'receives dialog settings.'
    },

    customId: {
      description: 'Identifier to be deleted (if not sended the component will get id param of route).'
    },

    entity: {
      description: 'Entity of vuex.'
    },

    label: {
      table: {
        disable: true
      }
    },

    tag: {
      description: 'HTML tag.'
    },

    // events
    success: {
      description: 'Trigger when item is successfully deleted.',
      table: {
        type: {
          summary: null
        }
      }
    },

    error: {
      description: '\'Trigger when item isn\'t successfully deleted.\'',
      table: {
        type: {
          summary: null
        }
      }
    },

    // slots
    default: {
      description: 'Field main content.',
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
  components: { QasDelete },
  template:
    '<qas-delete v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Delete'
}
