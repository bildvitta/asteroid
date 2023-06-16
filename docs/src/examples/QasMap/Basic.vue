<template>
  <div class="container spaced">
    <div>
      <qas-map :center-position="{ lat: -21.17663, lng: -47.820839 }" :markers="marker" use-popup @update-position="updatePosition" />
    </div>
  </div>
</template>

<script>
import { QasMap } from 'asteroid'

export default {
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

  created () {
    console.log(QasMap)
  },

  methods: {
    updatePosition (event) {
      alert(JSON.stringify(event))
    }
  }
}
</script>
