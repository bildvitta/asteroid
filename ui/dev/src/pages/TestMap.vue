<template>
  <q-page class="container row spaced">
    <div class="col-12">
      <qas-map :center-position="{lat: -21.17663, lng: -47.820839 }" :markers="marker" show-popup @update-position="updatePosition" />
      <!-- <qas-map :center-position="{lat: -21.17663, lng: -47.820839 }" :markers="createMarkers(marker)" show-popup /> -->
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      backgroundColor: 'white',
      isEmpty: true,
      signature: 'https://develop-portal-cms.bivilabs.com.br/uploads/banners/photo/e94f3d47-6789-473a-add0-637e10e8cefe.png'
    }
  },

  computed: {
    marker () {
      return [
        {
          position: { lat: -21.17663, lng: -47.820839 },
          title: 'Teste do componente QasMap',
          description: 'Ribeirão Preto',
          draggable: true,
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png'
        },
        {
          position: { lat: -21.17667, lng: -47.820839 },
          title: 'Teste do componente QasMap',
          description: 'Ribeirão Preto',
          draggable: true
        }
      ]
    }
  },

  methods: {
    createMarkers (referencePoints) {
      const referencePointsList = []

      referencePoints.forEach((referencePoint, index) => {
        const { position, city, name, icon } = referencePoint
        const { latitude, longitude } = position
        const isCreateOrEdit = !!this.mx_mode

        referencePointsList.push({
          position: { lat: +latitude, lng: +longitude },
          title: name,
          description: city,
          draggable: !index && isCreateOrEdit,
          icon
        })
      })

      return referencePointsList
    },

    position (lat, lng) {
      return { lat: lat || -21.17663, lng: lng || -47.820839 }
    },

    updatePosition (event) {
      console.log(event, '>>>>>')
    }
  }
}
</script>
