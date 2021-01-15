import QasTableGenerator from './QasTableGenerator.vue'

export default {
  component: QasTableGenerator,
  title: 'Components/TableGenerator',
  parameters: {
    docs: {
      description: {
        component: 'Extends [QTable](https://quasar.dev/vue-components/table#Introduction).'
      }
    }
  },

  argTypes: {
    fields: {
      description: 'Object of object, must contain <strong>name, label and type</strong>.',
      table: {
        defaultValue: { summary: {} }
      }
    },

    results: {
      description: 'Array of object containing the same keys as the <strong>fields</strong> keys object.'
    },

    columns: {
      description: 'Set table columns.'
    },

    rowKey: {
      description: 'Property of each row that defines the unique key of each row (the result must be a primitive, not Object, Array, etc).'
    },

    order: {
      table: {
        disable: true
      }
    },

    // slots
    default: {
      table: {
        disable: true
      }
    },

    body: {
      description: 'Slot to define how a body row looks like; Suggestion: QTr + Td. Check [QTable](https://quasar.dev/vue-components/table#Introduction) docs.',
      table: {
        type: { summary: null },
        category: 'Slots'
      }
    },

    'body-cell-[field.name]': {
      description: 'Slot to define how a specific column cell looks like; replace "[name]" with column name (from columns definition object). Check [QTable](https://quasar.dev/vue-components/table#Introduction) docs.',
      table: {
        category: 'Slots'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasTableGenerator },
  template:
    '<qas-table-generator v-bind="$props" />'
})

const fields = {
  name: { name: 'name', label: 'Full name', type: 'text' },
  email: { name: 'email', label: 'E-mail', type: 'email' },
  phone: { name: 'phone', label: 'Phone', type: 'text' },
  gender: { name: 'gender', label: 'Gender', type: 'text' },
  document: { name: 'document', label: 'Document', type: 'text', mask: 'document' },
  address: { name: 'address', label: 'Address', type: 'text' }
}

const results = [
  {
    name: 'Jon Snow',
    email: 'jon-snow@email.com',
    phone: '99999999999',
    gender: 'male',
    document: '99999999999',
    address: '747 Austen View'
  },
  {
    name: 'Jon Snow 2',
    email: 'jon-snow2@email.com',
    phone: '99999999999',
    gender: 'male',
    document: '99999999999',
    address: '747 Austen View'
  },
  {
    name: 'Jon Snow 3',
    email: 'jon-snow3@email.com',
    phone: '99999999999',
    gender: 'male',
    document: '99999999999',
    address: '747 Austen View'
  }
]

const columns = [
  'name',
  'email',
  'phone',
  'gender',
  'document',
  'address'
]

export const Default = Template.bind({})
Default.args = {
  columns,
  fields,
  results
}
