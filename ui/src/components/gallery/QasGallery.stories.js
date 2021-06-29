import QasGallery from './QasGallery.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasGallery,
  title: 'Components/Gallery',

  parameters: {
    docs: {
      description: {
        component: 'Gallery component, with list of images and carousel.'
      }
    }
  },

  argTypes: {
    // Props
    carouselNextIcon: {
      description: 'Define the next image icon for carousel.'
    },

    carouselPreviousIcon: {
      description: 'Define the previous image icon for carousel.'
    },

    height: {
      description: 'Define the height of item.'
    },

    initialLength: {
      description: 'Define the initial quantity of items.'
    },

    items: {
      description: 'List of items.'
    },

    loadLength: {
      description: 'Define the quantity of items to load.'
    },

    showMoreLabel: {
      description: 'Text that will show for load more items.'
    },

    // Slots
    default: {
      description: 'Main content.',
      table: noSummary
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasGallery },
  props: Object.keys(argTypes),
  template:
  `<qas-box class="q-pa-lg">
    <qas-gallery :photos="images" />
  </qas-box>`
})

const images = [
  'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg'
]

export const Default = Template.bind({})
Default.args = { images }

Default.parameters = {
  docs: {
    source: {
      code:
      '<qas-gallery :photos="images" />'
    }
  }
}
