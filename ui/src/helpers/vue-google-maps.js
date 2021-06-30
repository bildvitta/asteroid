import * as VueGoogleMaps from 'vue2-google-maps'

export default function (vue) {
  VueGoogleMaps.install(vue, {
    load: {
      key: 'AIzaSyDl00zRKG51WWBIJa8yVXqX7jFD5xyqe24',
      libraries: 'places'
    }
  })
  console.log('teste')
}
