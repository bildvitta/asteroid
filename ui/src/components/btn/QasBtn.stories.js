import QasBtn from './QasBtn.vue'

export default {
  title: 'Components/Button',
  component: QasBtn,
  parameters: {
    docs: { 
      description: { 
        component: 'Button component'
        + '<br> This component implements QBtn https://quasar.dev/vue-components/button'
      } 
    }
  },

  argTypes: {
    noCaps: {
      name: 'noCaps',
      description: 'Avoid turning label text into caps (which happens by default)'
    },

    color: {
      name: 'color',
      description: 'Color name for component from the Quasar Color Palette https://quasar.dev/style/color-palette#Color-List'
    },

    unelevated: {
      name: 'unelevated',
      description: 'Remove shadow'
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
   `<qas-btn v-bind="$props" />`
})

export const Default = Template.bind({})
Default.args = {
  label: 'Click Here'
}