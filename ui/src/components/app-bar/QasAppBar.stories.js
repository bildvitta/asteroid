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
        component: 'This component is responsible for creating the top bar of the application and includes space for the menu through a [QDrawer](https://quasar.dev/layout/drawer#Introduction) and for the information of the authenticated user, such as photo and name.'
      }
    }
  },

  argTypes: {
    title: {
      description: 'Title of [QToolbarTitle](https://quasar.dev/vue-components/toolbar#QToolbarTitle-API).'
    },

    user: {
      description: 'Object containing <strong>name, giveName, email, to</strong>.',
      table: {
        category: 'props'
      }
    },

    isAuth: {
      description: 'Show/hide user menu.'
    },

    brand: {
      description: 'Path of image.'
    },

    apps: {
      description: 'List of apps with `href`, `label` and `image`, used in <strong>AppsMenu</strong>.'
    },

    // slots
    // TODO o nome da prop é o mesmo do slot, não consegui definir uma descrição para cada um, precisar rever
    '[user]': {
      description: 'Slot inside user menu.',
      table: {
        category: 'slots',
        ...noSummary
      }
    },

    tools: {
      description: '[QToolbar](https://quasar.dev/vue-components/toolbar#Introduction) content.',
      table: noSummary
    },

    // events
    'toggle-menu': {
      description: 'Event trigged when clicked left menu button.',
      table: noSummary
    },

    'sign-out': {
      description: 'Event trigged when clicked user button "Sair".',
      table: noSummary
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasAppBar },
  template:
    '<qas-app-bar classs="bg-primary" v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  title: 'My title!',
  brand: '//placehold.it/100',
  isAuth: true,
  user: {
    name: 'Jon Snow',
    photo: 'https://www.abc.net.au/cm/lb/6367016/data/alan2c-see-the-person-data.jpg',
    email: 'jon-snow@email.com'
  }
}
