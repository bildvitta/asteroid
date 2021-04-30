<template>
  <div class="col-12 col-lg-3 col-md-4 col-sm-6 qas-card">
    <q-card class="border-radius-lg column full-height" :class="cardClass">
      <div class="overflow-hidden relative-position">
        <slot name="header">
          <q-carousel v-model="slideImage" animated class="cursor-pointer" height="205px" infinite :navigation="hasImages" navigation-icon="fiber_manual_record" swipeable>
            <q-carousel-slide v-for="(item, index) in cardItemImages" :key="index" class="bg-no-repeat" :class="bgImagePositionClass" :img-src="setImage(item)" :name="index" />
          </q-carousel>
        </slot>
      </div>

      <q-card-section class="card__description col-grow column justify-between">
        <div :class="gutterClass">
          <slot />
        </div>
      </q-card-section>

      <div v-if="hasActions" class="card__details-link overflow-hidden q-pa-sm row">
        <slot name="actions" />
      </div>
    </q-card>
  </div>
</template>

<script>
import screen from '../../mixins/screen'

export default {
  name: 'QasCard',

  mixins: [screen],

  props: {
    result: {
      type: Object,
      default: () => ({})
    },

    defaultImage: {
      type: String,
      default: ''
    },

    fields: {
      type: Object,
      default: () => ({})
    },

    cardOptions: {
      type: Object,
      default: () => ({})
    },

    formMode: {
      type: Boolean
    },

    bgImagePosition: {
      type: String,
      default: 'center'
    },

    hasActions: {
      type: Boolean
    },

    gutter: {
      type: String,
      default: 'sm'
    }
  },

  data () {
    return {
      slideImage: 0
    }
  },

  computed: {
    bgImagePositionClass () {
      return `bg-position-${this.bgImagePosition}`
    },

    cardItemId () {
      return this.result?.uuid
    },

    cardItemImages () {
      if (!Object.keys(this.fields).length) return []

      if (this.cardImagesLength) return this.fields.images.slice(0, 3)

      return [this.defaultImage]
    },

    hasImages () {
      return this.cardItemImages.length > 1
    },

    cardOptionsAlignment () {
      return this.result.status ? 'justify-between' : 'justify-end'
    },

    cardImagesLength () {
      return this.fields.images?.length
    },

    cardClass () {
      return this.formMode ? 'card--outlined bg-white no-shadow' : 'box-shadow-1'
    },

    gutterClass () {
      return `q-col-gutter-${this.gutter}`
    }
  },

  methods: {
    setImage (imagesList) {
      return imagesList.data?.image || imagesList
    }
  }
}
</script>

<style lang="scss">
.qas-card {
  &__details-link {
    border-top: 1px solid $secondary;
  }

  &--outlined {
    border: 1px solid $secondary;
  }
}
</style>
