
<template>
  <div class="qas-gallery">
    <div class="q-col-gutter-md row">
      <div v-for="(image, index) in initialImages()" :key="index" :class="galleryColumnsClasses" :data-cy="`image-${index}`">
        <div class="q-pa-md rounded-borders shadow-2">
          <div v-if="image.name" class="ellipsis q-mb-xs qas-gallery__name text-grey-9">
            {{ image.name }}
          </div>

          <q-img class="cursor-pointer rounded-borders" height="150px" :src="image.url" @click="toggleCarouselDialog(index)" @error="onError(image.url)" />
        </div>
      </div>

      <slot>
        <div v-if="!hideShowMore" class="full-width text-center">
          <qas-btn color="primary" data-cy="btn-show-more" flat :label="showMoreLabel" @click="showMore" />
        </div>
      </slot>

      <qas-dialog v-model="carouselDialog" :cancel="false" class="q-pa-xl" min-width="1100px" :ok="false" :persistent="false">
        <template #header>
          <div class="text-right">
            <qas-btn v-close-popup dense flat icon="o_close" rounded @click="toggleCarouselDialog" />
          </div>
        </template>

        <template #description>
          <q-carousel v-model="imageIndex" animated :arrows="!$qas.screen.isSmall" control-text-color="primary" data-cy="carousel" :fullscreen="$qas.screen.isSmall" :height="carouselImageHeight" :next-icon="carouselNextIcon" :prev-icon="carouselPreviousIcon" swipeable :thumbnails="showThumbnails">
            <q-carousel-slide v-for="(image, index) in normalizedImages" :key="index" class="bg-no-repeat bg-size-contain" :data-cy="`carousel-slide-${index}`" :img-src="image.url" :name="index">
              <div v-if="$qas.screen.isSmall" class="full-width justify-end row">
                <qas-btn dense flat icon="o_close" @click="toggleCarouselDialog" />
              </div>
            </q-carousel-slide>
          </q-carousel>
        </template>
      </qas-dialog>
    </div>
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import QasDialog from '../dialog/QasDialog.vue'
import { extend } from 'quasar'

export default {
  name: 'QasGallery',

  components: {
    QasBtn,
    QasDialog
  },

  props: {
    carouselNextIcon: {
      type: String,
      default: 'o_chevron_right'
    },

    carouselPreviousIcon: {
      type: String,
      default: 'o_chevron_left'
    },

    height: {
      type: String,
      default: ''
    },

    initialSize: {
      type: Number,
      default: 4,
      validator: value => {
        const acceptableValues = [1, 2, 3, 4, 6, 12]

        return acceptableValues.includes(value)
      }
    },

    images: {
      type: Array,
      default: () => []
    },

    showMoreLabel: {
      type: String,
      default: 'Ver mais'
    },

    useLoadAll: {
      type: Boolean
    }
  },

  data () {
    return {
      carouselDialog: false,
      imageIndex: [],
      displayedImages: this.initialSize
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

    carouselImageHeight () {
      return 'calc((500/976) * 100vh)'
    },

    showThumbnails () {
      return !this.isSingleImage
    },

    isSingleImage () {
      return this.normalizedImages.length === 1
    },

    isArrayOfString () {
      return typeof this.clonedImages[0] === 'string'
    },

    normalizedImages () {
      if (this.isArrayOfString) {
        return this.clonedImages.map(url => ({ url }))
      }

      return this.clonedImages
    },

    clonedImages () {
      return extend(true, [], this.images)
    }
  },

  methods: {
    toggleCarouselDialog (image) {
      this.imageIndex = image
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

    initialImages () {
      return this.useLoadAll
        ? this.normalizedImages
        : this.normalizedImages.slice(0, this.displayedImages)
    }
  }
}
</script>

<style lang="scss">
.qas-gallery {
  &__name {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
