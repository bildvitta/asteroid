<template>
  <qas-box class="col-12 gallery">
    <div class="q-col-gutter-md row">
      <div v-for="(item, index) in initialitems" :key="index" :class="galleryColumnsClasses">
        <q-img class="cursor-pointer rounded-borders" :height="itemHeight" :src="item" @click="toggleCarouselDialog(index)" />
      </div>
      <slot name="default">
        <div v-if="!hideShowMore" class="text-center w-full">
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
          <q-carousel v-model="itemIndex" animated :arrows="!$_isSmall" control-text-color="primary" :fullscreen="$_isSmall" :height="carouselitemHeight" :next-icon="carouselNextIcon" :prev-icon="carouselPreviousIcon" swipeable :thumbnails="showThumbnails">
            <q-carousel-slide v-for="(item, index) in items" :key="index" class="bg-no-repeat bg-size-contain" :img-src="item" :name="index">
              <div v-if="$_isSmall" class="justify-end row w-full">
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

    items: {
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
      itemIndex: [],
      displayeditems: this.initialLength
    }
  },

  computed: {
    initialitems () {
      return this.items.slice(0, this.displayeditems)
    },

    itemHeight () {
      if(this.isSingleItem) {
        return this.height ? this.height : 'auto'
      }

      return this.$_isSmall ? '90px' : '120px'
    },

    galleryColumnsClasses () {
      if (this.isSingleItem) return 'col-12'

      return this.$_isSmall ? 'col-6' : 'col-2'
    },

    hideShowMore () {
      return this.items.length < this.displayeditems
    },

    carouselitemHeight () {
      return 'calc((500/976) * 100vh)'
    },

    showThumbnails () {
      return !this.isSingleItem
    },

    isSingleItem () {
      return this.items.length === 1
    }
  },

  methods: {
    toggleCarouselDialog (item) {
      this.itemIndex = item
      this.carouselDialog = !this.carouselDialog
    },

    showMore () {
      this.displayeditems += this.loadLength
    }
  }
}
</script>
