import QasCheckboxGroup from './QasCheckboxGroup.vue'

export default {
  title: 'Components/Checkbox Group',
  component: QasCheckboxGroup
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasCheckboxGroup },
  template:
    `<qas-checkbox-group v-bind="$props" />` 
})

export const Default = Template.bind({})
Default.args = {
  options: [
    {
      label: 'checkbox exemple', value: 1,
      children: [
        { label: 'children 1', value: 1 },
        { label: 'children 2', value: 2 }
      ]
    }
  ]
}