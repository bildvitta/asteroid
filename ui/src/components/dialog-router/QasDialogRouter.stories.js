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
    hide: {
      description: 'Controls dialog\'s visibility.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasDialogRouter },
  props: Object.keys(argTypes),
  template:
    '<qas-DialogRouter v-bind="$props" route="https://quasar.dev/"/>'
})

export const Default = Template.bind({})

Default.args = {
  label: 'Click here!'
}
