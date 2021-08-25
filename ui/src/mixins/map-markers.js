export default {
  methods: {
    $_createMarkers (referencePoints) {
      const referencePointsList = []

      referencePoints.forEach((referencePoint, index) => {
        const { latitude, longitude, city, name } = referencePoint

        referencePointsList.push({
          position: { lat: +latitude, lng: +longitude },
          title: name,
          description: city,
          draggable: !index && this.$_isEditMode,
          icon: referencePoint.icon
        })
      })
        
      return referencePointsList
    },

    $_position (lat, lng) {
      return { lat: lat || -21.17663, lng: lng || -47.820839 }
    }
  }
}
