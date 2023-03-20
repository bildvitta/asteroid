<template>
  <div borderless class="qas-uploader" :error="hasErrorMessage" :error-message="errorMessage" :hint="hintValue" no-error-icon>
    <!-- <pre>{{ addedFiles }}</pre> -->
    <q-uploader ref="uploader" auto-upload :class="uploaderClasses" :factory="factory" flat :max-files="maxFiles" method="PUT" :readonly="readonly" v-bind="attributes" @factory-failed="factoryFailed" @uploaded="uploaded" @uploading="updateUploading(true)">
      <template #header="scope">
        <slot name="header" :scope="scope">
          <div class="flex items-center justify-between q-mb-xl">
            <div class="text-subtitle1">Documentos</div>

            <div>
              <qas-btn color="primary" icon="sym_r_add" label="Adicionar novo arquivo" variant="tertiary" @click="$refs.hiddenInput.click()" />
            </div>
          </div>

          <!-- ------------------------------------ tags hidden -------------------------------------- -->
          <input ref="hiddenInput" :accept="attributes.accept" class="qas-uploader__input" :multiple="isMultiple" type="file">
          <qas-btn ref="buttonCleanFiles" class="hidden" @click="scope.removeUploadedFiles" />
        </slot>
      </template>

      <template #list="scope">
        <pre>{{ addedFiles }}</pre>
        <div v-if="modelValue" class="q-col-gutter-lg row">
          <div v-for="(file, key, index) in getFilesList(scope.files, scope)" :key="index" :class="columnClasses">
            <pv-uploader-gallery-card v-model="model" :index="index" v-bind="getUploaderGalleryCardProps({ key, scope, file, index })">
              <template v-for="(_, name) in $slots" #[name]="context">
                <slot :name="name" v-bind="context || {}" />
              </template>
            </pv-uploader-gallery-card>
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
import downloadFile from '../../helpers/download-file.js'
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

    actionsMenuProps: {
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

    gridGeneratorProps: {
      default: () => ({}),
      type: Object
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
      type: [String, Array, Object]
    },

    uploading: {
      type: Boolean
    },

    useObjectModel: {
      type: Boolean
    },

    useDownload: {
      default: true,
      type: Boolean
    },

    useEdit: {
      default: true,
      type: Boolean
    },

    columns: {
      type: Object,
      default: () => ({ col: 12, sm: 6, md: 4, lg: 3 })
    }
  },

  emits: ['update:modelValue', 'update:uploading'],

  data () {
    return {
      isFetching: false,
      isUploading: false,
      hiddenInputElement: null,
      uploader: null,
      showDialog: false,
      currentKeyToEdit: '',
      addedFiles: {}
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
    },

    hasFormGenerator () {
      return !!Object.keys(this.formGeneratorProps).length
    },

    hasAddedFiles () {
      return !!Object.keys(this.addedFiles).length
    },

    defaultDialogProps () {
      return {
        ...this.dialogProps,

        onHide: () => {
          this.currentKeyToEdit = ''
        }
      }
    },

    defaultUploaderGalleryCardProps () {
      const {
        fields,
        formGeneratorProps,
        gridGeneratorProps,
        useObjectModel
      } = this.$props

      return {
        fields,
        formGeneratorProps,
        gridGeneratorProps,
        useObjectModel,

        currentKey: this.currentKeyToEdit,
        dialogProps: this.defaultDialogProps,
        useMultiple: this.isMultiple
      }
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.$emit('update:modelValue', value)
      }
    },

    columnClasses () {
      const irregularClasses = ['col']

      const classes = []

      const profiles = {
        col: 'col',
        xs: 'col-xs',
        sm: 'col-sm',
        md: 'col-md',
        lg: 'col-lg',
        xl: 'col-xl'
      }

      for (const key in this.columns) {
        const column = this.columns[key]

        if (irregularClasses.includes(column)) {
          classes.push(profiles[key])
          continue
        }

        classes.push(`${profiles[key]}-${column}`)
      }

      return classes
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
      const { files: [file] } = response

      const objectValue = {
        format: response.files[0].type,
        url: fullPath,
        name: response.files[0].name
      }

      const model = this.useObjectModel ? objectValue : fullPath

      console.log(file, '>>> upado')

      if (this.useObjectModel) {
        this.addedFiles[file.name] = true
        // this.addedFiles[objectValue.name] = true
      }

      this.$emit('update:modelValue', this.isMultiple ? [...this.modelValue, model] : model || '')

      this.updateUploading(false)
    },

    async fetchCredentials (filename) {
      this.isFetching = true

      try {
        // TODO voltar código comentado
        const { data } = await axios.post('/upload-credentials/', {
          // const { data } = await this.$axios.post('/upload-credentials/', {
          entity: this.entity,
          filename
        })

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
          return file.uuid === index || file.url.includes(index)
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

      return files
    },

    getFileNameClass (isFailed) {
      return isFailed ? 'text-negative' : 'text-grey-9'
    },

    isFailed (file) {
      return file.__status === 'failed'
    },

    getColorFileIcon (file) {
      return this.isFailed(file) ? 'negative' : 'white'
    },

    async addFiles () {
      const filesList = Array.from(this.hiddenInputElement.files)
      const processedFiles = []

      this.$refs.hiddenInput.value = ''

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

    updateUploading (uploading) {
      this.$emit('update:uploading', uploading)
    },

    getUploaderGalleryCardProps ({ key, scope, file, index }) {
      return {
        ...this.defaultUploaderGalleryCardProps,
        error: file.isFailed,
        galleryCardProps: this.getGalleryCardProps({ key, scope, file }),
        useGallery: !this.addedFiles[file.name]
      }
    },

    getGalleryCardProps ({ key, scope, file }) {
      const hasEdit = (
        !this.addedFiles[key] &&
        !file.isFailed &&
        this.useObjectModel &&
        this.useEdit
      )

      const hasDowload = this.useDownload && !file.isFailed

      const { list, ...actionsMenuProps } = this.actionsMenuProps

      return {
        actionsMenuProps: {
          ...actionsMenuProps,

          list: {
            ...(
              hasEdit &&
              {
                edit: {
                  label: 'Editar',
                  icon: 'sym_r_edit',

                  handler: () => {
                    this.currentKeyToEdit = key
                  }
                }
              }
            ),

            ...(
              hasDowload &&
              {
                download: {
                  label: 'Baixar arquivo',
                  icon: 'sym_r_download',

                  handler: () => downloadFile(file)
                }
              }
            ),

            destroy: {
              label: 'Excluir',
              color: 'grey-9',
              icon: 'sym_r_delete',

              handler: () => this.removeItem(key, scope, file)
            },

            ...list
          }
        },

        card: file
      }
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
  }

  .q-uploader__header {
    background-color: transparent;
    color: $grey-9;
  }

  .q-uploader__list {
    padding: 0;

    &.scroll {
      overflow: unset;
    }
  }
}
</style>
