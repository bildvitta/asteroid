<template>
  <div class="qas-uploader">
    <q-uploader ref="uploader" auto-upload class="bg-transparent" :class="uploaderClasses" v-bind="attributes" :factory="factory" flat :max-files="maxFiles" method="PUT" @factory-failed="factoryFailed" @uploaded="uploaded" @uploading="updateUploading(true)">
      <template #header="scope">
        <slot name="header" :scope="scope">
          <div class="flex items-center justify-between">
            <div>
              <qas-label v-bind="labelProps" />

              <div v-if="errorMessage" class="q-mt-xs text-caption text-negative">
                {{ errorMessage }}
              </div>
            </div>

            <div v-if="hasAddFile">
              <qas-btn color="primary" icon="sym_r_add" :label="addButtonLabel" :use-label-on-small-screen="false" variant="tertiary" @click="onAddButtonClick(scope)" />
            </div>
          </div>

          <!-- ------------------------------------ tags hidden -------------------------------------- -->
          <input ref="hiddenInput" :accept="attributes.accept" class="qas-uploader__input" :multiple="isMultiple" type="file">
          <qas-btn ref="buttonCleanFiles" class="hidden" @click="scope.removeUploadedFiles" />
        </slot>
      </template>

      <template #list="scope">
        <div v-if="hasGalleryCardSection(getFilesList(scope.files, scope))" class="q-col-gutter-lg q-mt-sm row">
          <div v-for="(file, key, index) in getFilesList(scope.files, scope)" :key="index" :class="columnClasses">
            <pv-uploader-gallery-card v-bind="getUploaderGalleryCardProps({ key, scope, file, index })" />
          </div>
        </div>

        <div v-else class="q-mt-lg">
          <qas-empty-result-text />
        </div>
      </template>
    </q-uploader>

    <slot :context="self" name="custom-upload" />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import PvUploaderGalleryCard from './private/PvUploaderGalleryCard.vue'

// eslint-disable-next-line no-undef
defineProps({
  addButtonFn: {
    type: Function,
    default: undefined
  },

  addButtonLabel: {
    default: 'Adicionar',
    type: String
  },

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

  columns: {
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

  error: {
    type: Boolean
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

  galleryCardProps: {
    type: Object,
    default: () => ({})
  },

  gridGeneratorProps: {
    default: () => ({}),
    type: Object
  },

  label: {
    type: String,
    default: ''
  },

  maxFiles: {
    default: undefined,
    type: Number
  },

  modelValue: {
    default: '',
    type: [String, Array, Object]
  },

  picaResizeOptions: {
    default: () => ({}),
    type: Object
  },

  readonly: {
    type: Boolean
  },

  sizeLimit: {
    default: 1280,
    type: Number
  },

  uploading: {
    type: Boolean
  },

  useDownload: {
    default: true,
    type: Boolean
  },

  useObjectModel: {
    type: Boolean
  },

  useResize: {
    default: true,
    type: Boolean
  }
})

</script>
