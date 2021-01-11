import QasBreakLine from './QasBreakLine.vue'

export default {
  title: 'Components/Break Line',
  component: QasBreakLine
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasBreakLine },
  template:
    `<qas-break-line v-bind="$props">
      Hello, world!
    </qas-break-line>`
})

export const Default = Template.bind({})
Default.args = {
  tag: 'div'
}
