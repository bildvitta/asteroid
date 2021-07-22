<template>
  <q-page class="container spaced">
    <qas-map :center-position="$_position()" has-search :markers="$_createMarkers(values)" show-popup />
  </q-page>
</template>

<script>
import mapMarkersMixin from 'ui/mixins/map-markers.js'

export default {
  mixins: [
    mapMarkersMixin
  ],

  data () {
    return {
      values: [
        {
          latitude: -21.17663,
          longitude: -47.820839,
          title: 'Teste do componente QasMap',
          description: 'Ribeirão Preto',
          draggable: true,
          icon: ''
        },
        {
          latitude: -21.19600,
          longitude: -47.820800,
          title: 'Teste 2 do componente QasMap',
          description: 'teste2',
          draggable: true,
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        },
        {
          latitude: -20.19600,
          longitude: -46.820800,
          title: 'Teste 3',
          description: 'teste3',
          draggable: false
        }
      ]
    }
  }

}
</script>
