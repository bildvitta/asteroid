import QasAppBar from './QasAppBar.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasAppBar,
  title: 'Components/AppBar',

  parameters: {
    docs: {
      description: {
        component: 'Creates application header with [QDrawer](https://quasar.dev/layout/drawer) menu and authenticated user data, such as name and photo.'
      }
    }
  },

  argTypes: {
    apps: {
      description: 'List of apps with `href`, `image` and `label`. Used by QasAppsMenu.'
    },

    brand: {
      description: 'Brand image path.'
    },

    isAuth: {
      description: 'Toggle visibility of user menu.'
    },

    title: {
      description: '[QToolbarTitle](https://quasar.dev/vue-components/toolbar#QToolbarTitle-API).'
    },

    tools: {
      description: '[QToolbar](https://quasar.dev/vue-components/toolbar) content.',
      table: noSummary
    },

    user: {
      description: 'User object with `name`, `giveName`, `email` and `to` keys.',
      table: { ...noSummary, category: 'props' }
    },

    // Events
    'sign-out': {
      description: 'Fires when click on sign out button.',
      table: noSummary
    },

    'toggle-menu': {
      description: 'Fires when click on app menu button.',
      table: noSummary
    },

    // Slots
    // TODO: o nome da prop é o mesmo do slot, não consegui definir uma descrição para cada um, precisar rever
    // Caio aqui: Vamos mudar o nome do slot para user-menu.
    '[user]': {
      description: 'User menu slot.',
      table: {
        category: 'slots',
        ...noSummary
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasAppBar },
  props: Object.keys(argTypes),
  template:
    '<qas-app-bar v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  brand: '//placehold.it/100',
  isAuth: true,
  title: 'My Title',
  user: {
    email: 'jon-snow@email.com',
    name: 'Jon Snow',
    photo: 'https://www.abc.net.au/cm/lb/6367016/data/alan2c-see-the-person-data.jpg'
  }
}
