import QasAvatar, { colors } from './QasAvatar.vue'

export default {
  component: QasAvatar,
  title: 'Components/Avatar',

  parameters: {
    docs: {
      description: {
        component: 'Automatic handler for [QAvatar](https://quasar.dev/vue-components/avatar).'
      }
    }
  },

  argTypes: {
    dark: {
      description: 'Enables dark mode.'
    },

    icon: {
      description: 'Icon name following Quasar convention to show when there is no image or title.'
    },

    image: {
      description: 'Image source URL.'
    },

    textColor: {
      control: { type: 'select', options: ['', ...colors] },
      description: 'Overrides text color (if needed).'
    },

    title: {
      description: 'Defines the first letter when there is no image and serves as a token for the background color.'
    },

    token: {
      description: 'Overrides default token, useful for set a random background color when there is no title.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasAvatar },
  template: '<qas-avatar v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  title: 'John Appleseed'
}
