import QasAvatar from './QasAvatar.vue'

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
    color: {
      description: 'Set the main color.'
    },

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
      description: 'Overrides text color (if needed).'
    },

    title: {
      description: 'Defines the first letter.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasAvatar },
  props: Object.keys(argTypes),
  template: '<qas-avatar v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  title: 'John Appleseed'
}
