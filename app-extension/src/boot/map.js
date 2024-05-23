export default async ({ app }) => {
  import('@fawmi/vue-google-maps').then(({ default: VueGoogleMaps }) => {
    app.use(VueGoogleMaps, {
      load: { libraries: 'places', key: process.env.MAPS_API_KEY }
    })
  })
}
