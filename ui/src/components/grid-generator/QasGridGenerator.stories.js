import QasGridGenerator from './QasGridGenerator.vue'

const slotDefaults = {
  table: {
    category: 'slots',
    defaultValue: {
      detail: JSON.stringify({ field: 'object' }),
      summary: '{}'
    }
  }
}

export default {
  component: QasGridGenerator,
  title: 'Components/GridGenerator',

  parameters: {
    docs: {
      description: {
        component: 'Generates a grid with header (as `fields`) and content (as `results`).'
      }
    }
  },

  argTypes: {
    // Props
    columns: {
      description: 'Define size of each column.',
      table: {
        defaultValue: { summary: '[]' }
      }
    },

    contentClass: {
      description: 'CSS classes for each result value.'
    },

    fields: {
      description: 'Define header value for each `field`.'
    },

    gutter: {
      description: 'Gutter space by Quasar convention. `q-col-gutter-{$gutter}`.'
    },

    headerClass: {
      description: 'CSS classes for each header value.'
    },

    hideEmptyResult: {
      description: 'Omits cell when result value is empty.'
    },

    result: {
      description: 'Define result value for each `field`.'
    },

    // Slots
    default: {
      table: { disable: true }
    },

    content: {
      description: 'Content value defaults.',
      ...slotDefaults
    },

    'field-[field.name]': {
      description: 'Each cell inside `fields` is a slot.',
      ...slotDefaults
    },

    header: {
      description: 'Header value defaults.',
      ...slotDefaults
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasGridGenerator },
  props: Object.keys(argTypes),
  template:
    '<qas-grid-generator v-bind="$props" />'
})

const fields = {
  name: { name: 'name', label: 'Full name', type: 'text' },
  email: { name: 'email', label: 'E-mail', type: 'email' },
  phone: { name: 'phone', label: 'Phone', type: 'text', mask: 'phone' },
  gender: { name: 'gender', label: 'Gender', type: 'text' },
  document: { name: 'document', label: 'Document', type: 'text', mask: 'document' },
  address: { name: 'address', label: 'Address', type: 'text' }
}

const result = {
  name: 'John Appleseed',
  email: 'john.appleseed@example.com',
  phone: '99999999999',
  gender: 'Male',
  document: '99999999999',
  address: '747 Austen View'
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
  columns: [],
  fields,
  result
}

Default.parameters = {
  docs: {
    source: { code: '<qas-grid-generator :field="fields" :result="result" />' }
  }
}

export const CustomColumns = Template.bind({})
CustomColumns.args = {
  columns,
  fields,
  result
}

CustomColumns.parameters = {
  docs: {
    source: { code: `<qas-grid-generator :field="fields" :result="result" :columns="${JSON.stringify(columns)}" />` }
  }
}
