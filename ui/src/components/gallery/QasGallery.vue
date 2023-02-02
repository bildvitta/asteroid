
<template>
  <div class="qas-gallery">
    <div class="q-col-gutter-md row">
      <div v-for="(image, index) in getInitialImages()" :key="index" :class="galleryColumnsClasses" :data-cy="`gallery-image-${index}`">
        <div class="bg-white q-pa-md rounded-borders shadow-2">
          <div class="flat items-center justify-between no-wrap q-mb-xs row text-grey-9">
            <div class="ellipsis q-mr-xs qas-gallery__name">
              <slot v-if="image.name" :image="image" :index="index" name="header">
                {{ image.name }}
              </slot>
            </div>

            <div v-if="useDestroy">
              <slot :destroy="onDestroy" :image="image" :index="index" name="destroy">
                <qas-btn color="grey-9" :disabled="isDestroyDisabled(image)" icon="sym_r_delete" variant="tertiary" @click="onDestroy(image, index)" />
              </slot>
            </div>
          </div>

          <q-img class="cursor-pointer rounded-borders" height="150px" :src="image.url" @click="toggleCarouselDialog(index)" @error="onError(image.url)" />
        </div>
      </div>

      <slot>
        <div v-if="!hideShowMore" class="full-width text-center">
          <qas-btn color="primary" data-cy="gallery-btn-show-more" :label="showMoreLabel" variant="tertiary" @click="showMore" />
        </div>
      </slot>

      <pv-gallery-carousel-dialog v-model="carouselDialog" v-model:imageIndex="imageIndex" :images="normalizedImages" />

      <pv-gallery-delete-dialog v-model="showDeleteDialog" v-bind="deleteGalleryDialogProps" @cancel="resetCurrentModel" @error="onDeleteError" @success="onDeleteSuccess" />
    </div>
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import PvGalleryDeleteDialog from './private/PvGalleryDeleteDialog.vue'
import PvGalleryCarouselDialog from './private/PvGalleryCarouselDialog.vue'
import { extend } from 'quasar'
import { deleteMixin } from '../../mixins'

export default {
  name: 'QasGallery',

  components: {
    PvGalleryCarouselDialog,
    PvGalleryDeleteDialog,
    QasBtn
  },

  mixins: [deleteMixin],

  props: {
    carouselNextIcon: {
      type: String,
      default: 'sym_r_chevron_right'
    },

    carouselPreviousIcon: {
      type: String,
      default: 'sym_r_chevron_left'
    },

    initialSize: {
      type: Number,
      default: 4,
      validator: value => {
        const acceptableValues = [1, 2, 3, 4, 6, 12]

        return acceptableValues.includes(value)
      }
    },

    showMoreLabel: {
      type: String,
      default: 'Ver mais'
    },

    useLoadAll: {
      type: Boolean
    },

    useDestroy: {
      type: Boolean
    },

    useObjectModel: {
      type: Boolean
    },

    modelValue: {
      type: Array,
      default: () => []
    },

    modelKey: {
      type: String,
      default: ''
    }
  },

  emits: [
    'delete-error',
    'delete-success',
    'update:modelValue'
  ],

  data () {
    return {
      carouselDialog: false,
      imageIndex: 0,
      displayedImages: this.initialSize,
      showDeleteDialog: false,
      currentModel: [],
      imageToBeDestroyed: { index: null }
    }
  },

  computed: {
    galleryColumnsClasses () {
      const size = 12 / this.initialSize
      const col = `col-${size}`

      return this.$qas.screen.isSmall ? 'col-12' : col
    },

    hideShowMore () {
      return (this.normalizedImages.length <= this.displayedImages) || this.useLoadAll
    },

    normalizedImages () {
      if (!this.useObjectModel) {
        return this.clonedImages.map(url => ({ url }))
      }

      return this.clonedImages
    },

    clonedImages () {
      return extend(true, [], this.modelValue)
    },

    deleteGalleryDialogProps () {
      return {
        customId: this.customId,
        dialogProps: this.dialogProps,
        entity: this.entity,
        modelKey: this.modelKey,
        payload: this.currentModel,
        url: this.url
      }
    }
  },

  watch: {
    normalizedImages: {
      handler (value) {
        this.currentModel = extend(true, [], value)
      },

      immediate: true
    }
  },

  methods: {
    toggleCarouselDialog (index) {
      this.imageIndex = index
      this.carouselDialog = !this.carouselDialog
    },

    showMore () {
      this.displayedImages += this.displayedImages
    },

    onError (error) {
      const index = this.normalizedImages.findIndex(image => image.url === error)

      if (~index) {
        this.normalizedImages.splice(index, 1)
        this.$forceUpdate()
      }
    },

    getInitialImages () {
      return this.useLoadAll
        ? this.normalizedImages
        : this.normalizedImages.slice(0, this.displayedImages)
    },

    onDestroy (image, index) {
      if (this.isDestroyDisabled(image)) return

      this.imageToBeDestroyed.index = index

      this.currentModel.splice(this.imageToBeDestroyed.index, 1)

      this.showDeleteDialog = !this.showDeleteDialog
    },

    isDestroyDisabled (image) {
      return 'destroyable' in image && !image.destroyable
    },

    onDeleteSuccess () {
      this.normalizedImages.splice(this.imageToBeDestroyed.index, 1)

      this.$emit('update:modelValue', this.normalizedImages)

      this.$emit(
        'delete-success',
        { data: this.normalizedImages, index: this.imageToBeDestroyed.index }
      )
    },

    resetCurrentModel () {
      this.currentModel = extend(true, [], this.normalizedImages)
    },

    onDeleteError (error) {
      this.resetCurrentModel()

      this.$emit(
        'delete-error',
        { data: error, index: this.imageToBeDestroyed.index }
      )
    }
  }
}
</script>

<!-- TODO rever tipografia -->
<style lang="scss">
.qas-gallery {
  &__name {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
