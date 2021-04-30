import QasCard from './QasCard.vue'

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
  component: QasCard,
  title: 'Components/Card',

  parameters: {
    docs: {
      description: {
        component: 'Card component.'
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
  components: { QasCard },
  props: Object.keys(argTypes),
  template:
    '<qas-card v-bind="$props" />'
})

const fields = {
  name: { name: 'name', label: 'Full name', type: 'text' },
  images: ['https://englishlive.ef.com/pt-br/blog/wp-content/uploads/sites/16/2014/07/beagle-lindo.jpg']
}

const result = {
  name: 'John Appleseed',
  email: 'john.appleseed@example.com',
  phone: '99999999999',
  gender: 'Male',
  document: '99999999999',
  address: '747 Austen View'
}

export const Default = Template.bind({})
Default.args = {
  fields,
  result
}

Default.parameters = {
  docs: {
    source: {
      code:
      '<qas-card :fields="fields" has-actions :result="result" />'
    }
  }
}
