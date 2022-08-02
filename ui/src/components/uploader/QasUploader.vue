<template>
  <q-field borderless class="qas-uploader" :error="hasErrorMessage" :error-message="errorMessage" :hint="hintValue" no-error-icon>
    <q-uploader ref="uploader" auto-upload bordered :class="uploaderClasses" :factory="factory" flat :max-files="maxFiles" method="PUT" :readonly="readonly" v-bind="attributes" @factory-failed="factoryFailed" @uploaded="uploaded" @uploading="updateUploading(true)">
      <template #header="scope">
        <slot name="header" :scope="scope">
          <div class="flex flex-center full-width justify-between no-border no-wrap q-gutter-xs q-pa-sm text-white transparent">
            <q-spinner v-if="scope.isUploading" size="24px" />

            <div class="col column items-start justify-center">
              <div v-if="$attrs.label" class="q-uploader__title">{{ $attrs.label }}</div>
              <div v-if="scope.files.length" class="q-uploader__subtitle">
                {{ scope.uploadProgressLabel }} ({{ scope.uploadSizeLabel }})
              </div>
            </div>

            <qas-btn v-if="showAddFile" ref="buttonUpload" color="white" dense flat icon="o_add" round @click="$refs.hiddenInput.click()" />

            <input ref="hiddenInput" :accept="attributes.accept" class="qas-uploader__input" :multiple="isMultiple" type="file">

            <qas-btn ref="buttonCleanFiles" class="hidden" color="white" @click="scope.removeUploadedFiles" />
            <qas-btn v-if="scope.canUpload" color="white" dense flat icon="o_cloud_upload" round @click="scope.upload" />
            <qas-btn v-if="scope.isUploading" color="white" dense flat icon="o_clear" round @click="scope.abort" />
          </div>
        </slot>
      </template>

      <template #list="scope">
        <slot name="list" :scope="scope">
          <div class="col-12 q-col-gutter-md row">
            <div v-for="(file, index) in getFilesList(scope.files, scope)" :key="index" class="row" :class="itemClass">
              <qas-avatar class="q-mr-sm" color="contrast-primary" icon="o_attach_file" :image="file.url" rounded :text-color="getColorFileIcon(file)" />

              <div class="col items-center no-wrap row">
                <div class="column no-wrap" :class="{ col: isMultiple }">
                  <div class="ellipsis" :class="getFileNameClass(file.isFailed)">{{ file.name }}</div>
                  <div v-if="file.isUploaded" class="text-caption">{{ file.progressLabel }} ({{ file.sizeLabel }})</div>
                </div>
                <div class="items-center q-ml-sm row">
                  <q-icon v-if="file.isFailed" color="negative" name="o_warning" size="20px" />
                  <qas-btn v-if="!scope.readonly" dense flat icon="o_delete" round @click="removeItem(index, scope, file)" />
                </div>
              </div>
            </div>
          </div>
        </slot>
      </template>
    </q-uploader>

    <slot :context="self" name="custom-upload" />

    <template v-if="hasErrorMessage" #after>
      <q-icon color="negative" name="o_error" />
    </template>
  </q-field>
</template>

<script>
import QasAvatar from '../avatar/QasAvatar.vue'

import { uid, extend } from 'quasar'
import { NotifyError } from '../../plugins'
import { getImageSize, getResizeDimensions } from '../../helpers/images'

import Pica from 'pica'

export default {
  name: 'QasUploader',

  components: {
    QasAvatar
  },

  inheritAttrs: false,

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

    entity: {
      required: true,
      type: String
    },

    errorMessage: {
      default: '',
      type: String
    },

    hint: {
      default: '',
      type: String
    },

    maxFiles: {
      default: undefined,
      type: Number
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
    },

    readonly: {
      type: Boolean
    },

    modelValue: {
      default: '',
      type: [Array, String]
    },

    uploading: {
      type: Boolean
    },

    useObjectModel: {
      type: Boolean
    }
  },

  emits: ['update:modelValue', 'update:uploading'],

  data () {
    return {
      isFetching: false,
      isUploading: false,
      hiddenInputElement: null,
      uploader: null
    }
  },

  computed: {
    self () {
      return this
    },

    uploaderClasses () {
      return this.hasCustomUpload ? 'hidden' : 'fit'
    },

    showAddFile () {
      if (this.readonly) return

      return this.maxFiles ? this.modelValue.length < this.maxFiles : true
    },

    isMultiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    },

    hasCustomUpload () {
      return this.$slots['custom-upload']
    },

    itemClass () {
      return this.isMultiple ? 'col-12 col-md-3 col-sm-4' : 'col-12'
    },

    hintValue () {
      return this.hint || undefined
    },

    hasHeaderSlot () {
      return this.$slots.header
    },

    hasErrorMessage () {
      return !!this.errorMessage.length
    },

    attributes () {
      return {
        ...this.$attrs,
        ...this.$props
      }
    },

    defaultPicaResizeOptions () {
      return {
        unsharpAmount: 160,
        unsharpRadius: 0.6,
        unsharpThreshold: 1,
        ...this.picaResizeOptions
      }
    }
  },

  mounted () {
    this.hiddenInputElement = this.$refs.hiddenInput
    this.uploader = this.$refs.uploader

    this.hiddenInputElement?.addEventListener?.('change', this.addFiles)
  },

  unmounted () {
    this.hiddenInputElement?.removeEventListener?.('change', this.addFiles)
  },

  methods: {
    async factory ([file]) {
      if (!this.isMultiple && !this.hasHeaderSlot) {
        this.$refs.buttonCleanFiles.$el.click()
      }

      const name = `${uid()}.${file.name.split('.').pop()}`
      const { endpoint } = await this.fetchCredentials(name)

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
      this.updateUploading(false)
      NotifyError('Ops! Erro ao enviar o arquivo.')
    },

    dispatchUpload () {
      this.$refs.buttonCleanFiles.$el.click()
      this.hiddenInputElement.click()
    },

    uploaded (response) {
      const fullPath = response.xhr.responseURL.split('?').shift()

      const objectValue = {
        format: response.files[0].type,
        url: fullPath,
        name: response.files[0].name
      }

      const model = this.useObjectModel ? objectValue : fullPath

      this.$emit('update:modelValue', this.isMultiple ? [...this.modelValue, model] : model || '')

      this.updateUploading(false)

      this.$refs.hiddenInput.value = ''

      this.$qas.logger.group('QasUploader - uploaded', [this.modelValue])
    },

    async fetchCredentials (filename) {
      this.isFetching = true

      try {
        const { data } = await this.$axios.post('/upload-credentials/', {
          entity: this.entity,
          filename
        })

        this.$qas.logger.group(
          'QasUploader - fetchCredentials -> resposta de /upload-credentials/',
          [data]
        )

        return data
      } finally {
        this.isFetching = false
      }
    },

    removeItem (index, scope, file) {
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
          return file.uuid ? file.uuid === index : file.url.includes(index)
        }

        return this.getFileName(file) === index
      })

      clonedValue.splice(numberIndex, 1)

      this.$emit('update:modelValue', clonedValue)
    },

    getFileName (value) {
      return value.split('/').pop()
    },

    getFilesList (uploadedFiles) {
      uploadedFiles = uploadedFiles.map((file, indexToDelete) => {
        return {
          isUploaded: true,
          url: file.xhr ? file.xhr.responseURL.split('?').shift() : '',
          name: file.name,
          progressLabel: file.__progressLabel,
          sizeLabel: file.__sizeLabel,
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

      this.$qas.logger.group('QasUploader - getFilesList', [files])

      return files
    },

    getFileNameClass (isFailed) {
      return isFailed ? 'text-negative' : 'text-grey-9'
    },

    isFailed (file) {
      return file.__status === 'failed'
    },

    getColorFileIcon (file) {
      return this.isFailed(file) ? 'negative' : 'primary'
    },

    async addFiles () {
      const filesList = Array.from(this.hiddenInputElement.files)
      const processedFiles = []

      filesList.forEach(file => processedFiles.push(this.resizeImage(file)))
      this.uploader.addFiles(await Promise.all(processedFiles))
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

        if (width <= this.sizeLimit) {
          this.$qas.logger.info(`
            QasUploader - resizeImage -> Tamanho da imagem menor que o tamanho limite,
            sendo assim, não faz o resize
          `)

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

        this.$qas.logger.group('QasUploader - resizeImage -> nova imagem', [newFile])

        return newFile
      } catch {
        // Caso não consiga redimensionar retorna o arquivo original
        return file
      }
    },

    updateUploading (uploading) {
      this.$emit('update:uploading', uploading)
    }
  }
}
</script>

<style lang="scss">
.qas-uploader {
  &__input {
    display: none;
  }
}
</style>
