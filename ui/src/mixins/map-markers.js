export default {
  methods: {
    $_createMarkers (referencePoints) {
      
      for (const index in referencePoints) {
        const { latitude, longitude, city, name } = referencePoints[index]

        _referencePoints.push({
          position: { lat: +latitude, lng: +longitude },
          title: name,
          description: city,
          draggable: !index && this.$_isEditMode,
          icon: index ? require('images/marker.png') : ''
        })
      }

      return _referencePoints
    },

    $_position (lat, lng) {
      return { lat: lat || -21.17663, lng: lng || -47.820839 }
    }
  }
}
