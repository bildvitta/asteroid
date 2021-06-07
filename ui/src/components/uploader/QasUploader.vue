<template>
  <q-field borderless :error="error" :error-message="errorMessage" :hint="hintValue">
    <q-uploader v-bind="$attrs" auto-upload bordered :class="uploaderClasses" :factory="factory" flat :max-files="maxFiles" method="PUT" :readonly="readonly" v-on="$listeners" @factory-failed="factoryFailed" @uploaded="uploaded">
      <template #header="scope">
        <slot name="header" :scope="scope">
          <div class="flex flex-center full-width justify-between no-border no-wrap q-gutter-xs q-pa-sm text-white transparent">
            <q-spinner v-if="scope.isUploading" size="24px" />

            <div class="col column items-start justify-center">
              <div v-if="scope.label" class="q-uploader__title">{{ scope.label }}</div>
              <div v-if="scope.files.length" class="q-uploader__subtitle">{{ scope.uploadProgressLabel }} ({{ scope.uploadSizeLabel }})</div>
            </div>

            <q-btn v-if="showAddFile" ref="buttonUpload" dense flat icon="o_add" round />

            <q-uploader-add-trigger v-if="showAddFile" ref="uploaderTrigger" />

            <q-btn ref="buttonCleanFiles" class="hidden" @click="scope.removeUploadedFiles" />

            <q-btn v-if="scope.canUpload" dense flat icon="o_cloud_upload" round @click="scope.upload" />
            <q-btn v-if="scope.isUploading" dense flat icon="o_clear" round @click="scope.abort" />
          </div>
        </slot>
      </template>

      <template #list="scope">
        <slot name="list" :scope="scope">
          <div class="col-12 q-col-gutter-md row">
            <div v-for="(file, index) in filesList(scope.files, scope)" :key="index" class="row" :class="itemClass">
              <qas-avatar class="q-mr-sm" color="grey-3" icon="o_attach_file" :image="file.image" rounded :text-color="colorFileIcon(file)" />

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
        </slot>
      </template>
    </q-uploader>
    <slot :context="self" name="custom-upload" />
  </q-field>
</template>

<script>
// import api from 'axios'
import { uid, extend } from 'quasar'

export default {
  props: {
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

    hint: {
      default: '',
      type: String
    },

    maxFiles: {
      default: undefined,
      type: Number
    },

    readonly: {
      type: Boolean
    },

    value: {
      default: '',
      type: [Array, String]
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

    uploaderClasses () {
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
      console.log('factory')
      // if (!this.isMultiple) {
      //   this.$refs.buttonCleanFiles.$el.click()
      // }

      const name = `${uid()}.${file.name.split('.').pop()}`
      const { endpoint } = await this.fetch(name)

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
      this.$notify('The file could not be sent.')
    },

    uploaded (response) {
      const fullPath = response.xhr.responseURL.split('?').shift()

      this.$emit('input', this.isMultiple ? [...this.value, fullPath] : fullPath || '')
    },

    async fetch (filename) {
      this.isFetching = true

      try {
        const { data } = await this.$axios.post('/upload-credentials/', {
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
        return this.$emit('input')
      }

      const clonedValue = extend(true, [], this.value)
      const numberIndex = this.value.findIndex(file => this.fileName(file) === index)
      clonedValue.splice(numberIndex, 1)
      this.$emit('input', clonedValue)
    },

    dispatchUpload () {
      this.$refs.buttonCleanFiles.$el.click()
      this.$refs.uploaderTrigger.$el.click()
    },

    fileName (value) {
      return value.split('/').pop()
    },

    filesList (uploadedFiles) {
      const pathsList = Array.isArray(this.value) ? this.value : (this.value ? [this.value] : [])

      uploadedFiles = uploadedFiles.map((file, indexToDelete) => {
        return {
          isUploaded: true,
          image: file.xhr ? file.xhr.responseURL.split('?').shift() : '',
          name: file.name,
          progressLabel: file.__progressLabel,
          sizeLabel: file.__sizeLabel,
          indexToDelete,
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
          const fileName = this.fileName(file)
          files[fileName] = { image: file, isUploaded: false, name: fileName }
          return
        }

        if (file.image) {
          const fileName = this.fileName(file.image)
          files[fileName] = file
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
    }

  }
}
</script>
