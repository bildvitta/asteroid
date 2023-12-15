<template>
  <div>
    <qas-gallery-card v-bind="defaultGalleryCardProps">
      <template v-if="hasGenerator" #bottom>
        <div>
          <qas-grid-generator v-if="hasGridGenerator" v-bind="defaultGridGeneratorProps" />

          <qas-form-generator v-else-if="hasFormGenerator" v-bind="defaultFormGeneratorProps" />
        </div>
      </template>
    </qas-gallery-card>

    <qas-dialog v-model="showDialog" use-form use-validation-all-at-once v-bind="dialogProps" @validate="onValidate">
      <template #description>
        <qas-form-generator v-bind="dialogFormGeneratorProps" v-model="dialogValues" />
      </template>
    </qas-dialog>
  </div>
</template>

<script>
import downloadFile from '../../../helpers/download-file.js'

export default {
  name: 'PvUploaderGalleryCard',

  inheritAttrs: false,

  props: {
    currentModelValue: {
      default: '',
      type: [String, Array, Object]
    },

    dialogProps: {
      type: Object,
      default: () => ({})
    },

    fields: {
      type: Object,
      default: () => ({})
    },

    file: {
      type: Object,
      default: () => ({})
    },

    fileKey: {
      type: String,
      default: ''
    },

    formGeneratorProps: {
      type: Object,
      default: () => ({})
    },

    galleryCardProps: {
      type: [Object, Function],
      default: () => ({})
    },

    gridGeneratorProps: {
      type: Object,
      default: () => ({})
    },

    savedFiles: {
      type: Object,
      default: () => ({})
    },

    useDownload: {
      type: Boolean
    },

    useMultiple: {
      type: Boolean
    },

    useObjectModel: {
      type: Boolean
    }
  },

  emits: ['update-model', 'remove'],

  data () {
    return {
      dialogValues: {},
      showDialog: false,
      hasErrorOnUploadedFile: false
    }
  },

  computed: {
    dialogFormGeneratorProps () {
      const { modelValue, 'onUpdate:modelValue': _, ...props } = this.defaultFormGeneratorProps

      return props
    },

    defaultFormGeneratorProps () {
      return {
        modelValue: this.currentModelValue,
        disable: this.hasError,
        columns: this.getDefaultColumns(this.formFields),

        'onUpdate:modelValue': this.updateModel,

        ...this.defaultGeneratorProps,
        ...this.formGeneratorProps
      }
    },

    normalizedCardGalleryProps () {
      const isFunction = typeof this.galleryCardProps === 'function'

      const functionPayload = {
        hasError: this.hasErrorOnUploadedFile,
        file: this.file
      }

      return (isFunction ? this.galleryCardProps(functionPayload) : this.galleryCardProps) || {}
    },

    defaultGalleryCardProps () {
      const {
        list,
        imageProps,

        buttonProps: btnProps,
        errorMessage: error,
        errorIcon: icon,

        ...actionsMenuProps
      } = this.normalizedCardGalleryProps

      /**
       * Quando hasError for "true", significa que é falha ao enviar o arquivo ao servidor (upload), e nestes casos:
       *
       * buttonProps: deve sempre ser possível excluir a imagem, por isso o disable do botão é "false".
       * errorMessage: o label do erro deve ser "Falha ao carregar arquivo."
       * errorIcon: o ícone do erro deve ser "sym_r_cancel".
       */
      const buttonProps = this.hasError ? { ...btnProps, disable: false } : btnProps
      const errorMessage = this.hasError ? 'Falha ao carregar arquivo.' : error || this.fileType
      const errorIcon = this.hasError ? 'sym_r_cancel' : icon

      return {
        disable: this.hasError,

        ...this.normalizedCardGalleryProps,

        errorIcon,
        errorMessage,

        imageProps: {
          ...imageProps,

          // callback para sinalizar que houve erro em arquivos já upados.
          onError: () => {
            this.hasErrorOnUploadedFile = true

            this.galleryCardProps.imageProps?.onError?.()
          }
        },

        actionsMenuProps: {
          ...actionsMenuProps,

          buttonProps: {
            disable: false,
            ...buttonProps
          },

          list: {
            ...(
              this.hasEditButton &&
              {
                edit: {
                  label: 'Editar',
                  icon: 'sym_r_edit',

                  // callback
                  handler: () => {
                    this.dialogValues = { ...this.currentModelValue }
                    this.toggleDialog()
                  }
                }
              }
            ),

            ...(
              this.hasDownloadButton &&
              {
                download: {
                  label: 'Baixar arquivo',
                  icon: 'sym_r_download',

                  // callback
                  handler: () => downloadFile(this.normalizedModelValue)
                }
              }
            ),

            destroy: {
              label: 'Excluir',
              color: 'grey-10',
              icon: 'sym_r_delete',

              // callback
              handler: () => this.$emit('remove')
            },

            ...list
          }
        },

        card: this.normalizedModelValue
      }
    },

    defaultGeneratorProps () {
      return {
        fields: this.fields,
        gutter: 'md'
      }
    },

    defaultGridGeneratorProps () {
      return {
        useEmptyResult: false,
        result: this.currentModelValue,
        columns: this.getDefaultColumns(this.gridFields),

        ...this.defaultGeneratorProps,
        ...this.gridGeneratorProps
      }
    },

    fileName () {
      return this.url ? this.url.split('/').pop() : ''
    },

    fileType () {
      return this.fileName.split('.').pop()
    },

    formFields () {
      return this.formGeneratorProps.fields
    },

    gridFields () {
      return this.gridGeneratorProps.fields
    },

    hasDownloadButton () {
      return this.useDownload && !this.hasError
    },

    hasEditButton () {
      return this.isGalleryMode && this.useObjectModel && this.hasFormFields
    },

    hasError () {
      return this.file.isFailed
    },

    hasFormFields () {
      const { fields } = this.defaultFormGeneratorProps

      return !!Object.keys(fields).length
    },

    hasFormGenerator () {
      const { fields } = this.defaultFormGeneratorProps

      return !!Object.keys(fields).length && !this.isGalleryMode
    },

    hasGenerator () {
      if (!this.useObjectModel) return false

      return (this.hasGridGenerator) || this.hasFormGenerator
    },

    hasGridGenerator () {
      const { fields } = this.defaultGridGeneratorProps
      const hasFields = !!Object.keys(fields).length

      if (!this.hasFormFields && hasFields) return true

      return this.isGalleryMode && hasFields && !this.hasError
    },

    isGalleryMode () {
      return (!('isUploaded' in this.file) || this.savedFiles[this.fileKey])
    },

    normalizedModelValue () {
      return (
        this.useObjectModel && !this.hasError
          ? this.currentModelValue

          /**
           * Quando da erro ao enviar, a url não é enviada no model, desta forma para aparecer a imagem
           * de "Falha ao enviar arquivo." é necessário que a "url" exista, então é criada uma url fake.
           *
           * Obs: esta URL fake é usada apenas para aparecer a imagem de "Falha ao enviar arquivo."
           * e não é adicionada ao model.
           */
          : { url: this.url || 'error-on-upload-file', ...this.file }
      )
    },

    url () {
      return this.defaultGalleryCardProps?.card?.url
    }
  },

  methods: {
    getDefaultColumns (fields) {
      fields ??= this.fields

      const columns = {}

      for (const key in fields) {
        columns[key] = { col: 12 }
      }

      return columns
    },

    getFileName (value) {
      return value.split('/').pop()
    },

    onValidate (isValid) {
      if (!isValid) return

      this.toggleDialog()
      this.updateModel(this.dialogValues)
    },

    toggleDialog () {
      this.showDialog = !this.showDialog
    },

    updateModel (value) {
      this.$emit('update-model', value)
    }
  }
}
</script>
