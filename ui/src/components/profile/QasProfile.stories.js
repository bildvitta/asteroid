import QasProfile from './QasProfile.vue'

export default {
  component: QasProfile,
  title: 'Components/Profile',

  parameters: {
    docs: {
      description: {
        component: '.'
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

    fields: {
      description: 'Define header value for each `field`.'
    },

    hideStatus: {
      description: 'Show the status badge.'
    },

    list: {
      description: 'List of the fields to listed in grid.'
    },

    result: {
      description: 'Define result value for each `field`.'
    },

    subtitle: {
      description: 'Component subtitle.'
    },

    tag: {
      description: 'Type of main element.'
    },

    title: {
      description: 'Component title.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasProfile },
  props: Object.keys(argTypes),
  template:
    '<qas-profile v-bind="$props" :title="result.name" />'
})

const fields = {
  name: { name: 'name', label: 'Full name', type: 'text' },
  email: { name: 'email', label: 'E-mail', type: 'email' },
  phone: { name: 'phone', label: 'Phone', type: 'text', mask: 'phone' },
  gender: { name: 'gender', label: 'Gender', type: 'text' },
  document: { name: 'document', label: 'Document', type: 'text', mask: 'document' },
  address: { name: 'address', label: 'Address', type: 'text' }
}

const list = ['name', 'phone', 'gender', 'document', 'address', 'email']

const result = {
  name: 'John Appleseed',
  phone: '99999999999',
  gender: 'Male',
  document: '99999999999',
  address: '747 Austen View',
  email: 'john.appleseed@example.com'
}

const columns = {
  name: { col: 12, sm: 6 },
  phone: { col: 12, sm: 6 },
  gender: { col: 12, sm: 6 },
  document: { col: 12, sm: 6 },
  address: { col: 6 },
  email: { col: 12, sm: 6 }
}

export const Default = Template.bind({})
Default.args = {
  columns,
  fields,
  list,
  result
}

Default.parameters = {
  docs: {
    source: { code: `<qas-profile :fields="fields" :list="list" :result="result" :columns="${JSON.stringify(columns)}" />` }
  }
}

export const CustomColumns = Template.bind({})
CustomColumns.args = {
  columns,
  fields,
  list,
  result
}

CustomColumns.parameters = {
  docs: {
    source: { code: `<qas-profile :fields="fields" :list="list" :result="result" :columns="${JSON.stringify(columns)}" />` }
  }
}
