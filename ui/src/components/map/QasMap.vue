<template>
  <div class="map">
    <div v-if="hasSearch" class="items-center no-wrap row">
      <gmap-autocomplete class="q-field__native q-placeholder" placeholder="Pesquisar..." @place_changed="setPlace" />
      <q-icon color="primary" name="o_search" size="24px" />
    </div>
    <gmap-map ref="map" :center="centerFocus" class="map__map-draw" :zoom="zoom">
      <gmap-marker v-for="(marker, index) in mainMarkers" :key="index" ref="marker" :draggable="marker.draggable" :icon="marker.icon" :position="marker.position" @dragend="getPosition" @mouseout="closePopup" @mouseover="openPopup(marker)">
        <gmap-info-window :opened="canShowInfoWindow">
          <div class="text-weight-bold">{{ marker.title }}</div>
          <div>{{ marker.description }}</div>
        </gmap-info-window>
      </gmap-marker>
      <div v-if="secondMarkers">
        <gmap-marker v-for="(marker, index) in secondMarkers" :key="index" :draggable="marker.draggable" :icon="marker.icon" :position="marker.position" />
      </div>
    </gmap-map>
  </div>
</template>

<script>
import formMixin from '../../mixins/form.js'

export default {
  mixins: [
    formMixin
  ],

  props: {
    mainMarkers: {
      type: Array,
      default: () => ([])
    },

    secondMarkers: {
      type: Array,
      default: () => ([])
    },

    hasSearch: {
      type: Boolean
    },

    centerFocus: {
      type: Object,
      default: () => ({})
    },

    zoom: {
      type: Number,
      default: 17
    },

    showInfoWindow: {
      type: Boolean
    }
  },
  data () {
    return {
      isPopupDisplayed: false,
      currentPlace: null
    }
  },

  computed: {
    canShowInfoWindow () {
      return this.isPopupDisplayed && this.showInfoWindow
    }
  },

  methods: {
    openPopup (marker) {
      this.isPopupDisplayed = !!marker.title || !!marker.description
    },

    closePopup () {
      this.isPopupDisplayed = false
    },

    getPosition (mouseEvent) {
      this.$emit('update-position', mouseEvent.latLng.toJSON())
    },

    setPlace (place) {
      this.currentPlace = place
    }
  }
}
</script>

<style lang="scss">
.map {
  &__map-draw{
    height: 300px;
    width: 100%;
  }
}
</style>
