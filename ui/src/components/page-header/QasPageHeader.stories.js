import QasPageHeader from './QasPageHeader.vue'

export default {
  component: QasPageHeader,
  title: 'Components/PageHeader',
  parameters: {
    docs: {
      description: {
        component: 'Creates a header with breadcrumbs.'
      }
    }
  },

  argTypes: {
    // Props
    breadcrumbs: {
      description: 'Creates breadcrumbs through array or string.'
    },

    noBreadcrumbs: {
      description: 'Disable breadcrumbs option.'
    },

    root: {
      description: 'Breadcrumbs root.'
    },

    title: {
      description: 'Header title.'
    },

    // Slots
    default: {
      description: 'Default slot.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasPageHeader },
  template: '<qas-page-header v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  title: 'Asteroids',
  root: 'home'
}
