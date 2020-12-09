import QasAvatar, { colors } from './QasAvatar.vue'

export default {
  title: 'Components/Avatar',
  component: QasAvatar,
  argTypes: {
    textColor: {
      control: { type: 'select', options: ['', ...colors] }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasAvatar },
  template: '<qas-avatar v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  title: 'John Appleseed'
}
