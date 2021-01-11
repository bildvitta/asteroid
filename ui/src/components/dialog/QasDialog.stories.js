import QasDialog from './QasDialog.vue'
import QasBtn from '../btn//QasBtn.vue'

export default {
  component: QasDialog,
  title: 'Components/Dialog',
  parameters: {
    docs: {
      description: {
        component: 'Extends [Dialog](https://quasar.dev/vue-components/dialog#Introduction).'
      }
    }
  },

  argTypes: {
    color: {
      description: 'Color name for component from the [Quasar Color Palette](https://quasar.dev/style/color-palette#Color-List).',
      table: {
        type: {
          summary: null
        }
      }
    },

    hideMobileLabel: {
      description: 'Hides label in mobile, showing only the icon.'
    },

    noCaps: {
      description: 'Avoid turning label text into caps (which happens by default).'
    },

    unelevated: {
      description: 'Removes shadow.'
    },

    test: {
      table: {
        disable: true
      }
    },

    onClick: { value: true }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasDialog, QasBtn },
  template:
   (`
    <div>
      <qas-btn label="Open dialog!" @click="test = !test"/>
      <qas-dialog v-bind="$props" v-model="test" />
    </div>
   `)
})

export const Default = Template.bind({})
Default.args = {
  label: 'Click here!',
  test: false
}

const template = '<qas-dialog v-model="dialog" />'

Default.parameters = {
  docs: {
    source: { code: template }
  }
}
