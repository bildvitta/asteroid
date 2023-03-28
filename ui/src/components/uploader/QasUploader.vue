<template>
  <div class="qas-uploader">
    <q-uploader ref="uploader" auto-upload :class="uploaderClasses" v-bind="attributes" :factory="factory" flat :max-files="maxFiles" method="PUT" @factory-failed="factoryFailed" @uploaded="uploaded" @uploading="updateUploading(true)">
      <template #header="scope">
        <slot name="header" :scope="scope">
          <div class="flex items-center justify-between">
            <div>
              <qas-label v-bind="labelProps" />

              <div v-if="errorMessage" class="q-mt-xs text-caption text-negative">
                {{ errorMessage }}
              </div>
            </div>

            <div v-if="hasAddFile">
              <qas-btn color="primary" icon="sym_r_add" :label="addButtonLabel" :use-label-on-small-screen="false" variant="tertiary" @click="onAddButtonClick(scope)" />
            </div>
          </div>

          <!-- ------------------------------------ tags hidden -------------------------------------- -->
          <input ref="hiddenInput" :accept="attributes.accept" class="qas-uploader__input" :multiple="isMultiple" type="file">
          <qas-btn ref="buttonCleanFiles" class="hidden" @click="scope.removeUploadedFiles" />
        </slot>
      </template>

      <template #list="scope">
        <div v-if="hasGalleryCardSection" class="q-col-gutter-lg q-mt-sm row">
          <div v-for="(file, key, index) in getFilesList(scope.files, scope)" :key="index" :class="columnClasses">
            <pv-uploader-gallery-card v-bind="getUploaderGalleryCardProps({ key, scope, file, index })" />
          </div>
        </div>
      </template>
    </q-uploader>

    <slot :context="self" name="custom-upload" />
  </div>
</template>

<script>
import { uid, extend } from 'quasar'
import { NotifyError } from '../../plugins'
import { getImageSize, getResizeDimensions } from '../../helpers/images.js'
import Pica from 'pica'

import PvUploaderGalleryCard from './private/PvUploaderGalleryCard.vue'

// TODO remover
import axios from 'axios'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhZjY0Y2Q1Zi00OTlmLTExZWQtOTdjYy0wMmMxMWVlNThhODciLCJqdGkiOiIyNTE3NjdiMTdkY2RlZmIzZGQ0ZDA2ZGQ1NTEyNzNhYTBiMTIyMTNlZTNjMGY3MWNhZjczYjk4MDdmMzQ0ZWNmN2M0ZDg3YWNjMDU0NDUzYyIsImlhdCI6MTY3ODQ2NDk4NS4xMjI5LCJuYmYiOjE2Nzg0NjQ5ODUuMTIyOTAyLCJleHAiOjE3MTAwODczODUuMTA0NTA3LCJzdWIiOiI3NTYwNCIsInNjb3BlcyI6WyJwcm9maWxlIl19.jRIEGag_OgKRRD7QwP934B0ZExOgQ8lrUFMzrzcEfTIve2eHEiAcdseLXBr23onBQ2WWHSBZu_I2En2GCvjlH7iKWiMrHfpHUTdnEL__Umln20zTNhD0ze3xltS74vgAJcwRA_WQ7KaZk83li819XZ1C08hPU59I1rJqsNDoPimdkKssaeMkB_Jk2c08CgPqcJLWbR3jASbdw1mdZBn-q-TO7rzQqvaDWqwL-2YLmbk_vYnawdX1N3rqt-8bWfPgNzHCSiymdw9PQNHOCIOcxxgjMVASag-538aX85fDF0tGff5GlWmkhHeEoiWP5f5tdsLAnBoV4p-LxWRyBnnibgeeW39JsZiUv9dRnmsM2fl0BWeRROu6P8x8gBfV8OGIG9LIIzusVABSTrqoIMYkmfsrD34QQ9F3dvMltpKRxfL_7mouC4JybU1RHiWq0wyVkEFFt_dRTvjQoGL7ovKopvtkXO0DMveyFM7Gxxu37IbEn8eezMekAkFaK6uIPSh32wwTqHa3AffJPt7sU25uNKOwjKNLwZyrboECcFAM4lBlX2J8fe1bdwN4qKBOy8Tos34mgCKYqlMSRO20e73__tjP7cERm23F9J3jgmDnbeQvc6USt_0uCIcR5Qeewl0fCZmRw1HC3pjISF86IgKziQt5Zgm0ctt-x0PDGkwK2SY'

axios.defaults.baseURL = 'https://server-assistencia-tecnica.modular.dev.br/api/'
axios.defaults.headers.Authorization = `Bearer ${token}`

export default {
  name: 'QasUploader',

  components: {
    PvUploaderGalleryCard
  },

  inheritAttrs: false,

  props: {
    addButtonFn: {
      type: Function,
      default: undefined
    },

    addButtonLabel: {
      default: 'Adicionar',
      type: String
    },

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

    columns: {
      type: Object,
      default: () => ({})
    },

    dialogProps: {
      type: Object,
      default: () => ({})
    },

    entity: {
      required: true,
      type: String
    },

    error: {
      type: Boolean
    },

    errorMessage: {
      default: '',
      type: String
    },

    fields: {
      default: () => ({}),
      type: Object
    },

    formGeneratorProps: {
      default: () => ({}),
      type: Object
    },

    galleryCardProps: {
      type: Object,
      default: () => ({})
    },

    gridGeneratorProps: {
      default: () => ({}),
      type: Object
    },

    label: {
      type: String,
      default: ''
    },

    maxFiles: {
      default: undefined,
      type: Number
    },

    modelValue: {
      default: '',
      type: [String, Array, Object]
    },

    picaResizeOptions: {
      default: () => ({}),
      type: Object
    },

    readonly: {
      type: Boolean
    },

    sizeLimit: {
      default: 1280,
      type: Number
    },

    uploading: {
      type: Boolean
    },

    useDownload: {
      default: true,
      type: Boolean
    },

    useObjectModel: {
      type: Boolean
    },

    useResize: {
      default: true,
      type: Boolean
    }
  },

  emits: ['update:modelValue', 'update:uploading'],

  data () {
    return {
      hasError: false,
      hiddenInputElement: null,
      savedFiles: {},
      uploader: null
    }
  },

  computed: {
    attributes () {
      return this.$attrs
    },

    columnClasses () {
      const irregularClasses = ['col']
      const columns = this.defaultColumns

      const classes = []

      const profiles = {
        col: 'col',
        xs: 'col-xs',
        sm: 'col-sm',
        md: 'col-md',
        lg: 'col-lg',
        xl: 'col-xl'
      }

      for (const key in columns) {
        const column = columns[key]

        if (irregularClasses.includes(column)) {
          classes.push(profiles[key])
          continue
        }

        classes.push(`${profiles[key]}-${column}`)
      }

      return classes
    },

    defaultColumns () {
      return {
        ...(this.isMultiple ? { col: 12, sm: 6, md: 4, lg: 3 } : { col: 12, sm: 6 }),
        ...this.columns
      }
    },

    defaultPicaResizeOptions () {
      return {
        unsharpAmount: 160,
        unsharpRadius: 0.6,
        unsharpThreshold: 1,
        ...this.picaResizeOptions
      }
    },

    defaultUploaderGalleryCardProps () {
      const {
        fields,
        formGeneratorProps,
        galleryCardProps,
        gridGeneratorProps,
        useDownload,
        useObjectModel,
        dialogProps
      } = this.$props

      return {
        dialogProps,
        fields,
        formGeneratorProps,
        galleryCardProps,
        gridGeneratorProps,
        useDownload,
        useObjectModel,

        useMultiple: this.isMultiple
      }
    },

    hasAddFile () {
      if (this.readonly) return

      const modelLength = this.useObjectModel
        ? Object.keys(this.modelValue).length
        : this.modelValue.length

      return this.maxFiles && this.isMultiple ? modelLength < this.maxFiles : true
    },

    hasCustomUpload () {
      return this.$slots['custom-upload']
    },

    hasGalleryCardSection () {
      return (
        (this.useObjectModel ? !!Object.keys(this.modelValue).length : !!this.modelValue.length) || this.hasError
      )
    },

    hasHeaderSlot () {
      return this.$slots.header
    },

    isMultiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    },

    labelProps () {
      return {
        label: this.label,
        margin: 'none',

        ...(this.error && { color: 'negative' })
      }
    },

    self () {
      return this
    },

    uploaderClasses () {
      return this.hasCustomUpload ? 'hidden' : 'fit'
    }
  },

  mounted () {
    this.hiddenInputElement = this.$refs.hiddenInput
    this.uploader = this.$refs.uploader

    this.hiddenInputElement?.addEventListener?.('change', this.addFiles)

    if (this.useObjectModel) {
      window.addEventListener('submit-success', this.handleSubmitSuccess)
    }
  },

  unmounted () {
    this.hiddenInputElement?.removeEventListener?.('change', this.addFiles)

    if (this.useObjectModel) {
      window.removeEventListener('submit-success', this.handleSubmitSuccess)
    }
  },

  methods: {
    async addFiles () {
      const filesList = Array.from(this.hiddenInputElement.files)
      const processedFiles = []

      this.$refs.hiddenInput.value = ''

      filesList.forEach(file => processedFiles.push(this.resizeImage(file)))

      this.uploader.addFiles(await Promise.all(processedFiles))
    },

    dispatchUpload () {
      this.$refs.buttonCleanFiles.$el.click()
      this.hiddenInputElement.click()
    },

    async factory ([file]) {
      if (!this.isMultiple && !this.hasHeaderSlot) {
        this.$refs.buttonCleanFiles.$el.click()
      }

      const name = `${uid()}.${file.name.split('.').pop()}`
      const { endpoint } = await this.fetchCredentials(name) || {}

      if (!endpoint) return

      return {
        headers: [
          { name: 'Content-Type', value: file.type || 'image/jpeg' },
          { name: 'Content-Disposition', value: 'Attachment' }
        ],
        sendRaw: true,
        url: endpoint
      }
    },

    factoryFailed () {
      this.hasError = true

      this.updateUploading(false)

      NotifyError('Falha ao carregar arquivo.')
    },

    async fetchCredentials (filename) {
      try {
        // TODO voltar código comentado
        const { data } = await axios.post('/upload-credentials/', {
          // const { data } = await this.$axios.post('/upload-credentials/', {
          entity: this.entity,
          filename
        })

        return data
      } catch {}
    },

    getFilesList (uploadedFiles) {
      uploadedFiles = uploadedFiles.map((file, indexToDelete) => {
        return {
          isUploaded: true,
          url: file.xhr ? file.xhr.responseURL.split('?').shift() : '',
          name: file.name,
          indexToDelete,
          isFailed: this.isFailed(file)
        }
      })

      const pathsList = Array.isArray(this.modelValue)
        ? this.modelValue
        : (this.modelValue ? [this.modelValue] : [])

      const mergedList = [...pathsList, ...uploadedFiles]
      const files = {}

      mergedList.forEach(file => {
        if (this.useObjectModel && file.uuid) {
          files[file.uuid] = file
          return
        }

        if (file.isFailed) {
          files[file.name] = file
          return
        }

        if (typeof file === 'string') {
          const fileName = this.getFileName(file)
          files[fileName] = { url: file, isUploaded: false, name: fileName }
          return
        }

        if (file.url) {
          const fileName = this.getFileName(file.url)
          files[fileName] = file
        }
      })

      return files
    },

    getFileName (value) {
      return value.split('/').pop()
    },

    getModelValue (index) {
      if (!this.useObjectModel) return {}

      return this.isMultiple ? this.modelValue[index] || {} : this.modelValue
    },

    getUploaderGalleryCardProps ({ index, key, file, scope }) {
      const modelValue = this.getModelValue(index)

      return {
        ...this.defaultUploaderGalleryCardProps,

        currentModelValue: modelValue,
        file,
        fileKey: key,
        savedFiles: this.savedFiles,

        // eventos
        onRemove: () => this.removeFile(key, scope, file),
        onUpdateModel: value => this.updateModelValue({ index, payload: value })
      }
    },

    handleSubmitSuccess ({ detail: { entity } }) {
      if (entity === this.entity) this.setSavedFiles()
    },

    isFailed (file) {
      return file.__status === 'failed'
    },

    onAddButtonClick (scope) {
      return this.addButtonFn ? this.addButtonFn(scope) : this.$refs.hiddenInput.click()
    },

    removeFile (key, scope, file) {
      if (file.isUploaded) {
        scope.removeFile(scope.files[file.indexToDelete])
      }

      if (file.isFailed) return

      if (!this.isMultiple) {
        return this.$emit('update:modelValue')
      }

      const clonedValue = extend(true, [], this.modelValue)

      const numberIndex = this.modelValue.findIndex(file => {
        if (this.useObjectModel) {
          return file.uuid === key || file.url.includes(key)
        }

        return this.getFileName(file) === key
      })

      clonedValue.splice(numberIndex, 1)

      this.$emit('update:modelValue', clonedValue)
    },

    // Função para redimensionar imagens
    async resizeImage (file) {
      const { type } = file

      if (!this.acceptResizeTypes.includes(type) || !this.useResize) return file

      try {
        const image = new Image()
        const canvas = document.createElement('canvas')

        image.src = URL.createObjectURL(file)

        // Retorna largura e altura da original da imagem
        const { width, height } = await getImageSize(image)

        // Tamanho da imagem menor que o tamanho limite, sendo assim, não faz o resize
        if (width <= this.sizeLimit) {
          return file
        }

        // Retorna os novos tamanhos redimensionados
        const resizedDimensions = getResizeDimensions(this.sizeLimit, width, height)

        canvas.width = resizedDimensions.width
        canvas.height = resizedDimensions.height

        // Resolve problemas com cors
        image.crossOrigin = ''

        image.width = width
        image.height = height

        const pica = Pica()
        const resizedImage = await pica.resize(image, canvas, this.defaultPicaResizeOptions)
        const blob = await pica.toBlob(resizedImage, type, 0.90)

        const newFile = new File([blob], file.name, { type })

        return newFile
      } catch {
        // Caso não consiga redimensionar retorna o arquivo original
        return file
      }
    },

    setSavedFiles () {
      if (this.isMultiple) {
        this.modelValue.forEach(model => {
          const fileName = this.getFileName(model.url)

          this.savedFiles[fileName] = true
        })

        return
      }

      const fileName = this.getFileName(this.modelValue.url)

      this.savedFiles[fileName] = true
    },

    updateModelValue ({ index, payload = {} }) {
      if (!this.useObjectModel) return

      if (this.isMultiple) {
        const modelValue = [...this.modelValue]
        const value = modelValue[index]

        modelValue[index] = { ...value, ...payload }

        this.$emit('update:modelValue', modelValue)

        return
      }

      this.$emit('update:modelValue', { ...this.modelValue, ...payload })
    },

    updateUploading (uploading) {
      this.$emit('update:uploading', uploading)
    },

    uploaded (response) {
      this.hasError = false

      const fullPath = response.xhr.responseURL.split('?').shift()

      const objectValue = {
        format: response.files[0].type,
        url: fullPath,
        name: response.files[0].name
      }

      const model = this.useObjectModel ? objectValue : fullPath

      this.$emit('update:modelValue', this.isMultiple ? [...this.modelValue, model] : model || '')

      this.updateUploading(false)
    }
  }
}
</script>

<style lang="scss">
.qas-uploader {
  &__input {
    display: none;
  }

  .q-uploader {
    max-height: 100%;

    &__header {
      background-color: transparent;
      color: $grey-9;
    }

    &__list {
      min-height: 0;
      padding: 0;

      &.scroll {
        overflow: unset;
      }
    }
  }
}
</style>
