<template>
  <q-field borderless :error="error" :error-message="errorMessage" :hint="hint || undefined">
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
        <q-list class="full-width row">
          <q-item v-for="(item, index) in pathsLoop" :key="index" class="q-pa-none q-pr-md" :class="itemClass">
            <q-item-section avatar class="justify-center" top>
              <q-avatar v-if="isImage" rounded>
                <img :src="item" @error="onImageLoadedError">
              </q-avatar>

              <q-avatar v-else color="grey-3" icon="o_attach_file" rounded />
            </q-item-section>

            <q-item-section>
              <div class="full-width items-center no-wrap row">
                <q-item-label class="ellipsis text-black">{{ imageName(item) }}</q-item-label>
                <q-item-label caption>{{ progressUpload(scope.files[index]) }}</q-item-label>
                <div v-if="!scope.readonly" class="q-gutter-xs text-grey-8">
                  <q-btn dense flat icon="o_delete" round @click="removeItem(index)" />
                </div>
              </div>
            </q-item-section>
          </q-item>

          <q-item v-for="file in filesFailed(scope.files)" :key="file.name" class="q-pa-none q-pr-md" :class="itemClass">
            <q-item-section avatar top>
              <q-avatar v-if="file.__img" rounded>
                <img :alt="file.name" :src="file.__img.src">
              </q-avatar>

              <q-avatar v-else color="grey-3" icon="o_attach_file" rounded text-color="negative" />
            </q-item-section>

            <q-item-section>
              <div class="full-width items-center no-wrap row">
                <q-item-label class="ellipsis text-negative">{{ file.name }}</q-item-label>
                <q-item-label caption>{{ file.__progressLabel }} ({{ file.__sizeLabel }})</q-item-label>
                <div class="q-gutter-xs text-grey-8">
                  <q-icon color="negative" name="o_warning" size="20px" />
                  <q-btn dense flat icon="o_delete" round @click="scope.removeFile(file)" />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
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

    pathsLoop () {
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
      return this.$scopedSlots['custom-upload']
    },

    itemClass () {
      return this.isMultiple ? 'col-12 col-md-3 col-sm-4' : 'col-12'
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

    progressUpload (file) {
      return file && `${file.__progressLabel} (${file.__sizeLabel})`
    },

    removeItem (index) {
      let newValue = ''

      if (this.isMultiple) {
        const valueCloned = extend(true, [], this.value)
        valueCloned.splice(index, 1)
        newValue = valueCloned
      }

      this.$emit('input', newValue)
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

    filesFailed (files) {
      return files.filter(file => this.isFileFailed(file))
    }

  }
}
</script>
