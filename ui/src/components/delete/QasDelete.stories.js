import QasDelete from './QasDelete.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasDelete,
  title: 'Components/Delete',

  parameters: {
    docs: {
      description: {
        component: 'Button to delete an entity\'s entry.'
      }
    }
  },

  argTypes: {
    // Props
    color: {
      table: { disable: true }
    },

    customId: {
      description: 'Custom identifier to be deleted (by default, the component will get the `id` route\'s param).'
    },

    dialog: {
      description: 'Events and props of QasDialog component.'
    },

    entity: {
      description: '[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) entity.'
    },

    label: {
      table: { disable: true }
    },

    tag: {
      description: 'Vue component or HTML element tag.'
    },

    // Events
    error: {
      description: 'Fires when occur an error deleting item.',
      table: noSummary
    },

    success: {
      description: 'Fires when item is successfully deleted.',
      table: noSummary
    },

    // Slots
    default: {
      description: 'Main content.',
      table: noSummary
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
  color: 'negative',
  label: 'Delete'
}
