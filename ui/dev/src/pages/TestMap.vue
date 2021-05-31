<template>
  <q-page class="container flex flex-center spaced">
    <qas-map :center-focus="$_getPosition({lat: -21.17663, lng: -47.820839 })" has-search :main-markers="$_createMarker(values, true)" search />
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
        title: 'Teste mapa',
        description: 'Teste do componente qasMap',
        draggable: true
      }
    }
  },

  computed: {
    images () {
      return [
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
        'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg'
      ]
    },

    result () {
      return {
        name: 'John Appleseed',
        email: 'john.appleseed@example.com',
        phone: '99999999999',
        gender: 'Male',
        document: '99999999999',
        address: '747 Austen View'
      }
    }
  }
}
</script>
