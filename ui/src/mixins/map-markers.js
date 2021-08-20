export default {
  methods: {
    $_createMarkers (referencePoints) {
      const referencePointsList = []
      
      for (const index in referencePoints) {
        const { latitude, longitude, city, name } = referencePoints[index]

        referencePointsList.push({
          position: { lat: +latitude, lng: +longitude },
          title: name,
          description: city,
          draggable: !index && this.$_isEditMode,
          icon: index ? require('images/marker.png') : ''
        })
      }

      return referencePointsList
    },

    $_position (lat, lng) {
      return { lat: lat || -21.17663, lng: lng || -47.820839 }
    }
  }
}
