export default {
  props: {
    acceptResizeTypes: {
      type: Array,
      default: () => [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
        'image/jpg'
      ]
    },

    picaResizeOptions: {
      type: Object,
      default: () => ({})
    },

    sizeLimit: {
      type: Number,
      default: 1280
    },

    useResize: {
      type: Boolean,
      default: true
    }
  }
}
