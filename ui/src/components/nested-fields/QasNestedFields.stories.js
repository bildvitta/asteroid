import QasNestedFields from './QasNestedFields.vue'

export default {
  component: QasNestedFields,
  title: 'Components/NestedFields',

  parameters: {
    docs: {
      description: {
        component: 'Component for nested fields.'
      }
    }
  },

  argTypes: {
    // Props
    addInputLabel: {
      description: 'Label of add input.'
    },

    btnDestroyProps: {
      description: 'Props of destroy btn (not from inline actions).'
    },

    btnDuplicateProps: {
      description: 'Props of duplicate btn (not from inline actions).'
    },

    destroyKey: {
      description: 'Key identifier to destroy the field.'
    },

    errors: {
      description: 'Each field error.'
    },

    field: {
      description: 'Nested fields'
    },

    fieldsEvents: {
      description: 'Defines each field events.'
    },

    fieldsProps: {
      description: 'Defines each field prop.'
    },

    formColumns: {
      description: 'Grid col class of each field.'
    },

    formGutter: {
      description: 'Gutter of form fields.'
    },

    rowObject: {
      description: 'Defines the default value to each field.'
    },

    useAnimation: {
      description: 'Enable animation when add and destroy a field.'
    },

    useDestroyAlways: {
      description: 'Enable always destroy btn.'
    },

    useDuplicate: {
      description: 'Enable duplicate btn.'
    },

    useInlineActions: {
      description: 'Enable inline actions.'
    },

    useSingleLabel: {
      description: 'Enable only one label on component.'
    },

    value: {
      description: 'Model value.',
      control: { type: Array }
    },

    // events
    input: {
      description: 'Fires when model changes. Is also used by `v-model`.',
      table: {
        defaultValue: { summary: JSON.stringify({ value: 'array' }) }
      }
    },

    // Slots
    'add-input': {
      description: 'slot for change add input',
      table: {
        category: 'slots',
        defaultValue: {
          summary: JSON.stringify({
            add: 'function'
          })
        },
        type: { summary: null }
      }
    },

    'custom-fields': {
      description: 'If need to use some custom component you can use this slot and update the model with updateValue function.',
      table: {
        category: 'slots',
        defaultValue: {
          summary: JSON.stringify({
            index: 'number',
            modelValue: 'object',
            updateValue: 'function'
          })
        },
        type: { summary: null }
      }
    },

    'field-[field.name]': {
      description: 'Each field inside `fields` is a slot.',
      table: {
        category: 'slots',
        defaultValue: { summary: JSON.stringify({ field: 'object' }) },
        type: { summary: null }
      }
    }
  }
}

function templateGenerator (template) {
  return (args, { argTypes }) => ({
    components: { QasNestedFields },
    props: Object.keys(argTypes),

    data () {
      return {
        values: []
      }
    },

    template
  })
}

const Template = templateGenerator(
  `<div>
    <qas-nested-fields v-bind="$props" v-model="values" />
    <pre>{{ values }}</pre>
  </div>`
)

const defaults = {
  field: {
    name: 'nested',
    type: 'nested',
    label: 'Meu nested',
    children: {
      name: {
        name: 'name',
        type: 'text',
        label: 'Nome'
      },
      email: {
        name: 'email',
        type: 'email',
        label: 'E-mail'
      },
      cities: {
        name: 'cities',
        type: 'select',
        label: 'cities',
        multiple: true,
        options: [
          { label: 'City 1', value: 1 },
          { label: 'City 2', value: 2 },
          { label: 'City 3', value: 3 }
        ]
      }
    }
  },

  btnDestroyProps: {
    label: 'Remover',
    icon: 'o_cancel',
    flat: true,
    hideMobileLabel: true,
    dense: true
  },

  btnDuplicateProps: {
    label: 'Duplicar',
    icon: 'o_content_copy',
    flat: true,
    hideMobileLabel: true,
    dense: true
  }
}

export const Default = Template.bind({})
Default.args = {
  ...defaults
}

export const Error = Template.bind({})
Error.args = {
  ...defaults,
  errors: [
    {
      name: 'name is required',
      email: 'email is required',
      cities: 'cities is required'
    }
  ]
}

const customFieldsTemplate = (
  `<div>
    <qas-nested-fields v-bind="$props" v-model="values">
      <template v-slot:custom-fields="{ updateValue, index, modelValue }">
        <q-select v-model="modelValue.colors" :options="['blue', 'green', 'black', 'white']" @input="updateValue(modelValue, index)" />
      </template>
    </qas-nested-fields>
    <pre>{{ values }}</pre>
  </div>`
)

export const CustomFields = templateGenerator(customFieldsTemplate)

CustomFields.args = {
  ...defaults,
  rowObject: {
    name: '',
    email: '',
    cities: [],
    colors: ''
  }
}

CustomFields.parameters = {
  docs: {
    source: { code: customFieldsTemplate }
  }
}
