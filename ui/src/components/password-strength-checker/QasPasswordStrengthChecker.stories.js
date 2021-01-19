import QasPasswordStrengthChecker from './QasPasswordStrengthChecker.vue'

export default {
  component: QasPasswordStrengthChecker,
  title: 'Components/PasswordStrengthChecker',

  parameters: {
    docs: {
      description: {
        component: 'Password strenght checker.'
      }
    }
  },

  argTypes: {
    // Props
    pattern: {
      description: 'Sets the pattern for the input strenght with RegExp and string.'
    },

    trackColor: {
      description: 'Color name for component\'s track from the Quasar Color Palette.'
    },

    value: {
      description: 'Password field value.'
    },

    weak: {
      description: 'Define weak password level.'
    },

    // Events
    'password-success': {
      description: 'Fires when a password meets requirements.',
      table: {
        type: { summary: null }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasPasswordStrengthChecker },
  props: Object.keys(argTypes),
  template: '<qas-password-strength-checker v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  value: 'Example@321'
}
