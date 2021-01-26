import QasTableGenerator from './QasTableGenerator.vue'

const hides = {
  table: { disable: true }
}

export default {
  component: QasTableGenerator,
  title: 'Components/TableGenerator',

  parameters: {
    docs: {
      description: {
        component: 'Extends [QTable](https://quasar.dev/vue-components/table).'
      }
    }
  },

  argTypes: {
    // Props
    columns: {
      description: 'Table columns and order.'
    },

    fields: {
      description: 'Contain fields data, as `name`, `label` and `type`.',
      table: {
        defaultValue: { summary: {} }
      }
    },

    order: hides,

    results: {
      description: 'Same keys as fields, but with results.'
    },

    rowKey: {
      description: 'Property of each row that defines the unique key of each row (the result must be a primitive, not Object, Array, etc).'
    },

    // Slots
    default: hides,

    body: {
      description: 'Slot to define how a body row looks like. Suggestion: QTr + Td. Check [QTable](https://quasar.dev/vue-components/table) docs.',
      table: {
        category: 'slots',
        type: { summary: null }
      }
    },

    'body-cell-[field.name]': {
      description: 'Slot to define how a specific column cell looks like. replace "[field.name]" with column name (from columns definition object). Check [QTable](https://quasar.dev/vue-components/table) docs.',
      table: { category: 'slots' }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasTableGenerator },
  props: Object.keys(argTypes),
  template: '<qas-table-generator v-bind="$props" />'
})

const fields = {
  name: { name: 'name', label: 'Full name', type: 'text' },
  email: { name: 'email', label: 'E-mail', type: 'email' },
  phone: { name: 'phone', label: 'Phone', type: 'text', mask: 'phone' },
  gender: { name: 'gender', label: 'Gender', type: 'text' },
  document: { name: 'document', label: 'Document', type: 'text', mask: 'document' },
  address: { name: 'address', label: 'Address', type: 'text' }
}

const results = [
  {
    name: 'John Appleseed 1',
    email: 'john.appleseed1@example.com',
    phone: '99999999999',
    gender: 'male',
    document: '99999999999',
    address: '747 Austen View'
  },
  {
    name: 'John Appleseed 2',
    email: 'john.appleseed2@example.com',
    phone: '99999999999',
    gender: 'male',
    document: '99999999999',
    address: '747 Austen View'
  },
  {
    name: 'John Appleseed 3',
    email: 'john.appleseed3@example.com',
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
