import QasBox from './QasBox.vue'

export default {
  component: QasBox,
  title: 'Components/Box',

  parameters: {
    docs: {
      description: {
        component: 'Simple box wrapper.'
      }
    }
  },

  argTypes: {
    formMode: {
      description: 'Changes the component style.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasBox },
  template:
    `<qas-box v-bind="$props">
      Hello, world!
    </qas-box>`
})

export const Default = Template.bind({})
Default.args = {}

export const FormMode = Template.bind({})
FormMode.args = { formMode: true }
