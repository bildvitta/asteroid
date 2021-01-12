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
      description: 'teste'
    },
    entity: {
      description: 'teste'
    },
    label: {
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
