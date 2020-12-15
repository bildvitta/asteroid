import QasSortable from './QasSortable.vue'

export default {
  title: 'Components/Break Line',
  component: QasSortable
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasSortable },
  template:
    `<qas-sortable v-bind="$props" />`
})

export const Default = Template.bind({})
Default.args = {
  
}