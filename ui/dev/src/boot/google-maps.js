import * as VueGoogleMaps from 'gmap-vue'

export default function ({ Vue }) {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDl00zRKG51WWBIJa8yVXqX7jFD5xyqe24',
      libraries: 'places'
    }
  })
}
