import QasDebugger from './QasDebugger.vue'

export default {
  component: QasDebugger,
  title: 'Components/Debugger',

  parameters: {
    docs: {
      description: {
        component: 'Facilitates reactive values debug (development only).'
      }
    }
  },

  argTypes: {
    inspect: {
      control: 'object',
      description: 'An array with items that will be inspected.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasDebugger },
  props: Object.keys(argTypes),
  template: '<qas-debugger v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  inspect: ['A string', 43110, ['An', 'array'], { An: 'object' }, true]
}
