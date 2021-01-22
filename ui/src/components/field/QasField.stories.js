import QasField from './QasField.vue'

export default {
  component: QasField,
  title: 'Components/Field',

  parameters: {
    docs: {
      description: {
        component: 'Creates a field with errors and data from a API.'
      }
    }
  },

  argTypes: {
    // Props
    error: {
      description: 'Receives the error messages.'
    },

    field: {
      description: 'Receives the API information for input field.'
    },

    // Events
    input: {
      description: 'Fires when the value changes.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasField },
  props: Object.keys(argTypes),
  template: '<qas-field v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  field: { label: 'Name', type: 'text' }
}

export const Textarea = Template.bind({})
Textarea.args = {
  field: { label: 'Textarea', type: 'textarea' }
}

export const Number = Template.bind({})
Number.args = {
  field: { label: 'Number', type: 'number' }
}

export const Hidden = Template.bind({})
Hidden.args = {
  field: { label: 'Hidden', type: 'hidden' }
}

export const Email = Template.bind({})
Email.args = {
  field: { label: 'E-mail', type: 'email' }
}

export const Password = Template.bind({})
Password.args = {
  field: { label: 'Password', type: 'password', pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ }
}

export const Decimal = Template.bind({})
Decimal.args = {
  field: { label: 'Decimal', type: 'decimal' }
}

export const Money = Template.bind({})
Money.args = {
  field: { label: 'Money', type: 'money' }
}

export const Percent = Template.bind({})
Percent.args = {
  field: { label: 'Percent', type: 'percent' }
}

export const Date = Template.bind({})
Date.args = {
  field: { label: 'Date', type: 'date' }
}

export const Datetime = Template.bind({})
Datetime.args = {
  field: { label: 'Datetime', type: 'datetime' }
}

export const Time = Template.bind({})
Time.args = {
  field: { label: 'Time', type: 'time' }
}

export const Boolean = Template.bind({})
Boolean.args = {
  field: { label: 'Boolean', default: true, type: 'boolean' }
}

export const Checkbox = Template.bind({})
Checkbox.args = {
  field: { name: 'Checkbox', label: 'Checkbox', type: 'checkbox', options: [{ label: 'Example1', value: 'Example1' }, { label: 'Example2', value: 'Example2' }] }
}

export const Radio = Template.bind({})
Radio.args = {
  field: {
    options: [{ label: 'Example1', value: 'Example1' }, { label: 'Example2', value: 'Example2' }],
    type: 'radio'
  }
}

export const Select = Template.bind({})
Select.args = {
  field: {
    options: [{ label: 'Example1', value: 'Example1' }, { label: 'Example2', value: 'Example2' }, { label: 'Example3', value: 'Example3' }, { label: 'Example4', value: 'Example4' }],
    type: 'select'
  }
}

export const Upload = Template.bind({})
Upload.args = {
  field: { accept: '.jpg,.jpeg,.png', entity: 'posts/image', label: 'Image', type: 'upload' }
}

export const Editor = Template.bind({})
Editor.args = {
  field: { name: 'Editor', type: 'editor', value: '' }
}
