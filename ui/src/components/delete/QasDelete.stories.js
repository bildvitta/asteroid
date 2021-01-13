import QasDelete from './QasDelete.vue'

export default {
  component: QasDelete,
  title: 'Components/Delete',

  parameters: {
    docs: {
      description: {
        component: 'Insert line breaks where newlines `\n` occur in the string.'
      }
    }
  },

  argTypes: {
    dialog: {
      description: 'recebe as configurações do dialog'
    },
    customId: {
      description: 'CustomID receives a customized id of the item to be deleted or if not the id to be used will be from the route'
    },
    entity: {
      description: 'The entity is used by vuex as a url to define which element will be deleted from the store. has as parameter the ID.'
    },
    label: {
      description: 'Label is an attribute for the element to display text in its content'
    },
    tag: {
      description: 'The tag defines what is the element type in the DOM'
    },

    // events
    success: {
      description: 'event triggered when the item is successfully deleted',
      table: {
        type: {
          summary: null
        }
      }
    },
    error: {
      description: 'event triggered when the item was not deleted',
      table: {
        type: {
          summary: null
        }
      }
    },

    // slots
    default: {
      description: 'A standard slot that is populated by past content',
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
    '<qas-delete v-bind="$props">'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Delete Button'
}
