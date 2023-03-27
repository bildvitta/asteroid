<template>
  <div>
    <qas-gallery-card v-bind="defaultGalleryCardProps">
      <!-- este template é para quando existe um erro carregar uma imagem de um arquivo como PDF, DOCX. -->
      <template #image-error>
        <div class="text-uppercase" :class="errorClasses">
          {{ fileType }}
        </div>
      </template>

      <!-- este template é para quando existe um erro ao fazer um UPLOAD! -->
      <template v-if="hasError" #image>
        <div :class="errorClasses">
          <div>
            <div class="text-center">
              <q-icon name="sym_r_cancel" size="sm" />
            </div>

            <div class="q-mt-sm">
              Falha ao carregar arquivo
            </div>
          </div>
        </div>
      </template>

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
    dialogProps: {
      type: Object,
      default: () => ({})
    },

    galleryCardProps: {
      type: Object,
      default: () => ({})
    },

    fields: {
      type: Object,
      default: () => ({})
    },

    formGeneratorProps: {
      type: Object,
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

    useObjectModel: {
      type: Boolean
    },

    useMultiple: {
      type: Boolean
    },

    file: {
      type: Object,
      default: () => ({})
    },

    fileKey: {
      type: String,
      default: ''
    },

    currentModelValue: {
      default: '',
      type: [String, Array, Object]
    }
  },

  emits: ['update-model', 'remove'],

  data () {
    return {
      showDialog: false,
      dialogValues: {}
    }
  },

  computed: {
    dialogFormGeneratorProps () {
      const { modelValue, 'onUpdate:modelValue': _, ...props } = this.defaultFormGeneratorProps

      return props
    },

    defaultGeneratorProps () {
      return {
        fields: this.fields,
        gutter: 'md'
      }
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

    defaultGridGeneratorProps () {
      return {
        useEmptyResult: false,
        result: this.currentModelValue,
        columns: this.getDefaultColumns(this.gridFields),

        ...this.defaultGeneratorProps,
        ...this.gridGeneratorProps
      }
    },

    defaultGalleryCardProps () {
      const { list, buttonProps, ...actionsMenuProps } = this.galleryCardProps.actionsMenuProps || {}

      return {
        ...this.galleryCardProps,
        disable: this.hasError,

        actionsMenuProps: {
          buttonProps: {
            disable: false,
            ...buttonProps
          },

          ...actionsMenuProps,

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
              color: 'grey-9',
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

    normalizedModelValue () {
      return this.useObjectModel && !this.hasError ? this.currentModelValue : this.file
    },

    url () {
      return this.defaultGalleryCardProps?.card?.url
    },

    fileName () {
      return this.url.split('/').pop()
    },

    fileType () {
      return this.fileName.split('.').pop()
    },

    errorClasses () {
      return [
        'bg-grey-4',
        'flex',
        'full-height',
        'full-width',
        'items-center',
        'justify-center',
        'text-grey-9',
        'text-subtitle2'
      ]
    },

    formFields () {
      return this.formGeneratorProps.fields
    },

    gridFields () {
      return this.gridGeneratorProps.fields
    },

    isGalleryMode () {
      return (!('isUploaded' in this.file) || this.savedFiles[this.fileKey])
    },

    hasError () {
      return this.file.isFailed
    },

    hasEditButton () {
      return this.isGalleryMode && this.useObjectModel && this.hasFormFields
    },

    hasDownloadButton () {
      return this.useDownload && !this.hasError
    },

    hasGridGenerator () {
      const { fields } = this.defaultGridGeneratorProps
      const hasFields = !!Object.keys(fields).length

      if (!this.hasFormFields && hasFields) return true

      return this.isGalleryMode && hasFields && !this.hasError
    },

    hasFormGenerator () {
      const { fields } = this.defaultFormGeneratorProps

      return !!Object.keys(fields).length && !this.isGalleryMode
    },

    hasGenerator () {
      if (!this.useObjectModel) return false

      return (this.hasGridGenerator) || this.hasFormGenerator
    },

    hasFormFields () {
      const { fields } = this.defaultFormGeneratorProps
      return !!Object.keys(fields).length
    }
  },

  methods: {
    getFileName (value) {
      return value.split('/').pop()
    },

    getDefaultColumns (fields) {
      fields ??= this.fields

      const columns = {}

      for (const key in fields) {
        columns[key] = { col: 12 }
      }

      return columns
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
