import thirdPartyComponentHandler from '@bildvitta/quasar-ui-asteroid/src/vue-plugin/third-party-component-handler'

export default async ({ app }) => {
  import('@fawmi/vue-google-maps').then(({ default: VueGoogleMaps }) => {
    app.use(VueGoogleMaps, {
      load: { libraries: 'places', key: process.env.MAPS_API_KEY }
    })

    const thirdParty = thirdPartyComponentHandler({
      name: 'QasMap',
      importFn: () => import('@bildvitta/quasar-ui-asteroid/src/components/map/QasMap.vue')
    })

    thirdParty.initializeComponent({ app })
  })
}
