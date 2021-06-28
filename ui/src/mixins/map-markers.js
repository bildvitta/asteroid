export default {
  methods: {
    $_createMarkers (values) {
      const markers = []

      values.forEach(value => {
        markers.push({
          position: this.$_position(value.latitude, value.longitude),
          title: value.title,
          description: value.description,
          draggable: value.draggable,
          icon: value.icon
        })
      })

      return markers
    },

    $_position (lat, lng) {
      return { lat: lat || -21.17663, lng: lng || -47.820839 }
    }
  }
}
