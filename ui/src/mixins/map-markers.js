export default {
  methods: {
    $_createMarker (marker) {
      return [{
        position: this.$_position(marker.latitude, marker.longitude),
        title: marker.title,
        description: marker.description,
        draggable: marker.draggable,
        icon: marker.icon
      }]
    },

    $_position (lat, lng) {
      return { lat: lat || -21.17663, lng: lng || -47.820839 }
    }

    // $_createSecondMarkers (secondMarkers) {
    //   const markers = []

    //   if (secondMarkers) {
    //     secondMarkers.forEach(secondMarker => {
    //       markers.push({
    //         id: secondMarker.uuid,
    //         position: { lat: secondMarker.latitude, lng: secondMarker.longitude },
    //         draggable: false,
    //         title: secondMarker.name,
    //         description: secondMarker.address,
    //         icon: secondMarker.icon
    //       })
    //     })
    //   }

    //   return markers
    // }
  }
}
