export default {
  methods: {
    $_createMarker (marker, draggable) {
      return [{
        position: this.$_getPosition(parseFloat(marker.latitude), parseFloat(marker.longitude)),
        title: marker.name,
        description: marker.city,
        draggable: draggable,
        icon: marker.icon
      }]
    },

    $_getPosition (lat, lng) {
      return { lat: parseFloat(lat) || -21.17663, lng: parseFloat(lng) || -47.820839 }
    },

    $_getSecondMarkers (fields) {
      return this.$_createSecondMarkers(fields.realEstateDevelopmentsMapsReferences?.options)
    },

    $_createSecondMarkers (secondMarkers) {
      const markers = []

      if (secondMarkers) {
        secondMarkers.forEach(secondMarker => {
          markers.push({
            id: secondMarker.data.uuid,
            position: { lat: secondMarker.data.latitude, lng: secondMarker.data.longitude },
            draggable: false,
            title: secondMarker.data.name,
            description: secondMarker.data.address,
            icon: secondMarker.icon
          })
        })
      }

      return markers
    }
  }
}
