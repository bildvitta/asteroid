import QasBtn from './QasBtn.vue'

export default {
  title: 'Components/Button',
  component: QasBtn,

  argTypes: {
    noCaps: {
      name: 'noCaps',
      description: 'Boolean for caps in label'
    },

    color: {
      name: 'color',
      description: 'Receives a string for the button color'
    },

    unelevated: {
      name: 'unelevated',
      description: 'Boolean for elevation'
    },

    hideMobileLabel: {
      name: 'hideMobileLabel',
      description: 'Hides button label in mobile, showing only the icon'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasBtn },
  template:
   `
   <qas-btn v-bind="$props" />
   
    `
})

export const Default = Template.bind({})
Default.args = {
  label: 'Click Here'
}