import QasPasswordInput from './QasPasswordInput.vue'

export default {
  component: QasPasswordInput,
  title: 'Components/PasswordInput',
  parameters: {
    docs: {
      description: {
        component: 'Creates a password input.'
      }
    }
  },

  argTypes: {
    // Props
    value: {
      description: 'Password field value.'
    },

    hideStrengthChecker: {
      description: 'Hides the password strength check component.'
    },

    iconColor: {
      description: 'Color name for icon from the [Quasar Color Palette](https://quasar.dev/style/color-palette#Color-List).'
    },

    pattern: {
      description: 'Sets the pattern for the input strenght with RegExp and string.'
    },

    weak: {
      description: 'Define weak password level.'
    },

    // Events
    'password-success': {
      description: 'Fires when a password meets requirements.'
    },

    input: {
      description: 'Fires when the value changes.'
    },

    // Slots

    default: {
      description: 'Main content.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasPasswordInput },
  template: '<qas-password-input v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  value: 'Example@321'
}
