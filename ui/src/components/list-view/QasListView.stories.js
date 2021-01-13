import QasListView from './QasListView.vue'

export default {
  component: QasListView,
  title: 'Components/ListView',

  parameters: {
    docs: {
      description: {
        component: 'test'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasListView },
  template:
    '<qas-list-view v-bind="$props"> '

})

export const Default = Template.bind({})
Default.args = {
//   tag: 'div'
}
