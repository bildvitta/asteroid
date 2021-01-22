import QasPasswordInput from './QasPasswordInput.vue'

export default {
  component: QasPasswordInput,
  title: 'Components/PasswordInput',

  parameters: {
    docs: {
      description: {
        component: 'Creates a password input with strength checker.'
      }
    }
  },

  argTypes: {
    // Props
    hideStrengthChecker: {
      description: 'Hides the password strength check component.'
    },

    iconColor: {
      description: 'Color name for icon from the [Quasar Color Palette](https://quasar.dev/style/color-palette#Color-List).'
    },

    pattern: {
      description: 'Sets the pattern for the input strenght with RegExp and string.'
    },

    value: {
      description: 'Password field value.'
    },

    weak: {
      description: 'Define weak password level.'
    },

    // Events
    input: {
      description: 'Fires when the value changes.',
      table: {
        type: { summary: null }
      }
    },

    'password-success': {
      description: 'Fires when a password meets requirements.',
      table: {
        type: { summary: null }
      }
    },

    // Slots
    default: {
      description: 'Main content.',
      table: {
        type: { summary: null }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasPasswordInput },
  props: Object.keys(argTypes),

  data () {
    return { model: 'Example@321' }
  },

  template: '<qas-password-input v-model="model" v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
}
