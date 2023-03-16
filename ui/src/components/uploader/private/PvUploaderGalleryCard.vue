<template>
  <div>
    <qas-gallery-card v-bind="galleryCardProps">
      <template #bottom>
        <slot>
          <qas-form-generator v-bind="formGeneratorProps" />
        </slot>
      </template>
    </qas-gallery-card>

    <qas-dialog use-form v-bind="dialogProps">
      <template #description>
        <qas-form-generator v-bind="formGeneratorProps" />
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

    galleryCardProps: {
      type: Object,
      default: () => ({})
    },

    formGeneratorProps: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
