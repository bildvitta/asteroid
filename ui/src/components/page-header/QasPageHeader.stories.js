import QasPageHeader from './QasPageHeader.vue'
import QasBtn from '../btn/QasBtn.vue'

export default {
  component: QasPageHeader,
  title: 'Components/PageHeader',
  parameters: {
    docs: {
      description: {
        component: 'Creates a header structure with breadcrumbs. Extends [QBreadcrumbs](https://quasar.dev/vue-components/breadcrumbs#Introduction) and [QToolbar](https://quasar.dev/vue-components/toolbar#Introduction).'
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
      description: 'Slot inside [QToolbar](https://quasar.dev/vue-components/toolbar#Introduction).',
      table: {
        type: { summary: null }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasPageHeader, QasBtn },
  template:
    `
    <div>
      <qas-page-header v-bind="$props">
        <qas-btn label="Here my default template!" />
      </qas-page-header>
    </div>
    `
})

export const Default = Template.bind({})
Default.args = {
  title: 'Asteroids title!',
  root: 'home'
}
