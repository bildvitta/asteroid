import QasProfile from './QasProfile.vue'
import QasAvatar from '../avatar/QasAvatar.vue'


export default {
  title: 'Components/Profile',
  component: { QasProfile, QasAvatar },
  argTypes: {
    textColor: {
      control: { type: 'select', options: ['', ...colors] }
    }
  }
//   subcomponents: { QasAvatar }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasProfile, QasAvatar },
  template:
    `<qas-profile v-bind="$props" />`
})

export const Default = Template.bind({})
Default.args = {
    title: 'Rafael'
    
}
