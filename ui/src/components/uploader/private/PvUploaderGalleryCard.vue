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
        <slot :index="index" name="card-bottom" :update-model="updateModelValue">
          <qas-grid-generator v-if="hasGridGenerator" v-bind="defaultGridGeneratorProps" />

          <qas-form-generator v-else-if="hasFormGenerator" v-bind="defaultFormGeneratorProps" />
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
    modelValue: {
      default: '',
      type: [String, Array, Object]
    },

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

    currentKey: {
      type: String,
      default: ''
    },

    useGallery: {
      type: Boolean
    },

    index: {
      default: 0,
      type: Number
    },

    useObjectModel: {
      type: Boolean
    },

    useMultiple: {
      type: Boolean
    }
  },

  emits: ['update-model', 'update:modelValue'],

  data () {
    return {
      showDialog: false,
      dialogValues: {}
    }
  },

  computed: {
    currentModel () {
      return this.getModelValue(this.index)
    },

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

    defaultGeneratorProps () {
      return {
        columns: this.defaultColumns,
        fields: this.fields,
        gutter: 'md'
      }
    },

    defaultFormGeneratorProps () {
      return {
        // 'onUpdate:modelValue': value => this.updateModelValue({ index: this.index, value }),
        'onUpdate:modelValue': value => this.$emit('update-model', value),

        modelValue: this.currentModel,
        disable: this.error,

        ...this.defaultGeneratorProps,
        ...this.formGeneratorProps
      }
    },

    defaultGridGeneratorProps () {
      return {
        useEmptyResult: false,
        result: this.currentModel,

        ...this.defaultGeneratorProps,
        ...this.gridGeneratorProps
      }
    },

    defaultGalleryCardProps () {
      return {
        ...this.galleryCardProps,
        disable: this.error
      }
    },

    defaultColumns () {
      if (!this.fields) return

      const columns = {}

      for (const key in this.fields) {
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
    },

    hasGridGenerator () {
      const { fields } = this.defaultGridGeneratorProps
      const hasFields = !!Object.keys(fields).length

      console.log(this.useGallery && !this.error && hasFields)

      return this.useGallery && !this.error && hasFields
    },

    hasFormGenerator () {
      const { fields } = this.defaultFormGeneratorProps

      return !!Object.keys(fields).length
    }
  },

  watch: {
    currentKey (value) {
      this.showDialog = this.getFileName(this.galleryCardProps.card.url) === value

      if (this.showDialog) {
        this.dialogValues = { ...this.defaultFormGeneratorProps.modelValue }
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
      // this.updateModelValue({ index: this.index, payload: this.dialogValues })
      this.$emit('update-model', this.dialogValues)
    },

    updateModelValue ({ index, payload = {} }) {
      if (!this.useObjectModel) return

      if (this.useMultiple) {
        const modelValue = [...this.modelValue]
        const value = modelValue[index]

        modelValue[index] = { ...value, ...payload }

        this.$emit('update:modelValue', modelValue)

        return
      }

      this.$emit('update:modelValue', { ...this.modelValue, ...payload })
    },

    getModelValue (index) {
      if (!this.useObjectModel) return {}

      return this.useMultiple ? this.modelValue[index] : this.modelValue
    }
  }
}
</script>
