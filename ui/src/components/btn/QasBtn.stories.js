import QasBtn from './QasBtn.vue'

export default {
  component: QasBtn,
  title: 'Components/Btn',

  parameters: {
    docs: {
      description: {
        component: 'Extends [QBtn](https://quasar.dev/vue-components/button).'
      }
    }
  },

  argTypes: {
    color: {
      description: 'Color name for component from the [Quasar Color Palette](https://quasar.dev/style/color-palette#Color-List).'
    },

    hideMobileLabel: {
      description: 'Hides label in mobile, showing only the icon.'
    },

    noCaps: {
      description: 'Avoid turning label text into caps (which happens by default).'
    },

    unelevated: {
      description: 'Removes shadow.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasBtn },
  props: Object.keys(argTypes),
  template:
    '<qas-btn v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  label: 'Click here!'
}
