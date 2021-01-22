import QasAppsMenu from './QasAppsMenu.vue'

export default {
  component: QasAppsMenu,
  title: 'Components/AppsMenu',

  parameters: {
    docs: {
      description: {
        component: 'Menu button for apps ecosystem.'
      }
    }
  },

  argTypes: {
    apps: {
      description: 'List of apps with `href`, `label` and `image`.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasAppsMenu },
  props: Object.keys(argTypes),
  template:
    '<qas-apps-menu v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  apps: [
    {
      href: 'https://google.com',
      image: '//placehold.it/100',
      label: 'Company 1'
    },
    {
      href: 'https://google.com',
      image: '//placehold.it/100',
      label: 'Company 2'
    },
    {
      href: 'https://google.com',
      image: '//placehold.it/100',
      label: 'Company 3'
    },
    {
      href: 'https://google.com',
      image: '//placehold.it/100',
      label: 'Company 4'
    }
  ]
}
