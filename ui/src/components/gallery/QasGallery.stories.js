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
      description: 'Define a next image icon for carousel.'
    },

    carouselPrevIcon: {
      description: 'Define a previous image icon for carousel.'
    },

    imageHeight: {
      description: 'Define the height of image.'
    },

    initialPhotosQuantity: {
      description: 'Define the initial quantity of photos.'
    },

    labelShowMore: {
      description: 'Text that will show for load more photos.'
    },

    photos: {
      description: 'List of photos.'
    },

    photosQuantityToLoad: {
      description: 'Define the quantity of photos to load.'
    },
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
Default.args = {
  images
}

Default.parameters = {
  docs: {
    source: {
      code:
      '<qas-gallery :photos="images" />'
    }
  }
}
