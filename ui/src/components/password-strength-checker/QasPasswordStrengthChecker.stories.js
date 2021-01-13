import QasPasswordStrengthChecker from './QasPasswordStrengthChecker.vue'

export default {
  component: QasPasswordStrengthChecker,
  title: 'Components/PasswordStrengthChecker',
  parameters: {
    docs: {
      description: {
        component: 'Creates a password strenght checker with customizable parameters.'
      }
    }
  },

  argTypes: {
    // Props
    pattern: {
      description: 'Sets the pattern for the input strenght with RegExp and string.'
    },

    veryWeak: {
      description: 'Sets the value for very weak password in numbers.'
    },

    weak: {
      description: 'Sets the value for weak password in numbers.'
    },

    value: {
      description: 'Sets the input value.'
    },

    // Events
    'password-success': {
      description: 'Indicates when a password is successful.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasPasswordStrengthChecker },
  template: '<qas-password-strength-checker v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$./!%*?&])[A-Za-z\\d@$./!%*?&]{8,}$',
  value: 'Exemple@321'
}
