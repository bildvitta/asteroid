import QasSettingsMenu from './QasSettingsMenu.vue'
import { Notify } from 'quasar'

export default {
  component: QasSettingsMenu,
  title: 'Components/SettingsMenu',

  parameters: {
    docs: {
      description: {
        component: 'Settings menu.'
      }
    }
  },

  argTypes: {
    label: {
      description: 'Button label.'
    },

    list: {
      description: 'Settings list as an object containing `label`, `icon`, `props` and `handle` click event.'
    },

    // slots
    '[dynamic-name]': {
      description: 'Each key inside `list` have your own slot to be customized.',
      table: {
        category: 'slots',
        defaultValue: { summary: JSON.stringify({ item: 'string' }) }
      }
    },

    default: {
      table: { disable: true }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasSettingsMenu },
  props: Object.keys(argTypes),
  template:
    '<qas-settings-menu v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  block: {
    handle: () => Notify.create('Block clicked!'),
    icon: 'o_locked',
    label: 'Block'
  },

  list: {
    delete: {
      handle: () => Notify.create('Delete clicked!'),
      icon: 'o_delete',
      label: 'Delete'
    }
  }
}
