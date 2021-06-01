import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

VueGoogleMaps.install(Vue, {
  load: {
    key: 'AIzaSyDl00zRKG51WWBIJa8yVXqX7jFD5xyqe24',
    libraries: 'places'
  }
})
