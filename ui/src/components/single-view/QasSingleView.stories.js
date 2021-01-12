import QasSingleView from './QasSingleView.vue'

export default {
  component: QasSingleView,
  title: 'Components/SingleView',
  parameters: {
    docs: {
      description: {
        component: 'Creates a top-level drawer menu from an array of items.'
      }
    }
  },

  argTypes: {
    // Props
    dialog: {
      description: 'Opens component in a dialog box.'
    },

    entity: {
      description: 'Defines the component entity from store modules.'
    },

    url: {
      description: 'Defines the component API url'
    },

    customId: {
      description: 'Defines the component custom Id.'
    }

    // Events
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasSingleView },
  template:
   '<qas-single-view v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
}
