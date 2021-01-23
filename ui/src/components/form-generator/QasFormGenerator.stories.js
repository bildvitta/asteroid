import QasFormGenerator from './QasFormGenerator.vue'

const slotDefaults = {
  table: {
    category: 'Slots',
    defaultValue: { summary: JSON.stringify({ field: 'object' }) },
    type: { summary: null }
  }
}

export default {
  component: QasFormGenerator,
  title: 'Components/FormGenerator',

  parameters: {
    docs: {
      description: {
        component: 'Generates dynamic components by passing props.'
      }
    }
  },

  argTypes: {
    value: {
      description: 'Model value.'
    },

    columns: {
      description: 'Define size of each column.',
      table: {
        defaultValue: { summary: '[] || {}' }
      }
    },

    gutter: {
      description: 'Gutter space by Quasar convention. `q-col-gutter-{$gutter}`.'
    },

    fields: {
      description: 'Fields to be dynamic generated, it\'s an object of object containing <strong>type</strong> and others components props.'
    },

    errors: {
      description: 'Each field error.'
    },

    fieldsProps: {
      description: 'You can send in this prop each field prop.'
    },

    fieldsEvents: {
      description: 'You can send in this prop each field events.'
    },

    // Events
    input: {
      description: 'Fires when model changes. Is also used by `v-model`.',
      table: {
        defaultValue: { summary: JSON.stringify({ value: 'object' }) }
      }
    },

    // slot
    default: {
      table: { disable: true }
    },

    'field-[field.name]': {
      description: 'Each field inside `fields` is a slot.',
      ...slotDefaults
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasFormGenerator },
  props: Object.keys(argTypes),
  data () {
    return {
      values: {}
    }
  },

  template:
    `
    <div>
      <qas-form-generator v-model="values" v-bind="$props" />
      Values: {{ values }}
    </div>
    `
})

const fields = {
  name: { name: 'name', label: 'Full name', type: 'text' },
  email: { name: 'email', label: 'E-mail', type: 'email' },
  phone: { name: 'phone', label: 'Phone', type: 'text', mask: 'phone' },
  gender: { name: 'gender', label: 'Gender', type: 'text' },
  document: { name: 'document', label: 'Document', type: 'text', mask: 'document' },
  address: { name: 'address', label: 'Address', type: 'text' }
}

const columns = {
  name: { col: 12, sm: 6 },
  email: { col: 12, sm: 6 },
  phone: { col: 12, sm: 6 },
  gender: { col: 12, sm: 6 },
  document: { col: 12 },
  address: { col: 12 }
}

export const Default = Template.bind({})

Default.args = {
  fields,
  columns
}
