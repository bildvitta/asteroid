export default {
  methods: {
    $_createMarkers (referencePoints) {
      const _referencePoints = []

      for (const referencePoint in referencePoints) {
        _referencePoints.push({
          position: { lat: +referencePoints[referencePoint].latitude, lng: +referencePoints[referencePoint].longitude },
          title: referencePoints[referencePoint].name,
          description: referencePoints[referencePoint].city,
          draggable: referencePoint < 1 && this.$_isEditMode,
          icon: referencePoint > 0
            ? require('images/marker.png')
            : ''
        })
      }

      return _referencePoints
    },

    $_position (lat, lng) {
      return { lat: lat || -21.17663, lng: lng || -47.820839 }
    }
  }
}
