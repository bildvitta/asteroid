import QasTabsGenerator from './QasTabsGenerator.vue'

export default {
  component: QasTabsGenerator,
  title: 'Components/TabsGenerator',

  parameters: {
    docs: {
      description: {
        component: 'Generates tabs dynamically. Implements [QTabs](https://quasar.dev/vue-components/tabs) e [QTab](https://quasar.dev/vue-components/tabs).'
      }
    }
  },

  argTypes: {
    // Props
    activeColor: {
      descritpion: 'The color to be attributed to the text of the active tab.',
      default: 'primary'
    },

    bgColorClass: {
      description: 'The color class to be attributed to the background of tab.',
      default: 'transparent'
    },

    colorClass: {
      description: 'The color class to be attributed to the text of all tabs.',
      default: 'text-primary'
    },

    counters: {
      description: 'Number that will appear on the badge for each tab.'
    },

    indicatorColor: {
      description: 'The color to be attributed to the indicator (the underline) of the active tab.',
      default: 'primary'
    },

    tabs: {
      description: 'Tabs list.'
    },

    value: {
      control: null,
      description: 'Selected tab.'
    },

    // Events
    input: {
      description: 'Fires when a tab is selected.'
    },

    // Slots
    default: {
      table: { disable: true }
    },

    'tab-[label]': {
      description: 'Replace entire tab.',
      table: {
        category: 'slots',
        defaultValue: { summary: null },
        type: { summary: JSON.stringify({ item: 'object' }) }
      }
    },

    'tab-slot-[label]': {
      description: 'Put a tag or a component after [QTab](https://quasar.dev/vue-components/tabs).',
      table: {
        category: 'slots',
        defaultValue: { summary: null },
        type: { summary: JSON.stringify({ item: 'object' }) }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasTabsGenerator },
  props: Object.keys(argTypes),
  template:
    '<qas-tabs-generator v-model="value" v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  counters: { tab: 2 },
  tabs: { tab1: 'tab1', tab2: 'tab2' }
}

// Dynamic
const TemplateDynamic = (args, { argTypes }) => ({
  components: { QasTabsGenerator },
  props: Object.keys(argTypes),
  template:
    `<qas-tabs-generator class="bg-primary text-white" v-bind="$props" v-model="value">
      <template v-slot:tab-tab1>
        <div>Now it's a div, not a tab!</div>
      </template>
    </qas-tabs-generator>`
})

export const Dynamic = TemplateDynamic.bind({})

Dynamic.args = {
  tabs: { tab1: 'tab1', tab2: 'tab2' }
}

Dynamic.parameters = {
  docs: {
    description: {
      story: 'Template for a specific tab:'
    }
  }
}

// AfterTabSlot
const TemplateAfterTabSlot = (args, { argTypes }) => ({
  components: { QasTabsGenerator },
  props: Object.keys(argTypes),

  template:
    `<qas-tabs-generator v-model="value" v-bind="$props" class="bg-primary text-white">
      <template v-slot:tab-slot-tab1>
        <div>I'm inside the tab!</div>
      </template>
    </qas-tabs-generator>`
})

export const AfterTabSlot = TemplateAfterTabSlot.bind({})

AfterTabSlot.args = {
  tabs: { tab1: 'tab1', tab2: 'tab2' }
}

AfterTabSlot.parameters = {
  docs: {
    description: {
      story: 'Use after slot to put something, like a badge.'
    }
  }
}
