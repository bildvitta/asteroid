<template>
  <q-field borderless :error="error" :error-message="errorMessage" :hint="hintValue">
    <q-uploader v-bind="$attrs" auto-upload bordered :class="uploaderClass" :factory="factory" flat :max-files="maxFiles" method="PUT" :readonly="readonly" v-on="$listeners" @factory-failed="factoryFailed" @uploaded="uploaded">
      <template #header="scope">
        <div class="flex flex-center full-width justify-between no-border no-wrap q-gutter-xs q-pa-sm text-white transparent">
          <q-spinner v-if="scope.isUploading" size="24px" />

          <div class="col column items-start justify-center">
            <div v-if="scope.label" class="q-uploader__title">{{ scope.label }}</div>
            <div v-if="scope.files.length" class="q-uploader__subtitle">{{ scope.uploadProgressLabel }} ({{ scope.uploadSizeLabel }})</div>
          </div>

          <q-btn v-if="showAddFile" ref="buttonUpload" dense flat icon="o_add" round />

          <q-uploader-add-trigger v-if="showAddFile" ref="uploaderTrigger" />

          <q-btn ref="buttonCleanFiles" class="hidden" @click="scope.removeQueuedFiles" />

          <q-btn v-if="scope.canUpload" dense flat icon="o_cloud_upload" round @click="scope.upload" />
          <q-btn v-if="scope.isUploading" dense flat icon="o_clear" round @click="scope.abort" />
        </div>
      </template>

      <template #list="scope">
        <div class="col-12 q-col-gutter-md row">
          <div v-for="(file, index) in filesList(scope.files)" :key="index" class="row" :class="itemClass">
            <q-avatar v-if="isImage(file)" class="q-mr-sm" rounded>
              <img :alt="file.name" :src="file.image">
            </q-avatar>

            <q-avatar v-else class="q-mr-sm" color="grey-3" icon="o_attach_file" rounded :text-color="colorFileIcon(file)" />

            <div class="col items-center no-wrap row">
              <div class="column no-wrap" :class="{ col: isMultiple }">
                <div class="ellipsis" :class="fileNameClass(file.isFailed)">{{ file.name }}</div>
                <div v-if="file.isUploaded" class="text-caption">{{ file.progressLabel }} ({{ file.sizeLabel }})</div>
              </div>
              <div class="items-center q-ml-sm row">
                <q-icon v-if="file.isFailed" color="negative" name="o_warning" size="20px" />
                <q-btn v-if="!scope.readonly" dense flat icon="o_delete" round @click="removeItem(index, scope, file)" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </q-uploader>
    <slot :context="self" name="custom-upload" />
  </q-field>
</template>

<script>
import api from 'axios'
import { uid, extend } from 'quasar'

export default {
  props: {
    entity: {
      required: true,
      type: String
    },

    hint: {
      default: '',
      type: String
    },

    value: {
      default: '',
      type: [Array, String]
    },

    errorMessage: {
      type: String,
      default: ''
    },

    error: {
      type: Boolean
    },

    readonly: {
      type: Boolean
    },

    maxFiles: {
      type: Number,
      default: undefined
    }
  },

  data () {
    return {
      isFetching: false,
      isUploading: false
    }
  },

  computed: {
    self () {
      return this
    },

    uploaderClass () {
      return this.hasCustomUpload ? 'hidden' : 'fit'
    },

    showAddFile () {
      if (this.readonly) return

      return this.maxFiles ? this.value.length < this.maxFiles : true
    },

    isMultiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    },

    hasCustomUpload () {
      return this.$slots['custom-upload'] || this.$scopedSlots['custom-upload']
    },

    itemClass () {
      return this.isMultiple ? 'col-12 col-md-3 col-sm-4' : 'col-12'
    },

    hintValue () {
      return this.hint || undefined
    }
  },

  methods: {
    async factory ([file]) {
      const name = `${uid()}.${file.name.split('.').pop()}`
      const { endpoint } = await this.fetch(name)

      this.$refs.buttonCleanFiles.$el.click()

      return {
        headers: [{ name: 'Content-Type', value: file.type || 'image/jpeg' }],
        sendRaw: true,
        url: endpoint
      }
    },

    factoryFailed () {
      this.$notify('The file could not be sent.')
    },

    uploaded (response) {
      const fullPath = `${response.xhr.responseURL}`.split('?').shift()

      this.$emit('input', this.isMultiple ? [...this.value, fullPath] : fullPath || '')
    },

    async fetch (filename) {
      this.isFetching = true

      try {
        const { data } = await api.post('/upload-credentials/', {
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

      let valueToBeEmitted = ''

      if (this.isMultiple) {
        const clonedValue = extend(true, [], this.value)
        const numberIndex = this.value.findIndex(file => this.imageName(file) === index)
        clonedValue.splice(numberIndex, 1)
        valueToBeEmitted = clonedValue
      }

      this.$emit('input', valueToBeEmitted)
    },

    dispatchUpload () {
      this.$refs.buttonCleanFiles.$el.click()
      this.$refs.uploaderTrigger.$el.click()
    },

    imageName (value) {
      return `${value}`.split('/').pop()
    },

    filesList (uploadedFiles) {
      const pathsList = Array.isArray(this.value) ? this.value : (this.value ? [this.value] : [])

      uploadedFiles = uploadedFiles.map((file, indexToDelete) => {
        return {
          isUploaded: true,
          image: file.__img?.src,
          name: file.name,
          progressLabel: file.__progressLabel,
          sizeLabel: file.__sizeLabel,
          indexToDelete: indexToDelete,
          fullPath: file.xhr ? `${file.xhr.responseURL}`.split('?').shift() : '',
          isFailed: this.isFailed(file)
        }
      })

      const mergedList = [...pathsList, ...uploadedFiles]

      const files = {}

      mergedList.forEach(file => {
        if (file.isFailed) {
          files[file.name] = file
          return
        }

        if (typeof file === 'string') {
          const imageName = this.imageName(file)
          files[imageName] = { image: file, isUploaded: false, name: imageName }
          return
        }

        if (file.fullPath) {
          const imageName = this.imageName(file.fullPath)
          files[imageName] = file
        }
      })

      return files
    },

    fileNameClass (isFailed) {
      return isFailed ? 'text-negative' : 'text-grey-8'
    },

    isFailed (file) {
      return file.__status === 'failed'
    },

    colorFileIcon (file) {
      return this.isFailed(file) ? 'negative' : 'primary'
    },

    isImage (file) {
      const imagesExtensions = ['jpg', 'jpeg', 'png']
      const fileExtension = file.image.split('.').pop()

      return !file.isFailed && imagesExtensions.includes(fileExtension)
    }

  }
}
</script>
