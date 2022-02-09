
<template>
  <qas-box class="gallery">
    <div class="q-col-gutter-md row">
      <div v-for="(image, index) in initialImages()" :key="index" :class="galleryColumnsClasses">
        <q-img class="cursor-pointer rounded-borders" :height="imageHeight" :src="image" @click="toggleCarouselDialog(index)" @error="onError(image)" />
      </div>
      <slot name="default">
        <div v-if="!hideShowMore" class="full-width text-center">
          <span class="cursor-pointer justify-center text-primary text-weight-bolder" @click="showMore">{{ showMoreLabel }}</span>
        </div>
      </slot>
      <qas-dialog v-model="carouselDialog" :cancel="false" class="q-pa-xl" min-width="1100px" :ok="false" :persistent="false">
        <template #header>
          <div class="text-right">
            <qas-btn v-close-popup dense flat icon="o_close" rounded @click="toggleCarouselDialog" />
          </div>
        </template>
        <template #description>
          <q-carousel v-model="imageIndex" animated :arrows="!$_isSmall" control-text-color="primary" :fullscreen="$_isSmall" :height="carouselImageHeight" :next-icon="carouselNextIcon" :prev-icon="carouselPreviousIcon" swipeable :thumbnails="showThumbnails">
            <q-carousel-slide v-for="(image, index) in clonedImages" :key="index" class="bg-no-repeat bg-size-contain" :img-src="image" :name="index">
              <div v-if="$_isSmall" class="full-width justify-end row">
                <qas-btn dense flat icon="o_close" @click="toggleCarouselDialog" />
              </div>
            </q-carousel-slide>
          </q-carousel>
        </template>
      </qas-dialog>
    </div>
  </qas-box>
</template>

<script>
import screenMixin from '../../mixins/screen'

export default {
  mixins: [screenMixin],

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

    initialLength: {
      type: Number,
      default: 6
    },

    images: {
      type: Array,
      default: () => []
    },

    loadLength: {
      type: Number,
      default: 6
    },

    showMoreLabel: {
      type: String,
      default: 'Ver mais'
    }
  },

  data () {
    return {
      carouselDialog: false,
      clonedImages: [],
      imageIndex: [],
      displayedImages: this.initialLength
    }
  },

  computed: {
    imageHeight () {
      if (this.isSingleImage) {
        return this.height || 'auto'
      }

      return this.$_isSmall ? '90px' : '120px'
    },

    galleryColumnsClasses () {
      if (this.isSingleImage) return 'col-12'

      return this.$_isSmall ? 'col-6' : 'col-2'
    },

    hideShowMore () {
      return this.clonedImages.length <= this.displayedImages
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
      this.displayedImages += this.loadLength
    },

    onError (error) {
      const index = this.clonedImages.findIndex(image => image === error)

      if (~index) {
        this.clonedImages.splice(index, 1)
        this.$forceUpdate()
      }
    },

    initialImages () {
      return this.clonedImages.slice(0, this.displayedImages)
    }
  }
}
</script>
