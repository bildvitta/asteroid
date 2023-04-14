
<template>
  <div class="qas-gallery">
    <div class="q-col-gutter-md row">
      <div v-for="(image, index) in getInitialImages()" :key="index" :class="galleryColumnsClasses" :data-cy="`gallery-image-${index}`">
        <qas-gallery-card v-bind="getGalleryCardProps({ image, index })">
          <template v-for="(_, name) in $slots" #[name]="context">
            <slot v-bind="context" :image="image" :index="index" :name="name" />
          </template>
        </qas-gallery-card>
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

    galleryCardProps: {
      type: Object,
      default: () => ({})
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

    getGalleryCardProps ({ image, index }) {
      return {
        card: image,
        imageProps: this.getImageProps({ image, index }),
        actionsMenuProps: this.getActionsMenuProps({ image, index }),
        ...this.galleryCardProps
      }
    },

    getActionsMenuProps ({ image, index }) {
      if (!this.useDestroy) return {}

      return {
        useLabel: false,

        buttonProps: {
          disable: this.isDestroyDisabled(image)
        },

        list: {
          destroy: {
            label: 'Excluir',
            color: 'grey-9',
            icon: 'sym_r_delete',

            handler: () => this.onDestroy(image, index)
          }
        }
      }
    },

    getImageProps ({ image, index }) {
      return {
        class: 'cursor-pointer',

        onClick: () => this.toggleCarouselDialog(index),
        onError: () => this.onError(image.url)
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
