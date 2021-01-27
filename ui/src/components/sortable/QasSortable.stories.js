import QasSortable from './QasSortable.vue'

export default {
  component: QasSortable,
  title: 'Components/Sortable',

  parameters: {
    docs: {
      description: {
        component: 'Sort elements by drag and drop. Uses [SortableJS](https://sortablejs.github.io/Sortable/).'
      }
    }
  },

  argTypes: {
    entity: {
      description: '[VuexStoreModule](https://github.com/bildvitta/vuex-store-module) entity.'
    },

    options: {
      description: '[SortableJS](https://sortablejs.github.io/Sortable/) library options.'
    },

    results: {
      description: 'List of elements to be ordered.'
    },

    tag: {
      description: 'Component wrapper tag.'
    },

    url: {
      description: 'Ignore entity and specify another endpoint.'
    },

    // Events
    sort: {
      description: 'Fires when an element is ordered (library\'s native event).'
    },

    success: {
      description: 'Fires after sorting and API returns success.'
    },

    // Slots
    default: {
      description: 'Returns the array with the ordered data.',
      table: {
        defaultValue: { summary: '[]' },
        type: { summary: '{ sorted: Object }' }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasSortable },
  props: Object.keys(argTypes),

  // TODO template deveria aparecer com a img
  template:
    `<qas-sortable v-bind="$props" class="flex">
      <template v-slot="{ sorted }">
        <div v-for="result in sorted" :key="result.id">
          <img :src="result.photo" />
        </div>
      </template>
    </qas-sortable>`
})

export const Default = Template.bind({})

Default.args = {
  options: { animation: 700 },
  results: [
    { photo: 'https://placehold.it/150/f00', id: '1w312l' },
    { photo: 'https://placehold.it/150/0f0', id: '2y927s' },
    { photo: 'https://placehold.it/150/00f', id: '3x432q' }
  ]
}
