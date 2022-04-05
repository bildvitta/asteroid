<template>
  <div class="col-12 col-lg-3 col-md-4 col-sm-6">
    <q-card class="border-radius-lg column full-height overflow-hidden" :class="cardClasses">
      <header v-if="useHeader" class="overflow-hidden relative-position w-full">
        <slot name="header">
          <q-carousel v-model="slideImage" animated class="cursor-pointer" height="205px" infinite :navigation="hasImages" navigation-icon="o_fiber_manual_record" swipeable>
            <template #navigation-icon="{ active, btnProps, onClick }">
              <qas-btn color="white" dense flat :icon="getNavigationIcon(active, btnProps)" round size="sm" @click="onClick" />
            </template>

            <q-carousel-slide v-for="(item, index) in imagesList" :key="index" class="bg-no-repeat" :class="bgImagePositionClass" :img-src="item" :name="index" />
          </q-carousel>

          <div class="absolute-top flex items-center q-pa-md">
            <slot name="carousel-header" />
          </div>
        </slot>
      </header>

      <q-card-section class="col-grow column justify-between w-full">
        <div class="w-full" :class="gutterClass">
          <slot />
        </div>
      </q-card-section>

      <div v-if="hasActionsSlot" class="border-primary-contrast border-top overflow-hidden row">
        <slot name="actions" />
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'QasCard',

  props: {
    bgImagePosition: {
      type: String,
      default: 'center'
    },

    formMode: {
      type: Boolean
    },

    gutter: {
      type: String,
      default: 'sm'
    },

    images: {
      default: () => [],
      type: Array
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
    bgImagePositionClass () {
      return `bg-position-${this.bgImagePosition}`
    },

    cardClasses () {
      return this.formMode ? 'bg-white border-primary no-shadow' : 'box-shadow-1'
    },

    gutterClass () {
      return `q-col-gutter-${this.gutter}`
    },

    hasActionsSlot () {
      return !!this.$slots.actions
    },

    hasImages () {
      return this.images.length > 1
    },

    imagesLength () {
      return this.images?.length
    },

    imagesList () {
      return this.imagesLength && this.images.slice(0, 3)
    }
  },

  methods: {
    getNavigationIcon (active, { icon }) {
      return active ? 'o_radio_button_checked' : icon
    }
  }
}
</script>
