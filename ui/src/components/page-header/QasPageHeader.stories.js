import QasPageHeader from './QasPageHeader.vue'
import QasBtn from '../btn/QasBtn.vue'

export default {
  component: QasPageHeader,
  title: 'Components/PageHeader',

  parameters: {
    docs: {
      description: {
        component: 'Page header structure with breadcrumbs, using [QToolbar](https://quasar.dev/vue-components/toolbar) and [QBreadcrumbs](https://quasar.dev/vue-components/breadcrumbs).'
      }
    }
  },

  argTypes: {
    // Props
    breadcrumbs: {
      description: 'Breadcrumbs structure.'
    },

    noBreadcrumbs: {
      description: 'Disable breadcrumbs.'
    },

    root: {
      description: 'Breadcrumbs root route.'
    },

    title: {
      description: 'Header title.'
    },

    // Slots
    default: {
      description: 'Main slot inside [QToolbar](https://quasar.dev/vue-components/toolbar).',
      table: {
        type: { summary: null }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasBtn, QasPageHeader },
  props: Object.keys(argTypes),

  template:
    `<div>
      <qas-page-header v-bind="$props">
        <qas-btn label="This is my default template!" />
      </qas-page-header>
    </div>`
})

export const Default = Template.bind({})

Default.args = {
  root: { label: 'Home', route: '/' },
  title: 'Asteroid'
}
