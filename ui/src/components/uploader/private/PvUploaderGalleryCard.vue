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
      <template v-if="error" #image>
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

      <template #bottom>
        <slot>
          <qas-grid-generator v-if="useGallery && !error" v-bind="defaultFormGeneratorProps" :result="formGeneratorProps.modelValue" :use-empty-result="false" />

          <qas-form-generator v-else v-bind="defaultFormGeneratorProps" />
        </slot>
      </template>
    </qas-gallery-card>

    <qas-dialog v-model="showDialog" use-form use-validation-all-at-once v-bind="defaultDialogProps" @validate="onValidate">
      <template #description>
        <qas-form-generator v-bind="dialogFormGeneratorProps" v-model="dialogValues" />
      </template>
    </qas-dialog>
  </div>
</template>

<script>
export default {
  name: 'PvUploaderGalleryCard',

  props: {
    dialogProps: {
      type: Object,
      default: () => ({})
    },

    error: {
      type: Boolean
    },

    galleryCardProps: {
      type: Object,
      default: () => ({})
    },

    formGeneratorProps: {
      type: Object,
      default: () => ({})
    },

    currentKey: {
      type: String,
      default: ''
    },

    useGallery: {
      type: Boolean
    }
  },

  emits: ['update-model'],

  data () {
    return {
      showDialog: false,
      dialogValues: {}
    }
  },

  computed: {
    dialogFormGeneratorProps () {
      const { modelValue, ...props } = this.defaultFormGeneratorProps

      props['onUpdate:modelValue'] = undefined
      return props
    },

    defaultDialogProps () {
      return {
        ...this.dialogProps
      }
    },

    defaultFormGeneratorProps () {
      return {
        gutter: 'md',
        columns: this.defaultFormGeneratorColumns,

        // eventos
        'onUpdate:modelValue': value => this.$emit('update-model', value),

        ...this.formGeneratorProps,
        disable: this.error
      }
    },

    defaultGalleryCardProps () {
      return {
        ...this.galleryCardProps,
        disable: this.error
      }
    },

    hasFormGenerator () {
      return !!Object.keys(this.formGeneratorProps).length
    },

    defaultFormGeneratorColumns () {
      if (!this.hasFormGenerator) return

      const columns = {}
      const { fields } = this.formGeneratorProps || {}

      for (const key in fields) {
        columns[key] = { col: 12 }
      }

      return columns
    },

    url () {
      return this.galleryCardProps.card.url
    },

    fileName () {
      return this.url.split('/').pop()
    },

    fileType () {
      return this.fileName.split('.').pop()
    },

    errorClasses () {
      return 'bg-grey-4 flex full-height full-width items-center justify-center text-grey-9 text-subtitle2'
    }
  },

  watch: {
    currentKey (value) {
      this.showDialog = this.getFileName(this.galleryCardProps.card.url) === value

      if (this.showDialog) {
        this.dialogValues = { ...this.formGeneratorProps.modelValue }
      }
    }
  },

  methods: {
    getFileName (value) {
      return value.split('/').pop()
    },

    onValidate (isValid) {
      if (!isValid) return

      this.showDialog = false
      this.$emit('update-model', this.dialogValues)
    }
  }
}
</script>
