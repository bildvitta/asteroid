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
      description: 'teste'
    },
    tag: {
      description: 'The tag defines what is the element type in the DOM'
    },

    // events
    success: {
      description: 'teste'
    },
    error: {
      description: 'teste'
    },

    // slots
    default: {
      description: 'teste'
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
