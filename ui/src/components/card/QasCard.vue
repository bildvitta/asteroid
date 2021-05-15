<template>
  <div class="col-12 col-lg-3 col-md-4 col-sm-6">
    <q-card class="border-radius-lg column full-height" :class="cardClasses">
      <div v-if="useHeader" class="overflow-hidden relative-position">
        <slot name="header">
          <q-carousel v-model="slideImage" animated class="cursor-pointer" height="205px" infinite :navigation="hasImages" navigation-icon="o_fiber_manual_record" swipeable>
            <q-carousel-slide v-for="(item, index) in imagesList" :key="index" class="bg-no-repeat" :class="bgImagePositionClasses" :img-src="item" :name="index" />
          </q-carousel>
        </slot>
      </div>

      <q-card-section class="col-grow column justify-between">
        <div :class="gutterClasses">
          <slot />
        </div>
      </q-card-section>

      <div v-if="useActions" class="border-primary-contrast border-top overflow-hidden q-pa-sm row">
        <slot name="actions" />
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    bgImagePosition: {
      type: String,
      default: 'center'
    },

    gutter: {
      type: String,
      default: 'sm'
    },

    images: {
      type: Array,
      default: () => ([])
    },

    outlined: {
      type: Boolean
    },

    result: {
      type: Object,
      default: () => ({})
    },

    useHeader: {
      type: Boolean
    }
  },

  data () {
    return {
      slideImage: 0
    }
  },

  computed: {
    bgImagePositionClasses () {
      return [`bg-position-${this.bgImagePosition}`]
    },

    hasImages () {
      return this.images.length > 1
    },

    imagesLength () {
      return this.images?.length
    },

    imagesList () {
      return this.imagesLength && this.images.slice(0, 3)
    },

    cardClasses () {
      return [this.formMode ? 'bg-white border-primary no-shadow' : 'box-shadow-1']
    },

    gutterClasses () {
      return [`q-col-gutter-${this.gutter}`]
    },

    useActions () {
      return !!(this.$slots.actions || this.$scopedSlots.actions)
    }
  }
}
</script>
