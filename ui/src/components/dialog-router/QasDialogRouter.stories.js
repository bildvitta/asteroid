import QasDialogRouter from './QasDialogRouter.vue'

export default {
  component: QasDialogRouter,
  title: 'Components/DialogRouter',
  parameters: {
    docs: {
      description: {
        component: 'Creates a dialog when open directly, otherwise opens as a page.'
      }
    }
  },

  argTypes: {
    // Events
    'hide-2': {
      description: 'Controls dialog\'s visibility.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasDialogRouter },
  template: '<q-btn><qas-dialog-router v-bind="$props" /></q-btn>'
})

export const Default = Template.bind({})
Default.args = {
  // route:
}
