<script>
import pica from 'pica'
import { QUploader } from 'quasar'

export default {
  extends: QUploader,

  data () {
    return {
      isAddingFiles: false
    }
  },

  props: {
    picaResizeOptions: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    // overrides isBusy from quasar for adding "this.isAddingFiles"
    isBusy () {
      return this.isAddingFiles || this.promises.length > 0
    },

    picaResizeOptionsDefault () {
      return {
        unsharpAmount: 160,
        unsharpRadius: 0.6,
        unsharpThreshold: 1,
        ...this.picaResizeOptions
      }
    }
  },

  methods: {
    async filesHandler (file) {
      const { type } = file

      if (!type.includes('image')) return file

      const image = new Image()
      image.src = URL.createObjectURL(file)

      const canvas = document.createElement('canvas')
      const { width, height } = await this.getImageSize(image)
      const resizedDimensions = this.resizeDimensions(1280, width, height)

      canvas.width = resizedDimensions.width
      canvas.height = resizedDimensions.height

      image.crossOrigin = ''
      image.width = width
      image.height = height

      const resizedImage = await pica().resize(image, canvas, this.picaResizeOptionsDefault)
      const blob = await (pica().toBlob(resizedImage, type, 0.90))

      return new File([blob], file.name)
    },

    // overrides __getInputControl from quasar
    __getInputControl (h) {
      return [
        h('input', {
          ref: 'input',
          staticClass: 'q-uploader__input overflow-hidden absolute-full',
          attrs: {
            type: 'file',
            title: '', // try to remove default tooltip
            accept: this.accept,
            ...(this.multiple === true ? { multiple: true } : {})
          },
          on: {
            change: async ({ target }) => {
              this.files = []
              this.isAddingFiles = true

              const filesPromises = Array.prototype.slice.call(target.files).map(async file => {
                return await this.filesHandler(file)
              })

              const files = await Promise.all(filesPromises)
              this.isAddingFiles = false

              this.__addFiles(null, files)
            }
          }
        })
      ]
    },

    resizeDimensions (sizeLimit, width, height) {
      const factor = sizeLimit / Math.max(width, height)
      
      if (factor < 1) {
        width *= factor
        height *= factor
      }

      return {
        width: Math.round(width),
        height: Math.round(height)
      }
    },

    getImageSize (image) {
      return new Promise(resolve => {
        image.onload = () => {
          resolve({ width: image.naturalWidth, height: image.naturalHeight })
        }
      })
    }
  }
}
</script>
