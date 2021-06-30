<template>
  <q-page class="container spaced">
    <qas-map :center-position="$_position()" has-search :markers="$_createMarkers(values)" show-popup />
  </q-page>
</template>

<script>
import mapMarkersMixin from '../../../src/mixins/map-markers.js'
// import { VueGoogleMaps } from '../../../src/helpers'

import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
VueGoogleMaps.install(Vue, {
  load: {
    key: 'AIzaSyDl00zRKG51WWBIJa8yVXqX7jFD5xyqe24',
    libraries: 'places'
  }
})

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

  // mounted () {
  //   this.VueGoogleMaps(Vue)
  // },

  // methods: {
  //   VueGoogleMaps
  // }

}
</script>
