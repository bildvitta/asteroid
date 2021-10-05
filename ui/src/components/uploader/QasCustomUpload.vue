<script>
import Pica from 'pica'
import { QUploader } from 'quasar'
import uploaderMixin from '../../mixins/uploader'
import QUploaderBase from 'quasar/src/components/uploader/QUploaderBase'

export default {
  name: 'QasCustomUpload',

  extends: QUploader,

  mixins: [uploaderMixin],

  data () {
    return {
      isAddingFiles: false
    }
  },

  computed: {
    // overrides "isBusy" from quasar for adding "this.isAddingFiles"
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
    // function for handling files and resize if it is an image type
    async filesHandler (file) {
      const { type } = file

      // only resize if is an image type
      if (!this.acceptResizeTypes.includes(type) || !this.useResize) return file

      try {
        // create a new image and canvas for resizing purpose
        const image = new Image()
        const canvas = document.createElement('canvas')

        image.src = URL.createObjectURL(file)

        // get the original width and height of the uploaded image
        const { width, height } = await this.getImageSize(image)

        // get the redimensioned sizes
        const resizedDimensions = this.resizeDimensions(this.sizeLimit, width, height)

        canvas.width = resizedDimensions.width
        canvas.height = resizedDimensions.height

        // fix cors issues
        image.crossOrigin = ''

        image.width = width
        image.height = height

        // get the resized canvas and transform it into a blob
        const pica = Pica()
        const resizedImage = await pica.resize(image, canvas, this.picaResizeOptionsDefault)
        const blob = await (pica.toBlob(resizedImage, type, 0.90))

        // now returns the newly formatted file
        return new File([blob], file.name, { type })
      } catch {
        // if there is an error, return the original file
        return file
      }
    },

    // overrides "__addFiles" from quasar
    async __addFiles ({ target }) {
      this.files = []
      this.isAddingFiles = true

      const filesPromise = []

      for (const file of target.files) {
        try {
          filesPromise.push(this.filesHandler(file))
          
        } catch (error) {
          console.log('cai no catch')
        }
      }

      const files = await Promise.all(filesPromise)
      this.isAddingFiles = false
      QUploaderBase.extendOptions.methods.__addFiles.call(this, null, files)
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
      return new Promise((resolve, reject) => {
        image.addEventListener('load', () => {
          resolve({ width: image.naturalWidth, height: image.naturalHeight })
        })

        image.addEventListener('error', () => reject(true))
      })
    }
  }
}
</script>
