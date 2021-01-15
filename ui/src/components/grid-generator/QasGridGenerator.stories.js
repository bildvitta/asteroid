import QasGridGenerator from './QasGridGenerator.vue'

const slotDefaults = {
  table: {
    type: { summary: null },
    category: 'Slots',
    defaultValue: { summary: JSON.stringify({ field: 'object' }) }
  }
}

export default {
  component: QasGridGenerator,
  title: 'Components/GridGenerator',
  parameters: {
    docs: {
      description: {
        component: 'Generates grid with label and content by <strong>fields and result</strong>, works similar to <strong>FormGenerator</strong>.'
      }
    }
  },

  argTypes: {
    fields: {
      description: 'Object of object, must contain <strong>name, label and type</strong>.'
    },

    result: {
      description: 'Object containing the same keys as the <strong>field</strong> keys object.'
    },

    headerClass: {
      description: 'Header class.'
    },

    contentClass: {
      description: 'Content class.'
    },

    hideEmptyResult: {
      description: 'If true, when result key has no value it will be removed from grid.'
    },

    gutter: {
      description: 'Space of gutter, q-col-gutter-{<strong>gutter</strong>}.'
    },

    columns: {
      description: 'Grid column for define size of each column.',
      table: {
        defaultValue: { summary: '[]' }
      }
    },

    // slots
    default: {
      table: {
        disable: true
      }
    },

    'field-[field.name]': {
      description: 'Dynamic main field content, each key inside prop <strong>fields</strong> is a slot.',
      ...slotDefaults
    },

    header: {
      description: 'Header of each grid.',
      ...slotDefaults
    },

    content: {
      description: 'Content of each grid.',
      ...slotDefaults
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasGridGenerator },
  template:
    '<qas-grid-generator v-bind="$props" />'
})

const fields = {
  name: { name: 'name', label: 'Full name', type: 'text' },
  email: { name: 'email', label: 'E-mail', type: 'email' },
  phone: { name: 'phone', label: 'Phone', type: 'text' },
  gender: { name: 'gender', label: 'Gender', type: 'text' },
  document: { name: 'document', label: 'Document', type: 'text', mask: 'document' },
  address: { name: 'address', label: 'Address', type: 'text' }
}

const result = {
  name: 'Jon Snow',
  email: 'jon-snow@email.com',
  phone: '99999999999',
  gender: 'male',
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
  fields,
  result,
  columns: []
}

Default.parameters = {
  docs: {
    source: { code: '<qas-grid-generator :field="fields" :result="result" />' }
  }
}

export const PersonalizedColumns = Template.bind({})
PersonalizedColumns.args = {
  fields,
  result,
  columns
}

PersonalizedColumns.parameters = {
  docs: {
    source: { code: `<qas-grid-generator :field="fields" :result="result" :columns="${JSON.stringify(columns)}" />` }
  }
}
