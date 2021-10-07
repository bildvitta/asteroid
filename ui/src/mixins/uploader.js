export default {
  props: {
    acceptResizeTypes: {
      default: () => [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
        'image/jpg'
      ],
      type: Array
    },

    picaResizeOptions: {
      default: () => ({}),
      type: Object
    },

    sizeLimit: {
      default: 1280,
      type: Number
    },

    useResize: {
      default: true,
      type: Boolean
    }
  }
}
