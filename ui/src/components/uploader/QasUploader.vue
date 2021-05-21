<template>
  <q-field borderless :error="error" :error-message="errorMessage" :hint="hintValue">
    <q-uploader v-bind="$attrs" auto-upload bordered :class="uploaderClass" :factory="factory" flat :max-files="maxFiles" method="PUT" :readonly="readonly" v-on="$listeners" @factory-failed="factoryFailed" @uploaded="uploaded">
      <template #header="scope">
        <div class="flex flex-center full-width justify-between no-border no-wrap q-gutter-xs q-pa-sm text-white transparent">
          <q-spinner v-if="scope.isUploading" size="24px" />

          <div class="col column items-start justify-center">
            <div v-if="scope.label" class="q-uploader__title">{{ scope.label }}</div>
            <div class="q-uploader__subtitle">{{ scope.uploadProgressLabel }} ({{ scope.uploadSizeLabel }})</div>
          </div>

          <q-btn v-if="showAddFile" ref="buttonUpload" dense flat icon="o_add" round />

          <q-uploader-add-trigger v-if="showAddFile" ref="uploaderTrigger" />

          <q-btn ref="buttonCleanFiles" class="hidden" @click="scope.removeQueuedFiles" />

          <q-btn v-if="scope.canUpload" dense flat icon="o_cloud_upload" round @click="scope.upload" />
          <q-btn v-if="scope.isUploading" dense flat icon="o_clear" round @click="scope.abort" />
        </div>
      </template>

      <template #list="scope">
        <div class="full-width row">
          <div v-for="(item, index) in pathList" :key="index" class="q-pa-none q-pr-md row" :class="itemClass">
            <q-avatar v-if="isImage" class="q-mr-sm" rounded>
              <img :src="item" @error="onImageLoadedError">
            </q-avatar>

            <q-avatar v-else class="q-mr-sm" color="grey-3" icon="o_attach_file" rounded />

            <div class="col items-center no-wrap row">
              <div class="col column no-wrap" :class="{ col: isMultiple }">
                <div class="ellipsis text-black">{{ imageName(item) }}</div>
                <div class="text-caption">{{ uploadProgress(scope.files[index]) }}</div>
              </div>
              <q-btn v-if="!scope.readonly" class="text-grey-8" dense flat icon="o_delete" round @click="removeItem(index)" />
            </div>
          </div>

          <div v-for="(file, index) in failedFiles(scope.files)" :key="index" class="q-pa-none q-pr-md row" :class="itemClass">
            <q-avatar v-if="file.__img" class="q-mr-sm" rounded>
              <img :alt="file.name" :src="file.__img.src">
            </q-avatar>

            <q-avatar v-else class="q-mr-sm" color="grey-3" icon="o_attach_file" rounded text-color="negative" />

            <div class="col items-center no-wrap row">
              <div class="column no-wrap" :class="{ col: isMultiple }">
                <div class="ellipsis text-negative">{{ file.name }}</div>
                <div class="text-caption">{{ file.__progressLabel }} ({{ file.__sizeLabel }})</div>
              </div>
              <div class="items-center q-ml-sm row">
                <q-icon color="negative" name="o_warning" size="20px" />
                <q-btn dense flat icon="o_delete" round @click="scope.removeFile(file)" />
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
      isUploading: false,
      isImage: true
    }
  },

  computed: {
    self () {
      return this
    },

    uploaderClass () {
      return this.hasCustomUpload ? 'hidden' : 'fit'
    },

    pathList () {
      return Array.isArray(this.value) ? this.value : (this.value ? [this.value] : [])
    },

    showAddFile () {
      return !this.readonly &&
        (
          this.maxFiles
            ? this.value.length < this.maxFiles
            : true
        )
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

    isFileFailed (file) {
      return file.__status === 'failed'
    },

    uploadProgress (file) {
      return file && `${file.__progressLabel} (${file.__sizeLabel})`
    },

    removeItem (index) {
      let valueToBeEmitted = ''

      if (this.isMultiple) {
        const clonedValue = extend(true, [], this.value)
        clonedValue.splice(index, 1)
        valueToBeEmitted = clonedValue
      }

      this.$emit('input', valueToBeEmitted)
    },

    dispatchUpload () {
      this.$refs.buttonCleanFiles.$el.click()
      this.$refs.uploaderTrigger.$el.click()
    },

    onImageLoadedError () {
      this.isImage = false
    },

    imageName (value) {
      return `${value}`.split('/').pop()
    },

    failedFiles (files) {
      return files.filter(file => this.isFileFailed(file))
    }

  }
}
</script>
