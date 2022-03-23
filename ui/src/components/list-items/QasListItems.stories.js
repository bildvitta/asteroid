import QasListItems from './QasListItems.vue'

const slotDefaults = {
  defaultValue: {
    detail: JSON.stringify({
      item: 'object',
      index: 'number'
    }),
    summary: '{}'
  },

  type: {
    summary: null
  }
}

export default {
  component: QasListItems,
  title: 'Components/ListItems',

  parameters: {
    docs: {
      description: {
        component: 'Extends [QList and QItem](https://v1.quasar.dev/vue-components/list-and-list-items#qlist-api) from quasar for creating a list of items.'
      }
    }
  },

  argTypes: {
    // Props
    iconProps: {
      description: 'Icon props.'
    },

    list: {
      description: 'Array of object.'
    },

    redirectKey: {
      control: null,
      description: 'Item key that will be the value of the redirect.'
    },

    paramKey: {
      control: null,
      description: 'Redirect parameter key.'
    },

    useIconRedirect: {
      description: 'Only redirect when clicked on icon.'
    },

    to: {
      description: 'Router config like `name`.'
    },

    // Slots

    item: {
      description: 'Main item slot.',
      table: {
        ...slotDefaults
      }
    },

    'item-section-left': {
      description: 'Left section slot.',
      table: {
        ...slotDefaults
      }
    },

    'item-section-side': {
      description: 'Side section slot (used for actions).',
      table: {
        ...slotDefaults
      }
    }
  }
}

function Generate (template) {
  return (args, { argTypes }) => ({
    components: { QasListItems },
    props: Object.keys(argTypes),
    template
  })
}

const args = {
  list: [
    {
      name: 'item 1',
      email: 'email1@example.com',
      uuid: 'uuid1'
    },
    {
      name: 'item 2',
      email: 'email2@example.com',
      uuid: 'uuid2'
    },
    {
      name: 'item 3',
      email: 'email3@example.com',
      uuid: 'uuid3'
    }
  ],

  useIconRedirect: true
}

const itemTemplate = (
  `
    <qas-list-items v-bind="$props">
      <template #item-section-left="{ item, index }">
        <div>
          name: {{ item.name }}
          index: {{ index }}
        </div>
      </template>
    </qas-list-items>
  `
)

export const Item = Generate(itemTemplate).bind({})

Item.args = args

Item.parameters = {
  docs: {
    source: {
      code: itemTemplate
    }
  }
}
