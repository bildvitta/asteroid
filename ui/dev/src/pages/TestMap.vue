<template>
  <q-page class="container spaced">
    <qas-map :center-focus="$_getPosition({lat: -21.17663, lng: -47.820839 })" has-search :markers="$_createMarker(values, true)" search show-info-window />
    <pre>{{ values }}</pre>
  </q-page>
</template>

<script>
import mapMarkersMixin from '../../../src/mixins/map-markers.js'
export default {
  mixins: [
    mapMarkersMixin
  ],

  data () {
    return {
      values: {
        position: { lat: -21.17663, lng: -47.820839 },
        title: 'Teste do componente QasMap',
        description: 'Ribeirão Preto',
        draggable: true
      }
    }
  }

}
</script>
