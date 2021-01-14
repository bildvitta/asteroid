import QasTabsGenerator from './QasTabsGenerator.vue'

const descriptionTabs = `Component to generate Tabs dynamically.
                         This component implements [QTabs](https://quasar.dev/vue-components/tabs#QTabs-API) e [QTab](https://quasar.dev/vue-components/tabs#Introduction)`

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
      description: 'Marks the tab as selected',
      control: null
    },

    // Slots
    DefaultTab: {
      name: 'Tab-dynamicName',
      description: 'Escopo com nome dinamico possível acessar pelo label do obj. Neste slot você substitui o tab inteiro.',
      table: {
        type: {
          summary: 'Escope: { item: Object }'
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
          summary: 'Escope: { item: Object }'
        },
        defaultValue: {
          summary: null
        },
        category: 'Slots'
      }
    },

    // event
    input: {
      description: 'fires when selecting a tab'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasTabsGenerator },
  template:
    '<qas-tabs-generator v-bind="$props" v-model="value" />'
})

export const Default = Template.bind({})
Default.args = {
  tabs: { tab: 'label', tab2: 'label-2' },
  counters: { tab: 2 }
}

// Dynamic

const divTextDynamic = 'It is now a div and not a tab!'

const TemplateDynamic = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasTabsGenerator },
  template:
  `<qas-tabs-generator v-bind="$props" v-model="value">
  <template v-slot:tab-${Dynamic.args.tabs.tab}>
  <div>${divTextDynamic}</div>
  </template>
  </qas-tabs-generator>`
})

export const Dynamic = TemplateDynamic.bind({})

Dynamic.storyName = 'Dynamic'

Dynamic.args = {
  tabs: { tab: 'label', tab2: 'label-2' }
}

const codeDynamic = `
<qas-tabs-generator v-model="value">
  <template v-slot:tab-${Dynamic.args.tabs.tab}>
    <div>${divTextDynamic}</div>
  </template>
</qas-tabs-generator>`

Dynamic.parameters = {
  docs: {
    description: {
      story: 'Using template for the entire tab'
    },
    source: {
      code: codeDynamic
    }
  }
}

// Into Tab

const divTextIntoTab = 'I\'m inside the tab!'

const TemplateIntoTab = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasTabsGenerator },
  template:
  `<qas-tabs-generator v-bind="$props" v-model="value">
  <template v-slot:tab-slot-${IntoTab.args.tabs.tab}>
  <div>${divTextIntoTab}</div>
  </template>
  </qas-tabs-generator>`
})

export const IntoTab = TemplateIntoTab.bind({})

IntoTab.storyName = 'Into Tab'

IntoTab.args = {
  tabs: { tab: 'label', tab2: 'label-2' }
}

const codeIntoTab = `
<qas-tabs-generator v-model="value">
  <template v-slot:tab-slot-${IntoTab.args.tabs.tab}>
    <div>${divTextIntoTab}</div>
  </template>
</qas-tabs-generator>`

IntoTab.parameters = {
  docs: {
    description: {
      story: 'Using template for the entire tab'
    },
    source: {
      code: codeIntoTab
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
  </div
  `
})

export const ModifiedTabs = TemplateModifiedTabs.bind({})
ModifiedTabs.args = {
  tabs: { tab: 'label', tab2: 'label-2' },
  counters: { tab: 2 }
}

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
