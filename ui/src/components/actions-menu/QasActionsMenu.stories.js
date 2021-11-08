import QasActionsMenu from './QasActionsMenu.vue'
import { Notify } from 'quasar'

export default {
  component: QasActionsMenu,
  title: 'Components/ActionsMenu',

  parameters: {
    docs: {
      description: {
        component: 'Actions menu.'
      }
    }
  },

  argTypes: {
    label: {
      description: 'Button label.'
    },

    list: {
      description: 'Actions list as an object containing `label`, `icon`, `props` and `handler` click event.'
    },

    hideLabel: {
      description: 'Controls label visibility.'
    },

    icon: {
      description: 'Icon button.'
    },

    // slots
    '[dynamic-name]': {
      description: 'Each key inside `list` have your own slot to be customized.',
      table: {
        category: 'slots',
        defaultValue: {
          detail: JSON.stringify({ item: 'string' }),
          summary: '{}'
        }
      }
    },

    default: {
      table: { disable: true }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasActionsMenu },
  props: Object.keys(argTypes),
  template:
    '<qas-actions-menu v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  block: {
    handler: () => Notify.create('Block clicked!'),
    icon: 'o_locked',
    label: 'Block'
  },

  list: {
    delete: {
      handler: () => Notify.create('Delete clicked!'),
      icon: 'o_delete',
      label: 'Delete'
    }
  }
}
