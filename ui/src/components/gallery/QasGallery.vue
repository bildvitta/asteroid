
<template>
  <div>
    <div class="q-col-gutter-md row">
      <div v-for="(image, index) in initialImages()" :key="index" :class="galleryColumnsClasses">
        <div class="q-pa-md rounded-borders shadow-2">
          <q-img class="cursor-pointer rounded-borders" :height="imageHeight" :src="image" @click="toggleCarouselDialog(index)" @error="onError(image)" />
        </div>
      </div>

      <slot>
        <div v-if="!hideShowMore" class="full-width text-center">
          <qas-btn color="primary" flat :label="showMoreLabel" @click="showMore" />
        </div>
      </slot>

      <qas-dialog v-model="carouselDialog" :cancel="false" class="q-pa-xl" min-width="1100px" :ok="false" :persistent="false">
        <template #header>
          <div class="text-right">
            <qas-btn v-close-popup dense flat icon="o_close" rounded @click="toggleCarouselDialog" />
          </div>
        </template>
        <template #description>
          <q-carousel v-model="imageIndex" animated :arrows="!$qas.screen.isSmall" control-text-color="primary" :fullscreen="$qas.screen.isSmall" :height="carouselImageHeight" :next-icon="carouselNextIcon" :prev-icon="carouselPreviousIcon" swipeable :thumbnails="showThumbnails">
            <q-carousel-slide v-for="(image, index) in clonedImages" :key="index" class="bg-no-repeat bg-size-contain" :img-src="image" :name="index">
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
      clonedImages: [],
      imageIndex: [],
      displayedImages: this.initialSize
    }
  },

  computed: {
    imageHeight () {
      if (this.isSingleImage) {
        return this.height || 'auto'
      }

      return this.$qas.screen.isSmall ? '90px' : '120px'
    },

    galleryColumnsClasses () {
      if (this.isSingleImage) return 'col-3'

      const size = 12 / this.initialSize
      const col = `col-${size}`

      return this.$qas.screen.isSmall ? 'col-12' : col
    },

    hideShowMore () {
      return (this.clonedImages.length <= this.displayedImages) || this.useLoadAll
    },

    carouselImageHeight () {
      return 'calc((500/976) * 100vh)'
    },

    showThumbnails () {
      return !this.isSingleImage
    },

    isSingleImage () {
      return this.clonedImages.length === 1
    }
  },

  watch: {
    images: {
      handler (value) {
        this.clonedImages = [...value]
      },
      immediate: true
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
      const index = this.clonedImages.findIndex(image => image === error)

      if (~index) {
        this.clonedImages.splice(index, 1)
        this.$forceUpdate()
      }
    },

    initialImages () {
      return this.useLoadAll ? this.clonedImages : this.clonedImages.slice(0, this.displayedImages)
    }
  }
}
</script>
