import thirdPartyComponentHandler from '../third-party-component-handler'

export default function () {
  const { QasComponent, initializeComponent } = thirdPartyComponentHandler({
    name: 'QasMap',
    importFn: () => import('../../components/map/QasMap.vue')
  })

  return {
    QasComponent,

    initializeComponent (app) {
      return initializeComponent({ app })
    }
  }
}
