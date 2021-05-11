<template>
  <div class="col-12 col-lg-3 col-md-4 col-sm-6 qas-card">
    <q-card class="border-radius-lg column full-height" :class="cardClasses">
      <div v-if="useHeader" class="overflow-hidden relative-position">
        <slot name="header">
          <q-carousel v-model="slideImage" animated class="cursor-pointer" height="205px" infinite :navigation="hasImages" navigation-icon="fiber_manual_record" swipeable>
            <q-carousel-slide v-for="(item, index) in images" :key="index" class="bg-no-repeat" :class="bgImagePositionClasses" :img-src="getImage(item)" :name="index" />
          </q-carousel>
        </slot>
      </div>

      <q-card-section class="card__description col-grow column justify-between">
        <div :class="gutterClasses">
          <slot />
        </div>
      </q-card-section>

      <div v-if="useActions" class="card__details-link overflow-hidden q-pa-sm row">
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
    bgImagePosition: {
      type: String,
      default: 'center'
    },

    defaultImage: {
      type: String,
      default: ''
    },

    fields: {
      type: Object,
      default: () => ({})
    },

    formMode: {
      type: Boolean
    },

    gutter: {
      type: String,
      default: 'sm'
    },

    result: {
      type: Object,
      default: () => ({})
    },

    useActions: {
      type: Boolean
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

    cardItemId () {
      return this.result?.uuid
    },

    images () {
      if (this.imagesLength) return this.fields.images.slice(0, 3)

      return [this.defaultImage]
    },

    hasImages () {
      return this.images.length > 1
    },

    imagesLength () {
      return this.fields.images?.length
    },

    cardClasses () {
      return [this.formMode ? 'card--outlined bg-white no-shadow' : 'box-shadow-1']
    },

    gutterClasses () {
      return [`q-col-gutter-${this.gutter}`]
    }
  },

  methods: {
    getImage (imagesList) {
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
