<template>
  <q-field borderless :error="$attrs.error" :error-message="$attrs.errorMessage" :hint="hint || undefined">
    <q-uploader v-bind="$attrs" auto-upload bordered class="fit" :factory="factory" flat method="PUT" :readonly="readOnly" v-on="$listeners" @removed="removed" @uploaded="uploaded">
      <template #header="scope">
        <button class="flex flex-center full-width justify-between no-border no-wrap q-gutter-xs q-pa-sm text-white transparent" unelevated @click="scope.pickFiles">
          <q-spinner v-if="scope.isUploading" size="24px" />

          <div class="col column items-start justify-center">
            <div v-if="scope.label" class="q-uploader__title">{{ scope.label }}</div>
            <div class="q-uploader__subtitle">{{ scope.uploadProgressLabel }} ({{ scope.uploadSizeLabel }})</div>
          </div>

          <q-btn v-if="!scope.hideUploadBtn && scope.canAddFiles" dense flat icon="o_add" round />

          <q-btn v-if="scope.canUpload" dense flat icon="o_cloud_upload" round @click="scope.upload" />
          <q-btn v-if="scope.isUploading" dense flat icon="o_clear" round @click="scope.abort" />
        </button>
        <q-uploader-add-trigger />
      </template>

      <template #list="scope">
        <q-list class="row">
          <q-item v-if="hasAPIValue && !scope.isUploading" class="col-auto items-center q-mb-lg q-mx-lg q-pa-none">
            <q-item-section avatar top>
              <q-avatar v-if="value" rounded>
                <img :src="value">
              </q-avatar>

              <q-avatar v-else color="grey-3" icon="o_attach_file" rounded :text-color="isFileFailed(file) ? 'negative' : 'primary'" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-black">{{ imageName }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="q-gutter-xs text-grey-8">
                <q-btn dense flat icon="o_delete" round @click="resetValue" />
              </div>
            </q-item-section>
          </q-item>
          <q-item v-for="file in scope.files" :key="file.name" class="col-auto items-center q-mb-lg q-mx-lg q-pa-none">
            <q-item-section avatar top>
              <q-avatar v-if="file.__img" rounded>
                <img :alt="file.name" :src="file.__img.src">
              </q-avatar>

              <q-avatar v-else color="grey-3" icon="o_attach_file" rounded :text-color="isFileFailed(file) ? 'negative' : 'primary'" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-black" :class="{ 'text-negative': isFileFailed(file) }">{{ file.name }}</q-item-label>
              <q-item-label caption>{{ file.__progressLabel }} ({{ file.__sizeLabel }})</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="q-gutter-xs text-grey-8">
                <q-circular-progress v-if="isFileUploading(file)" :indeterminate="!file.__progress" :max="1" :min="0" :value="file.__progress" />

                <q-icon v-if="isFileFailed(file)" color="negative" name="o_warning" size="20px" />

                <!-- TODO: Retirar essa linha comentada? -->
                <!-- <q-btn v-if="isFileUploaded(file)" dense flat icon="o_cloud_download" round /> -->
                <q-btn dense flat :icon="isFileUploaded(file) ? 'o_delete' : 'o_clear'" round @click="scope.removeFile(file)" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-uploader>
  </q-field>
</template>

<script>
import api from 'axios'
import { uid } from 'quasar'

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

    maxFiles: {
      default: 1,
      type: Number
    },

    value: {
      default: '',
      type: [Array, String]
    }

  },

  data () {
    return {
      files: [],
      isFetching: false,
      paths: {}
    }
  },

  computed: {
    hasAPIValue () {
      return this.value.startsWith('https://s3.amazonaws.com/')
    },

    hasBottom () {
      return !!this.error || !!this.errorMessage || !!this.hint
    },

    imageName () {
      return `${this.value}`.split('/').pop()
    },

    readOnly () {
      return this.files.length >= this.maxFiles
    }
  },

  watch: {
    files (files) {
      this.$emit('input', files.length > 1 ? files : files[0] || '')
    }
  },

  methods: {
    async factory ([file]) {
      const name = `${uid()}.${file.name.split('.').pop()}`
      const { endpoint, path } = await this.fetch(name)

      this.paths[file.name] = path

      return {
        headers: [{ name: 'Content-Type', value: file.type || 'image/jpeg' }],
        sendRaw: true,
        url: endpoint
      }
    },

    factoryFailed () {
      this.$notify('The file could not be sent.')
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

    isFileUploaded (file) {
      return file.__status === 'uploaded'
    },

    isFileUploading (file) {
      return file.__status === 'uploading'
    },

    removed ([file]) {
      const path = this.paths[file.name]
      this.files = this.files.filter(item => item !== path)
    },

    resetValue () {
      this.$emit('input', '')
    },

    uploaded ({ files }) {
      this.files.push(this.paths[files[0].name])
    }
  }
}
</script>
