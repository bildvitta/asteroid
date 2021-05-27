<template>
  <div class="col-12 gallery q-col-gutter-md row">
    <div v-for="(photo, index) in firstPhotos" :key="index" :class="galleryColumns">
      <q-img class="cursor-pointer rounded-borders" :height="photoHeight" :src="photo" @click="toggleCarouselDialog(index)" />
    </div>
    <div v-if="!hideShowMore" class="justify-center row w-full">
      <span class="cursor-pointer justify-center text-primary text-weight-bolder" @click="showMore">Ver mais</span>
    </div>
    <qas-dialog v-model="carouselDialog" :cancel="false" class="q-pa-xl" min-width="1100px" :ok="false" :persistent="false">
      <template #header>
        <div class="justify-end row">
          <qas-btn v-close-popup dense flat icon="close" rounded />
        </div>
      </template>
      <template #description>
        <q-carousel v-model="photoList" animated arrows control-text-color="primary" :fullscreen="$_isSmall" :height="carouselPhotoHeight" swipeable :thumbnails="showThumbnails">
          <q-carousel-slide v-for="(photo, index) in photos" :key="index" class="bg-no-repeat bg-size-contain" :img-src="photo" :name="index">
            <div v-if="$_isSmall" class="justify-end row w-full">
              <qas-btn dense flat icon="o_close" @click="toggleCarouselDialog" />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </template>
    </qas-dialog>
  </div>
</template>

<script>
import screenMixin from '../../mixins/screen'

export default {
  mixins: [screenMixin],

  props: {
    imageHeight: {
      type: String,
      default: ''
    },

    photos: {
      default: () => ([]),
      type: Array,
      required: true
    },

    photosQuantityToShow: {
      type: Number,
      default: 6
    },

    photosQuantityToShowMore: {
      type: Number,
      default: 6
    }
  },

  data () {
    return {
      carouselDialog: false,
      photoList: [],
      displayedPhotos: this.photosQuantityToShow
    }
  },

  computed: {
    firstPhotos () {
      return this.photos.slice(0, this.displayedPhotos)
    },

    photoHeight () {
      if (this.isSingleImage && !this.imageHeight) return 'auto'

      if (this.isSingleImage && this.imageHeight) return this.imageHeight

      return this.$_isSmall ? '90px' : '120px'
    },

    galleryColumns () {
      if (this.isSingleImage) return 'col-12'

      return this.$_isSmall ? 'col-6' : 'col-2'
    },

    hideShowMore () {
      return this.photos.length < this.displayedPhotos
    },

    carouselPhotoHeight () {
      return 'calc((500/976) * 100vh)'
    },

    showThumbnails () {
      return !this.isSingleImage
    },

    isSingleImage () {
      return this.photos.length === 1
    }
  },

  methods: {
    toggleCarouselDialog (photo) {
      debugger
      this.photoList = photo
      this.carouselDialog = !this.carouselDialog
    },

    showMore () {
      this.displayedPhotos = this.displayedPhotos + this.photosQuantityToShowMore
    },

    // TODO Implementar funcao generica para getImage
    getImage (photo) {
      if (photo) return photo?.data?.image

      return ''
    }
  }
}
</script>
