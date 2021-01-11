import QasSortable from './QasSortable.vue'

const descriptionSortable = 'This component is for sorting elements when dragged, it uses the SortableJS library: https://github.com/SortableJS/Sortable'

export default {
  title: 'Components/Sortable',
  component: QasSortable,
  parameters: {
    docs: {
      description: {
        component: descriptionSortable
      }
    }
  },

  argTypes: {
    entity: {
      description: 'Vuex Entity.',
      control: {
        type: null
      }
    },

    options: {
      description: 'Library options SortableJS.'
    },

    results: {
      description: 'List of elements to be ordered.'
    },

    tag: {
      description: 'Tag of component.'
    },

    url: {
      description: 'If the Entity is different from the endpoint, you can use this property to specify which endpoint is.'
    },

    // slot
    default: {
      table: {
        type: { summary: '{ sorted: Object }' },
        defaultValue: { summary: '[]' }
      },
      description: 'Returns the array with the ordered data.'
    },

    // event
    sort: {
      description: 'Trigger the library\'s native event, which is triggered when the element is ordered.'
    },

    success: {
      description: 'Fires when it finishes sorting and the API returns success.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasSortable },
  template:
    `<qas-sortable v-bind="$props" >
      <template v-slot="{ sorted }">
        <div v-for="result in sorted" :key="result.id"> <img :src="result.photo" /></div>
      </template>
    </qas-sortable>`
})

export const Default = Template.bind({})
Default.args = {
  results: [
    { photo: 'https://via.placeholder.com/150', id: '1w312w' },
    { photo: 'https://via.placeholder.com/150', id: '2w4312w' }
  ],
  options: { animation: 700 }
}
