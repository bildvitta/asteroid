<template>
  <div class="qas-map">
    <g-map-map :center="centerPosition" class="qas-map__draw" :zoom="zoom">
      <g-map-marker v-for="(marker, index) in markers" :key="index" :draggable="marker.draggable" :icon="marker.icon" :position="marker.position" @dragend="updatePosition" @mouseout="closePopup" @mouseover="openPopup(marker, index)">
        <g-map-info-window :opened="canShowPopup(index)">
          <div class="text-weight-bold">{{ marker.title }}</div>
          <div>{{ marker.description }}</div>
        </g-map-info-window>
      </g-map-marker>
    </g-map-map>
  </div>
</template>

<script>
export default {
  name: 'QasMap',

  props: {
    centerPosition: {
      type: Object,
      default: () => ({})
    },

    markers: {
      type: Array,
      default: () => []
    },

    zoom: {
      type: Number,
      default: 17
    },

    usePopup: {
      type: Boolean
    }
  },

  emits: ['update-position'],

  data () {
    return {
      isPopupDisplayed: false,
      currentPlace: null,
      indexMarker: null
    }
  },

  methods: {
    openPopup ({ title, description }, index) {
      this.indexMarker = index
      this.isPopupDisplayed = !!(title || description)
    },

    canShowPopup (index) {
      return this.isPopupDisplayed && this.usePopup && index === this.indexMarker
    },

    closePopup () {
      this.isPopupDisplayed = false
    },

    updatePosition (mouseEvent) {
      this.$emit('update-position', mouseEvent.latLng.toJSON())
    }
  }
}
</script>

<style lang="scss">
.qas-map {
  &__draw {
    height: 300px;
    width: 100%;
  }
}
</style>
