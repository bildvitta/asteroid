import QasSettingsMenu from './QasSettingsMenu.vue'
import { Notify } from 'quasar'

export default {
  component: QasSettingsMenu,
  title: 'Components/SettingsMenu',
  parameters: {
    docs: {
      description: {
        component: 'Menu that list settings and trigger a function when clicked.'
      }
    }
  },

  argTypes: {
    list: {
      description: 'List of settings, it\'s a object of objects containing <strong>label, icon, props</strong> and for handle event click use key <strong>handle</strong> containing a function'
    },

    label: {
      description: 'Button label'
    },

    // slots
    '[dynamic-name]': {
      description: 'Each <strong>key</strong> inside prop <strong>list</strong> it\'s a name of <strong>slot</strong>',
      table: {
        defaultValue: { summary: '{ item: \'string\' }' },
        category: 'Slots'
      }
    },

    default: {
      table: {
        disable: true
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasSettingsMenu },
  template:
    '<qas-settings-menu v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  list: {
    delete: {
      icon: 'o_delete',
      label: 'Delete',
      handle: () => Notify.create('Delete clicked!')
    },

    block: {
      icon: 'o_locked',
      label: 'Block',
      handle: () => Notify.create('Block clicked!')
    }
  }
}
