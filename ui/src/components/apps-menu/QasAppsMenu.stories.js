import QasAppsMenu from './QasAppsMenu.vue'

export default {
  component: QasAppsMenu,
  title: 'Components/AppsMenu',
  parameters: {
    docs: {
      description: {
        component: 'Menu button with list of company systems.'
      }
    }
  },

  argTypes: {
    apps: {
      description: 'List of systems containing object with <strong>href, label</strong> and <strong>image</strong>.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasAppsMenu },
  template:
    '<qas-apps-menu v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  apps: [
    {
      label: 'Company 1',
      image: '//placehold.it/100',
      href: 'https://google.com'
    },
    {
      label: 'Company 2',
      image: '//placehold.it/100',
      href: 'https://google.com'
    },
    {
      label: 'Company 3',
      image: '//placehold.it/100',
      href: 'https://google.com'
    },
    {
      label: 'Company 4',
      image: '//placehold.it/100',
      href: 'https://google.com'
    }
  ]
}
