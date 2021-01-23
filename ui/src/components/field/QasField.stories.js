import QasField from './QasField.vue'

export default {
  component: QasField,
  title: 'Components/Field',

  parameters: {
    docs: {
      description: {
        component: 'Creates dynamic components based on their types, used on <strong>FormGenerator</strong>.'
      }
    }
  },

  argTypes: {
    // Props
    error: {
      description: 'Receives the error messages.'
    },

    field: {
      description: 'Receives an object containing the <strong>type</strong> and others props.'
    },

    // Events
    input: {
      description: 'Fires when model changes. Is also used by `v-model`.',
      table: {
        defaultValue: { summary: null }
      }
    }
  }
}

function templateGenerator (model) {
  return (args, { argTypes }) => ({
    components: { QasField },
    props: Object.keys(argTypes),
    data () {
      return {
        model
      }
    },
    template: '<qas-field v-model="model" v-bind="$props" />'
  })
}

const Template = templateGenerator('')

const NumberTemplate = templateGenerator(0)

const CheckboxTemplate = templateGenerator([])

const DecimalInputTemplate = templateGenerator(0)

export const Default = Template.bind({})
Default.args = {
  field: { label: 'Name', type: 'text' }
}

export const Textarea = Template.bind({})
Textarea.args = {
  field: { label: 'Textarea', type: 'textarea' }
}

export const Number = NumberTemplate.bind({})
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

export const Decimal = DecimalInputTemplate.bind({})
Decimal.args = {
  field: { label: 'Decimal', type: 'decimal' }
}

export const Money = DecimalInputTemplate.bind({})
Money.args = {
  field: { label: 'Money', type: 'money' }
}

export const Percent = DecimalInputTemplate.bind({})
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

export const Checkbox = CheckboxTemplate.bind({})
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
  field: { entity: 'posts/image', label: 'Image', type: 'upload' }
}

export const Editor = Template.bind({})
Editor.args = {
  field: { name: 'Editor', type: 'editor', value: '' }
}
