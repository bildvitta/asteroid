<template>
  <div class="pv-gallery-carousel-dialog">
    <qas-dialog v-model="model" :cancel="false" class="q-pa-xl" max-width="1100px" :ok="false" :persistent="false" use-full-max-width>
      <template #header>
        <div class="text-right">
          <qas-btn v-close-popup color="grey-10" icon="sym_r_close" variant="tertiary" @click="close" />
        </div>
      </template>

      <template #description>
        <q-carousel v-model="imageIndexModel" animated :arrows="!$qas.screen.isSmall" class="pv-gallery-carousel-dialog__carousel" control-text-color="primary" data-cy="gallery-carousel" :fullscreen="$qas.screen.isSmall" :height="carouselImageHeight" next-icon="sym_r_chevron_right" prev-icon="sym_r_chevron_left" swipeable :thumbnails="!isSingleImage">
          <q-carousel-slide v-for="(image, index) in images" :key="index" class="bg-no-repeat bg-size-contain" :data-cy="`gallery-carousel-slide-${index}`" :img-src="image.url" :name="index">
            <div v-if="$qas.screen.isSmall" class="full-width justify-end row">
              <qas-btn color="grey-10" icon="sym_r_close" variant="tertiary" @click="close" />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </template>
    </qas-dialog>
  </div>
</template>

<script>
export default {
  name: 'PvGalleryCarouselDialog',

  props: {
    images: {
      type: Array,
      default: () => []
    },

    imageIndex: {
      type: Number,
      default: 0
    },

    modelValue: {
      type: Boolean
    }
  },

  emits: [
    'update:modelValue',
    'update:imageIndex'
  ],

  computed: {
    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
    },

    imageIndexModel: {
      get () {
        return this.imageIndex
      },

      set (value) {
        return this.$emit('update:imageIndex', value)
      }
    },

    carouselImageHeight () {
      return 'calc((500/976) * 100vh)'
    },

    isSingleImage () {
      return this.images.length === 1
    }
  },

  methods: {
    close () {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style lang="scss">
.pv-gallery-carousel-dialog {
  // https://quasar.dev/style/sass-scss-variables#caveat: $

  &__carousel .q-carousel__control .q-btn {
    @include set-button(
      tertiary,
      true,
      false,
      primary
    );
  }
}
</style>
