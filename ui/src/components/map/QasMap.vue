<template>
  <qas-box class="qas-map">
    <!-- TODO descomentar quando implementar o input de pesquisa -->
    <!-- <div v-if="hasSearch" class="items-center no-wrap row">
      <gmap-autocomplete class="q-field__native q-placeholder" placeholder="Pesquisar..." />
      <q-icon color="primary" name="o_search" size="24px" />
    </div> -->
    <gmap-map :center="centerPosition" class="qas-map__draw" :zoom="zoom">
      <gmap-marker v-for="(marker, index) in markers" :key="index" :draggable="marker.draggable" :icon="marker.icon" :position="marker.position" @dragend="getPosition" @mouseout="closePopup" @mouseover="openPopup(marker)">
        <gmap-info-window :opened="canShowPopup">
          <div class="text-weight-bold">{{ marker.title }}</div>
          <div>{{ marker.description }}</div>
        </gmap-info-window>
      </gmap-marker>
      <div v-if="secondMarkers">
        <gmap-marker v-for="(marker, index) in secondMarkers" :key="index" :draggable="marker.draggable" :icon="marker.icon" :position="marker.position" />
      </div>
    </gmap-map>
  </qas-box>
</template>

<script>
import formMixin from '../../mixins/form.js'

export default {
  mixins: [
    formMixin
  ],

  props: {
    centerPosition: {
      type: Object,
      default: () => {}
    },

    hasSearch: {
      type: Boolean
    },

    markers: {
      type: Array,
      default: () => []
    },

    secondMarkers: {
      type: Array,
      default: () => []
    },

    showPopup: {
      type: Boolean
    },

    zoom: {
      type: Number,
      default: 17
    }
  },

  data () {
    return {
      isPopupDisplayed: false,
      currentPlace: null
    }
  },

  computed: {
    canShowPopup () {
      return this.isPopupDisplayed && this.showPopup
    }
  },

  methods: {
    openPopup ({ title, description }) {
      this.isPopupDisplayed = !!(title || description)
    },

    closePopup () {
      this.isPopupDisplayed = false
    },

    getPosition (mouseEvent) {
      this.$emit('update-position', mouseEvent.latLng.toJSON())
    },

    setPlace (place) {
      debugger
      this.currentPlace = place
    }
  }
}
</script>

<style lang="scss">
.qas-map {
  &__draw{
    height: 300px;
    width: 100%;
  }
}
</style>
