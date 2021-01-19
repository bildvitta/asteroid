import QasFilters from './QasFilters.vue'

export default {
  component: QasFilters,
  title: 'Components/Filters',
  parameters: {
    docs: {
      description: {
        component: 'Extends [QFilters](https://quasar.dev/vue-components/button).'
      }
    }
  },

  argTypes: {
    // Props
    badges: {
      description: 'Shows badges.'
    },

    entity: {
      description: 'Receives API entity.'
    },

    noFilterButton: {
      description: 'Disable filter button.'
    },

    noSearch: {
      description: 'Disable search bar.'
    },

    searchPlaceholder: {
      description: 'Text for search bar placeholder.'
    },

    url: {
      description: 'Receives API url.'
    },

    searchOnType: {
      description: 'Enables type search.'
    },

    // Events
    'fetch-success': {
      description: 'Fires when occur an success fetching value.'
    },

    'fetch-error': {
      description: 'Fires when occur an error fetching value.'
    },

    // Slots
    search: {
      description: 'Search slot.'
    },

    'filter-button': {
      description: 'Filter button slot.'
    },

    default: {
      description: 'Default slot.'
    }

  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasFilters },
  template:
    '<qas-filters v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
}
