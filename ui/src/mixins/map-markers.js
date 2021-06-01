export default {
  methods: {
    $_createMarker (marker, draggable) {
      return [{
        position: this.$_getPosition(parseFloat(marker.latitude), parseFloat(marker.longitude)),
        title: marker.title,
        description: marker.description,
        draggable: draggable,
        icon: marker.icon
      }]
    },

    $_getPosition (lat, lng) {
      return { lat: parseFloat(lat) || -21.17663, lng: parseFloat(lng) || -47.820839 }
    },

    $_createSecondMarkers (secondMarkers) {
      const markers = []

      if (secondMarkers) {
        secondMarkers.forEach(secondMarker => {
          markers.push({
            id: secondMarker.uuid,
            position: { lat: secondMarker.latitude, lng: secondMarker.longitude },
            draggable: false,
            title: secondMarker.name,
            description: secondMarker.address,
            icon: secondMarker.icon
          })
        })
      }

      return markers
    }
  }
}
