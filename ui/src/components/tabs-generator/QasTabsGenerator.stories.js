import QasTabsGenerator from './QasTabsGenerator.vue'

const descriptionTabs = `Component to generate Tabs dynamically.
                         This component implements [QTabs](https://quasar.dev/vue-components/tabs#QTabs-API) e [QTab](https://quasar.dev/vue-components/tabs#Introduction).`

export default {
  component: QasTabsGenerator,
  title: 'Components/TabsGenerator',

  parameters: {
    docs: {
      description: {
        component: descriptionTabs
      }
    }
  },

  argTypes: {
    // Props
    counters: {
      description: 'Badge number that will appear on the tab.'
    },

    tabs: {
      description: 'key is equivalent to the value and value of the object equivalent to the label.'
    },

    value: {
      description: 'Marks the tab as selected.',
      control: null
    },

    // Slots
    DefaultTab: {
      name: 'Tab-dynamicName',
      description: 'Scope with dynamic name can be accessed through the obj label. In this slot you replace the entire tab.',
      table: {
        type: {
          summary: 'Scope: { item: Object }'
        },
        defaultValue: {
          summary: null
        },
        category: 'Slots'
      }
    },

    default: {
      table: {
        disable: true
      }
    },

    Tab: {
      name: 'tab-slot-{label}',
      description: 'Scope with dynamic name, accessible through the obj label. In this slot you replace what is inside the tab.',
      table: {
        type: {
          summary: 'Scope: { item: Object }'
        },
        defaultValue: {
          summary: null
        },
        category: 'Slots'
      }
    },

    // event
    input: {
      description: 'Fires when selecting a tab.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasTabsGenerator },
  template:
    '<qas-tabs-generator v-bind="$props" v-model="value" class="bg-primary text-white"/>'
})

export const Default = Template.bind({})
Default.args = {
  tabs: { tab: 'label', tab2: 'label-2' },
  counters: { tab: 2 }
}

const defaultCode = '<qas-tabs-generator class="bg-primary text-white" v-model="value" :tabs="tabs" :counters="counters"/>'

Default.parameters = {
  docs: {
    source: {
      code: defaultCode
    }
  }
}

// Dynamic
const TemplateDynamic = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasTabsGenerator },
  template:
  `<qas-tabs-generator class="bg-primary text-white" v-bind="$props" v-model="value">
  <template v-slot:tab-${Dynamic.args.tabs.tab}>
  <div>It is now a div and not a tab!</div>
  </template>
  </qas-tabs-generator>`
})

export const Dynamic = TemplateDynamic.bind({})
Dynamic.storyName = 'Dynamic'
Dynamic.args = {
  tabs: { tab: 'label', tab2: 'label-2' }
}

const dynamicCode = `
<qas-tabs-generator class="bg-primary text-white" v-model="value" :tabs="tabs" :counters="counters">
  <template v-slot:tab-${Dynamic.args.tabs.tab}>
    <div>It is now a div and not a tab!</div>
  </template>
</qas-tabs-generator>`

Dynamic.parameters = {
  docs: {
    description: {
      story: 'Using template for the entire <strong>tab</strong>:'
    },
    source: {
      code: dynamicCode
    }
  }
}

// Into Tab
const TemplateIntoTab = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasTabsGenerator },
  template:
  `<qas-tabs-generator class="bg-primary text-white" v-bind="$props" v-model="value">
  <template v-slot:tab-slot-${IntoTab.args.tabs.tab}>
  <div>I'm inside the tab!</div>
  </template>
  </qas-tabs-generator>`
})

export const IntoTab = TemplateIntoTab.bind({})
IntoTab.storyName = 'Into Tab'
IntoTab.args = {
  tabs: { tab: 'label', tab2: 'label-2' }
}

const intoTabCode = `
<qas-tabs-generator class="bg-primary text-white" v-model="value" :tabs="tabs" :counters="counters">
  <template v-slot:tab-slot-${IntoTab.args.tabs.tab}>
    <div>I'm inside the tab!</div>
  </template>
</qas-tabs-generator>`

IntoTab.parameters = {
  docs: {
    description: {
      story: 'Using template to replace Tab content:'
    },
    source: {
      code: intoTabCode
    }
  }
}

// ModifiedTabs
const TemplateModifiedTabs = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasTabsGenerator },
  template: `
  <div style="background-color: black; color: white;">
    modifiedTabs: { ...tabs, test2: { label: 'test2-2', icon: 'email' } }
  </div>`
})

export const ModifiedTabs = TemplateModifiedTabs.bind({})
ModifiedTabs.args = {}

ModifiedTabs.parameters = {
  docs: {
    description: {
      story: 'If you need to pass properties for each tab individually without having to open a template, you can modify the tabs as in the modifiedTabs example. Remembering that it is necessary to pass the label.'
    },
    source: {
      code: 'modifiedTabs: { ...tabs, test2: { label: \'test2-2\', icon: \'email\' } }'
    }
  }
}
