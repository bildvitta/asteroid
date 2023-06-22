import thirdPartyComponentHandler from '../third-party-component-handler'

export default function () {
  const { QasComponent, initializeComponent } = thirdPartyComponentHandler({
    name: 'QasMap',
    importFn: () => import('../../components/map/QasMap.vue')
  })

  return {
    QasComponent,

    initializeComponent (app) {
      return initializeComponent({
        app,

        async onBefore () {
          await import('@fawmi/vue-google-maps').then(({ default: VueGoogleMaps }) => {
            app.use(VueGoogleMaps, {
              load: { libraries: 'places', key: process.env.MAPS_API_KEY }
            })
          })
        }
      })
    }
  }
}
