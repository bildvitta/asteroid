<template>
  <div class="qas-map">
    <g-map-map :center="props.centerPosition" class="qas-map__draw" :zoom="props.zoom">
      <g-map-marker v-for="(marker, index) in props.markers" :key="index" :draggable="marker.draggable" :icon="marker.icon" :position="marker.position" @dragend="updatePosition" @mouseout="closePopup" @mouseover="openPopup(marker, index)">
        <g-map-info-window :opened="canShowPopup(index)">
          <div class="text-weight-bold">
            {{ marker.title }}
          </div>

          <div>
            {{ marker.description }}
          </div>
        </g-map-info-window>
      </g-map-marker>
    </g-map-map>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'QasMap' })

const props = defineProps({
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
})

const emit = defineEmits(['update-position'])

const isPopupDisplayed = ref(false)
const indexMarker = ref(null)

function canShowPopup (index) {
  return isPopupDisplayed.value && props.usePopup && index === indexMarker.value
}

function closePopup () {
  isPopupDisplayed.value = false
}

function openPopup ({ title, description }, index) {
  indexMarker.value = index
  isPopupDisplayed.value = !!(title || description)
}

function updatePosition (mouseEvent) {
  emit('update-position', mouseEvent.latLng.toJSON())
}
</script>

<style lang="scss">
.qas-map {
  &__draw {
    height: 300px !important;
    width: 100%;
  }
}
</style>
