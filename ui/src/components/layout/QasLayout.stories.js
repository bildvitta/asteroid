import QasLayout from './QasLayout.vue'

export default {
  component: QasLayout,
  title: 'Components/Layout',

  parameters: {
    docs: {
      description: {
        component: 'Implementation of [QLayout](https://quasar.dev/layout/layout#introduction) with [QasAppMenu](http://localhost:6006/?path=/docs/components-appmenu--default) and [QasAppBar](http://localhost:6006/?path=/docs/components-appbar--default).'
      }
    }
  },

  argTypes: {
    // Props
    appMenuProps: {
      description: '[QasAppMenu props](http://localhost:6006/?path=/docs/components-appmenu--default).'
    },

    appBarProps: {
      description: '[QasAppBar props](http://localhost:6006/?path=/docs/components-appbar--default).'
    },

    appMenuEvents: {
      description: '[QasAppMenu events](http://localhost:6006/?path=/docs/components-appmenu--default).'
    },

    appBarEvents: {
      description: '[QasAppBar events](http://localhost:6006/?path=/docs/components-appbar--default).'
    },

    value: {
      description: 'Model value for toggle drawer.'
    },

    // Slots
    'app-bar': {
      description: 'header slot.'
    },

    'app-menu': {
      description: 'left side menu.'
    },

    default: {
      description: 'page container with router-view.'
    },

    // events
    input: {
      description: 'input model event for toggle drawer.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasLayout },
  props: Object.keys(argTypes),

  template: '<qas-layout v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  appMenuProps: {
    items: [
      {
        label: 'Dialog',
        icon: 'o_home',
        to: { path: '/dialog-form' }
      },

      {
        label: 'Teste expansivo',
        icon: 'o_edit'
      }
    ],

    modules: [
      {
        label: 'Modulo de teste',
        value: 'test',
        path: 'http://localhost:8080'
      },
      {
        label: 'Segundo modulo de teste',
        value: 'test-2',
        path: 'https://google.com'
      }
    ]
  },

  appBarProps: {
    isAuth: true,
    title: 'Some title',
    user: {
      photo: 'https://www.abc.net.au/cm/lb/6367016/data/alan2c-see-the-person-data.jpg',
      name: 'Eduardo Lima',
      email: 'eduardolima@gmail.com'
    }
  }
}
